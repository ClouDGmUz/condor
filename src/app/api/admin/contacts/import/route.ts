import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const contacts = await request.json()

    // Validate contacts array
    if (!Array.isArray(contacts)) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      )
    }

    // Import each contact
    const results = await Promise.all(
      contacts.map(async (contact) => {
        try {
          return await prisma.contact.create({
            data: {
              name: contact.name,
              email: contact.email,
              subject: contact.subject,
              message: contact.message,
              createdAt: new Date(contact.createdAt || Date.now())
            }
          })
        } catch (error) {
          console.error('Failed to import contact:', error)
          return null
        }
      })
    )

    const imported = results.filter(Boolean).length
    
    return NextResponse.json({
      success: true,
      imported,
      total: contacts.length
    })
  } catch (error) {
    console.error('Failed to import contacts:', error)
    return NextResponse.json(
      { error: 'Failed to import contacts' },
      { status: 500 }
    )
  }
}
