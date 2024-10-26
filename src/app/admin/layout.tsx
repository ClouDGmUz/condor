'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check')
        if (!response.ok) {
          router.push('/admin/login')
        } else {
          setIsAuthenticated(true)
        }
      } catch (error) {
        router.push('/admin/login')
      }
    }
    checkAuth()
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <Link 
            href="/admin/dashboard"
            className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link 
            href="/admin/products"
            className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Products
          </Link>
          <Link 
            href="/admin/agents"
            className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Agents
          </Link>
          <Link 
            href="/admin/contacts"
            className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Contact Messages
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  )
}
