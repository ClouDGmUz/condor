'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { theme, setTheme } = useTheme()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setSidebarOpen(window.innerWidth >= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [pathname, isMobile])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (pathname === '/admin/login') {
          setIsLoading(false)
          return
        }

        const response = await fetch('/api/auth/check', {
          credentials: 'include'
        })
        
        if (!response.ok) {
          throw new Error('Not authenticated')
        }

        const data = await response.json()
        if (!data.authenticated) {
          router.push('/admin/login')
        }
      } catch (err) {
        console.error('Auth check failed:', err)
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, pathname])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      router.push('/admin/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-primary dark:bg-dark-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent dark:border-dark-accent"></div>
      </div>
    )
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const navItems = [
    {
      href: '/admin/dashboard',
      label: t('Dashboard'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      href: '/admin/products',
      label: t('Products'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      href: '/admin/categories',
      label: t('Categories'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      href: '/admin/agents',
      label: t('Agents'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      href: '/admin/contacts',
      label: t('Contacts'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-primary">
      {/* Top Navigation Bar */}
      <nav className="bg-light-secondary dark:bg-dark-secondary border-b border-light-accent/20 dark:border-dark-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left side - Logo and mobile menu button */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 rounded-md text-light-muted dark:text-dark-text hover:bg-light-accent/10 dark:hover:bg-dark-accent/10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
              <span className="ml-2 text-xl font-bold text-light-muted dark:text-dark-text">
                Condor Admin
              </span>
            </div>

            {/* Right side - Theme and Language toggles */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => i18n.changeLanguage(i18n.language === 'uz' ? 'en' : 'uz')}
                className="px-3 py-1.5 rounded-md text-sm font-medium text-light-muted dark:text-dark-text bg-light-primary/50 dark:bg-dark-surface hover:bg-light-accent/20 dark:hover:bg-dark-accent/20 transition-colors"
              >
                {i18n.language.toUpperCase()}
              </button>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md text-light-muted dark:text-dark-text bg-light-primary/50 dark:bg-dark-surface hover:bg-light-accent/20 dark:hover:bg-dark-accent/20 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`
            fixed md:static inset-y-16 left-0 z-40
            transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 transition-transform duration-300 ease-in-out
            w-64 bg-light-secondary dark:bg-dark-secondary border-r border-light-accent/20 dark:border-dark-accent/20
            overflow-y-auto
          `}
        >
          <nav className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-light-accent/20 text-light-accent dark:bg-dark-accent/20 dark:text-dark-accent'
                    : 'text-light-muted dark:text-dark-text hover:bg-light-accent/10 dark:hover:bg-dark-accent/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-light-muted dark:text-dark-text hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>{t('Logout')}</span>
            </button>
          </nav>
        </aside>

        {/* Overlay */}
        {isSidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 min-h-[calc(100vh-4rem)] bg-light-primary dark:bg-dark-primary">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
