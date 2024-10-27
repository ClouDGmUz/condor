import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_token')

  if (token?.value === 'authenticated') {
    return NextResponse.json({ authenticated: true })
  }

  return NextResponse.json(
    { authenticated: false, error: 'Not authenticated' },
    { status: 401 }
  )
}
