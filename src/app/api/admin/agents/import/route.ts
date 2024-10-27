import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const agents = await request.json()

    // Import each agent
    const results = await Promise.all(
      agents.map(async (agent: any) => {
        try {
          return await prisma.agent.upsert({
            where: { id: agent.id.toString() },
            update: {
              name: agent.name,
              phone: agent.phone,
              active: true
            },
            create: {
              id: agent.id.toString(),
              name: agent.name,
              phone: agent.phone,
              active: true
            }
          })
        } catch (error) {
          console.error('Failed to import agent:', error)
          return null
        }
      })
    )

    const imported = results.filter(Boolean).length

    return NextResponse.json({
      success: true,
      imported,
      total: agents.length
    })
  } catch (error) {
    console.error('Failed to import agents:', error)
    return NextResponse.json(
      { error: 'Failed to import agents' },
      { status: 500 }
    )
  }
}
