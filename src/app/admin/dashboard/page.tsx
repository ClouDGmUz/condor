'use client'
import { useEffect, useState } from 'react'

interface DashboardStats {
  totalProducts: number
  totalAgents: number
  totalContacts: number
  recentContacts: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalAgents: 0,
    totalContacts: 0,
    recentContacts: []
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Total Products</h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalProducts}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Total Agents</h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.totalAgents}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Contact Messages</h2>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.totalContacts}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Messages</h2>
        <div className="space-y-4">
          {stats.recentContacts.map((contact) => (
            <div 
              key={contact.id} 
              className="border-b dark:border-gray-700 pb-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">{contact.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{contact.subject}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
