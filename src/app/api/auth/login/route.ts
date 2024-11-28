import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { cookies } from 'next/headers'

// In-memory store for login attempts (in production, use Redis or a database)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()

const MAX_ATTEMPTS = 5 // Maximum attempts allowed
const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutes in milliseconds
const ATTEMPT_RESET_TIME = 60 * 60 * 1000 // 1 hour in milliseconds

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

async function verifyRecaptcha(token: string) {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  })

  const data = await response.json()
  return data.success
}

function getClientIp(): string {
  const forwardedFor = headers().get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  return 'unknown-ip'
}

function isIpLocked(ip: string): boolean {
  const attempts = loginAttempts.get(ip)
  if (!attempts) return false

  // If enough time has passed, reset the attempts
  if (Date.now() - attempts.lastAttempt > ATTEMPT_RESET_TIME) {
    loginAttempts.delete(ip)
    return false
  }

  // Check if the IP is currently locked out
  if (attempts.count >= MAX_ATTEMPTS) {
    const timeSinceLastAttempt = Date.now() - attempts.lastAttempt
    if (timeSinceLastAttempt < LOCKOUT_TIME) {
      return true
    }
    // Reset attempts after lockout period
    loginAttempts.delete(ip)
  }

  return false
}

function recordLoginAttempt(ip: string, success: boolean) {
  const attempts = loginAttempts.get(ip) || { count: 0, lastAttempt: 0 }
  
  if (success) {
    // Reset attempts on successful login
    loginAttempts.delete(ip)
  } else {
    // Increment attempts on failed login
    loginAttempts.set(ip, {
      count: attempts.count + 1,
      lastAttempt: Date.now()
    })
  }
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp()

    // Check if IP is locked out
    if (isIpLocked(clientIp)) {
      const attempts = loginAttempts.get(clientIp)!
      const timeLeft = Math.ceil((LOCKOUT_TIME - (Date.now() - attempts.lastAttempt)) / 1000 / 60)
      
      return NextResponse.json(
        { error: `Too many failed attempts. Please try again in ${timeLeft} minutes.` },
        { status: 429 }
      )
    }

    const { username, password, recaptchaToken } = await request.json()

    // Verify reCAPTCHA first
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken)
    if (!isRecaptchaValid) {
      recordLoginAttempt(clientIp, false)
      return NextResponse.json(
        { error: 'Invalid reCAPTCHA. Please try again.' },
        { status: 400 }
      )
    }

    // Check credentials
    const isValidLogin = username === ADMIN_USERNAME && 
                        password === ADMIN_PASSWORD

    // Record the attempt
    recordLoginAttempt(clientIp, isValidLogin)

    if (isValidLogin) {
      const response = NextResponse.json({ success: true })
      
      // Set the cookie in the response
      cookies().set('admin_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      })

      return response
    }

    const attempts = loginAttempts.get(clientIp)
    const attemptsLeft = MAX_ATTEMPTS - (attempts?.count || 0)

    return NextResponse.json(
      { 
        error: 'Invalid credentials', 
        attemptsLeft: Math.max(0, attemptsLeft)
      },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
