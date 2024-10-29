import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await prisma.$connect()
    console.log('Fetching agents...')
    
    const agents = await prisma.agent.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    console.log(`Found ${agents.length} agents`)
    return NextResponse.json(agents)
  } catch (error) {
    console.error('Failed to fetch agents:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch agents',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  try {
    await prisma.$connect()
    const data = await request.json()
    console.log('Creating agent with data:', data)
    
    const agent = await prisma.agent.create({
      data
    })
    
    console.log('Created agent:', agent)
    return NextResponse.json(agent)
  } catch (error) {
    console.error('Failed to create agent:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create agent',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
