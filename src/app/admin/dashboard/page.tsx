'use client'
import { useEffect, useState } from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

interface Contact {
  id: string
  name: string
  subject: string
  createdAt: Date
}

interface DashboardStats {
  totalProducts: number
  totalAgents: number
  totalContacts: number
  recentContacts: Contact[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalAgents: 0,
    totalContacts: 0,
    recentContacts: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImportAgents = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const content = await file.text()
      const agents = JSON.parse(content)

      const response = await fetch('/api/admin/agents/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agents)
      })

      if (!response.ok) throw new Error('Failed to import agents')
      const data = await response.json()
      alert(`Successfully imported ${data.imported} agents`)
      fetchStats()
    } catch (err) {
      console.error('Failed to import agents:', err)
      alert('Error importing agents')
    }
  }

  const handleImportProducts = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const content = await file.text()
      const products = JSON.parse(content)

      const response = await fetch('/api/admin/products/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(products)
      })

      if (!response.ok) throw new Error('Failed to import products')
      const data = await response.json()
      alert(`Successfully imported ${data.imported} products`)
      fetchStats()
    } catch (err) {
      console.error('Failed to import products:', err)
      alert('Error importing products')
    }
  }

  const handleBackup = async () => {
    try {
      // Fetch all data
      const [productsRes, agentsRes, contactsRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/agents'),
        fetch('/api/admin/contacts')
      ])

      const products = await productsRes.json()
      const agents = await agentsRes.json()
      const contacts = await contactsRes.json()

      // Create ZIP file
      const zip = new JSZip()
      
      // Add JSON files to ZIP
      zip.file('products.json', JSON.stringify(products, null, 2))
      zip.file('agents.json', JSON.stringify(agents, null, 2))
      zip.file('contacts.json', JSON.stringify(contacts, null, 2))

      // Generate and download ZIP file
      const content = await zip.generateAsync({ type: 'blob' })
      const date = new Date().toISOString().split('T')[0]
      saveAs(content, `condor-backup-${date}.zip`)
    } catch (err) {
      console.error('Failed to create backup:', err)
      alert('Error creating backup')
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <div className="flex space-x-4">
          <div className="inline-block relative">
            <input
              type="file"
              accept=".json"
              onChange={handleImportAgents}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Import Agents
            </button>
          </div>
          <div className="inline-block relative">
            <input
              type="file"
              accept=".json"
              onChange={handleImportProducts}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Import Products
            </button>
          </div>
          <button
            onClick={handleBackup}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 flex items-center"
          >
            <span className="mr-2">Download Backup</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>

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
