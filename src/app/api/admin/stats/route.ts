import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [
      totalProducts,
      totalAgents,
      totalContacts,
      recentContacts
    ] = await Promise.all([
      prisma.product.count(),
      prisma.agent.count(),
      prisma.contact.count(),
      prisma.contact.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        }
      })
    ])

    return NextResponse.json({
      totalProducts,
      totalAgents,
      totalContacts,
      recentContacts
    })
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
