import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message
      }
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Failed to create contact:', error)
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    )
  }
} 