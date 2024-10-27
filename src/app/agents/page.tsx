'use client'
import { useState, useEffect } from 'react'

interface Agent {
  id: string
  name: string
  phone: string
  region?: string
}

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await fetch('/api/agents')
        if (!response.ok) throw new Error('Failed to fetch agents')
        const data = await response.json()
        setAgents(data)
      } catch (error) {
        console.error('Error loading agents:', error)
        setError('Failed to load agents')
      } finally {
        setLoading(false)
      }
    }

    fetchAgents()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Agents</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{agent.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{agent.phone}</p>
            {agent.region && (
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">{agent.region}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
