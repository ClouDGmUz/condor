import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await prisma.$connect()
    
    const totalProducts = await prisma.product.count()
    console.log('Total products:', totalProducts)
    
    const totalAgents = await prisma.agent.count()
    console.log('Total agents:', totalAgents)
    
    const totalContacts = await prisma.contact.count()
    console.log('Total contacts:', totalContacts)
    
    const recentContacts = await prisma.contact.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      }
    })
    console.log('Recent contacts:', recentContacts.length)

    return NextResponse.json({
      totalProducts,
      totalAgents,
      totalContacts,
      recentContacts
    })
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch stats',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
