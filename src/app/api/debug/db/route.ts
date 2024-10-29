import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await prisma.$connect()
    
    // Test queries
    const agentCount = await prisma.agent.count()
    const productCount = await prisma.product.count()
    const contactCount = await prisma.contact.count()
    
    // Test a simple agent query
    const firstAgent = await prisma.agent.findFirst()
    
    return NextResponse.json({
      status: 'connected',
      counts: {
        agents: agentCount,
        products: productCount,
        contacts: contactCount
      },
      sampleAgent: firstAgent ? {
        id: firstAgent.id,
        name: firstAgent.name
      } : null,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
} 