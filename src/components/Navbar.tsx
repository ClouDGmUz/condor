'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function Navbar() {
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'uz' : 'en')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary dark:text-white">Condor</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-4">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-primary"
            >
              {i18n.language === 'en' ? 'EN' : 'UZ'}
            </button>

            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-1 text-gray-600 dark:text-gray-300 hover:text-primary"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-600 dark:text-gray-300 hover:text-primary"
              aria-label="Main menu"
            >
              {!isMenuOpen ? (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/products" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white text-sm font-medium">
              {t('products')}
            </Link>
            <Link href="/agents" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white text-sm font-medium">
              {t('agents')}
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white text-sm font-medium">
              {t('about')}
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white text-sm font-medium">
              {t('contact')}
            </Link>

            <button
              onClick={toggleLanguage}
              className="px-2 py-1 text-sm text-gray-600 hover:text-primary dark:text-gray-300 font-medium"
            >
              {i18n.language === 'en' ? 'EN' : 'UZ'}
            </button>

            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-1 text-gray-600 hover:text-primary dark:text-gray-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white dark:bg-gray-800`}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-100 dark:border-gray-700">
            <Link
              href="/products"
              className="block px-3 py-2 text-base text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('products')}
            </Link>
            <Link
              href="/agents"
              className="block px-3 py-2 text-base text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('agents')}
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-base text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-base text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
