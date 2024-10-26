import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const token = cookies().get('admin_token')

  if (token?.value === 'authenticated') {
    return NextResponse.json({ authenticated: true })
  }

  return NextResponse.json(
    { error: 'Not authenticated' },
    { status: 401 }
  )
}
