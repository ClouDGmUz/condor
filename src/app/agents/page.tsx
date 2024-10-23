'use client'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

interface Agent {
  id: number
  name: string
  phone: string
}

export default function Agents() {
  const { t } = useTranslation()
  const [agents, setAgents] = useState<Agent[]>([])

  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await fetch('/agents.json')
        const data = await response.json()
        setAgents(data)
      } catch (error) {
        console.error('Error loading agents:', error)
      }
    }

    fetchAgents()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('agents')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{agent.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{agent.phone}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
