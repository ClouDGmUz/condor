import { NextResponse } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    lastReset: number
  }
}

const store: RateLimitStore = {}

export function rateLimit(ip: string, limit: number = 10, windowMs: number = 60000) {
  const now = Date.now()
  const windowStart = now - windowMs

  if (!store[ip]) {
    store[ip] = {
      count: 0,
      lastReset: now,
    }
  }

  // Reset count if window has passed
  if (store[ip].lastReset < windowStart) {
    store[ip] = {
      count: 0,
      lastReset: now,
    }
  }

  // Increment count
  store[ip].count++

  // Check if over limit
  if (store[ip].count > limit) {
    return {
      isLimited: true,
      response: NextResponse.json(
        { error: 'Too many requests, please try again later.' },
        { status: 429 }
      ),
    }
  }

  return { isLimited: false }
}
