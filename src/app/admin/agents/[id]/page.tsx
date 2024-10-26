'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Agent {
  id: string
  name: string
  phone: string
  email?: string
  region?: string
  active: boolean
}

export default function EditAgent({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<Agent>({
    id: '',
    name: '',
    phone: '',
    email: '',
    region: '',
    active: true
  })

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await fetch(`/api/admin/agents/${params.id}`)
        if (!response.ok) throw new Error('Failed to fetch agent')
        const data = await response.json()
        setFormData(data)
      } catch (error) {
        setError('Error loading agent')
      } finally {
        setLoading(false)
      }
    }

    fetchAgent()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/admin/agents/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to update agent')
      
      router.push('/admin/agents')
    } catch (error) {
      setError('Error updating agent')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Edit Agent</h1>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Region</label>
            <input
              type="text"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="mr-2"
              />
              Active
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
