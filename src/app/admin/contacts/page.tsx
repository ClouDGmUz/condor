'use client'
import { useState, useEffect } from 'react'

interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts')
      if (!response.ok) throw new Error('Failed to fetch contacts')
      const data = await response.json()
      setContacts(data)
    } catch (err) {
      console.error('Failed to fetch contacts:', err)
      setError('Error loading contacts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete contact')
      fetchContacts()
    } catch (err) {
      console.error('Failed to delete contact:', err)
      setError('Error deleting contact')
    }
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string
          const data = JSON.parse(content)
          
          const response = await fetch('/api/admin/contacts/import', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })

          if (!response.ok) throw new Error('Failed to import contacts')
          
          fetchContacts()
        } catch (err) {
          console.error('Failed to parse or import JSON:', err)
          setError('Error importing contacts')
        }
      }
      reader.readAsText(file)
    } catch (err) {
      console.error('Failed to read file:', err)
      setError('Error reading file')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Contact Messages</h1>
        
        <div className="relative">
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Import JSON
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        {contacts.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No messages found
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {contacts.map((contact) => (
              <div key={contact.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {contact.subject}
                    </h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      From: {contact.name} ({contact.email})
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(contact.createdAt).toLocaleDateString()} {new Date(contact.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {contact.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
