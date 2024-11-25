import { NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  try {
    // Apply rate limiting
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for') || 'unknown'
    const rateLimitResult = rateLimit(ip, 10) // 10 uploads per minute

    if (rateLimitResult.isLimited) {
      return rateLimitResult.response
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')

    // Make request to imgur API
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64,
        type: 'base64',
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to upload to Imgur')
    }

    const data = await response.json()
    return NextResponse.json({ url: data.data.link })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
