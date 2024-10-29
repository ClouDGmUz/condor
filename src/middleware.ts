import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RateLimit } from './lib/rateLimit'

// Create rate limiters for different endpoints
const contactLimiter = new RateLimit(60000, 5) // 5 requests per minute
const adminLimiter = new RateLimit(60000, 30) // 30 requests per minute
const defaultLimiter = new RateLimit(60000, 60) // 60 requests per minute

export async function middleware(request: NextRequest) {
  // Get IP address
  const ip = request.ip || 'anonymous'
  
  // Choose appropriate rate limiter based on the path
  let limiter = defaultLimiter
  if (request.nextUrl.pathname.startsWith('/api/contacts')) {
    limiter = contactLimiter
  } else if (request.nextUrl.pathname.startsWith('/api/admin')) {
    limiter = adminLimiter
  }

  // Check rate limit
  const result = await limiter.check(ip)
  
  // Add rate limit headers
  const response = result.success 
    ? NextResponse.next()
    : NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )

  response.headers.set('X-RateLimit-Limit', result.limit.toString())
  response.headers.set('X-RateLimit-Remaining', result.remaining.toString())
  response.headers.set('X-RateLimit-Reset', result.reset.toISOString())
  
  if (!result.success) {
    response.headers.set('Retry-After', Math.ceil((result.reset.getTime() - Date.now()) / 1000).toString())
  }

  // Check if it's an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip middleware for login page
    if (request.nextUrl.pathname === '/admin/login') {
      return response
    }

    const token = request.cookies.get('admin_token')

    // Redirect to login if no token
    if (!token || token.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*'
  ]
}
