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

  // Prevent hydration mismatch by only rendering theme toggle after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'uz' : 'en')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<<<<<<< HEAD
        <div className="flex justify-between h-16">
          <div className="flex items-center">
=======
        <div className="flex justify-between h-16 items-center">
          <div className="flex">
>>>>>>> 9b2fd201569d4ee453160777a1057cf24a7b0c21
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800 dark:text-white">Condor</span>
            </Link>
          </div>

<<<<<<< HEAD
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-md text-gray-600 dark:text-gray-300 mr-2"
            >
              {i18n.language === 'en' ? 'UZ' : 'EN'}
            </button>

            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 mr-2"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300"
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
          <div className="hidden md:flex md:items-center md:space-x-4">
=======
          <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-8">
>>>>>>> 9b2fd201569d4ee453160777a1057cf24a7b0c21
            <Link href="/products" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('products')}
            </Link>
            <Link href="/agents" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('agents')}
            </Link>
            <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('about')}
            </Link>
            <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('contact')}
            </Link>

            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-md text-gray-600 dark:text-gray-300 md:px-4 md:py-2"
            >
              {i18n.language === 'en' ? 'UZ' : 'EN'}
            </button>

<<<<<<< HEAD
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
=======
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 md:p-3"
>>>>>>> 9b2fd201569d4ee453160777a1057cf24a7b0c21
            >
              {t('products')}
            </Link>
            <Link
              href="/agents"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('agents')}
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
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
