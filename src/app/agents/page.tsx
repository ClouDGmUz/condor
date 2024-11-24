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

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent dark:border-dark-accent"></div>
    </div>
  )
  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg">
        {error}
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-light-muted dark:text-dark-text">Our Agents</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div 
            key={agent.id} 
            className="group bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-light-accent/10 dark:border-dark-accent/10"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-light-accent/10 dark:bg-dark-accent/10 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                <svg 
                  className="w-6 h-6 text-light-accent dark:text-dark-accent" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2 text-light-muted dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors duration-200">
                  {agent.name}
                </h2>
                <div className="space-y-2">
                  <p className="flex items-center text-light-muted/70 dark:text-dark-text/70">
                    <svg 
                      className="w-4 h-4 mr-2 text-light-accent/70 dark:text-dark-accent/70" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                      />
                    </svg>
                    {agent.phone}
                  </p>
                  {agent.region && (
                    <p className="flex items-center text-light-muted/60 dark:text-dark-text/60 text-sm">
                      <svg 
                        className="w-4 h-4 mr-2 text-light-accent/60 dark:text-dark-accent/60" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                        />
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                        />
                      </svg>
                      {agent.region}
                    </p>
                  )}
                  
                  {/* Contact Buttons */}
                  <div className="flex gap-3 mt-4">
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-light-accent/10 hover:bg-light-accent/20 dark:bg-dark-accent/10 dark:hover:bg-dark-accent/20 text-light-accent dark:text-dark-accent rounded-lg transition-all duration-200 font-medium"
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                        />
                      </svg>
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
