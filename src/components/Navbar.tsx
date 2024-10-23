'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export function Navbar() {
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'uz' : 'en'
    i18n.changeLanguage(newLang)
  }

  if (!mounted) {
    return null
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav items */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                Condor
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/products" className="text-gray-600 dark:text-gray-300 hover:text-primary px-3 py-2">
              {t('products')}
            </Link>
            <Link href="/agents" className="text-gray-600 dark:text-gray-300 hover:text-primary px-3 py-2">
              {t('agents')}
            </Link>
            <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary px-3 py-2">
              {t('about')}
            </Link>
            <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary px-3 py-2">
              {t('contact')}
            </Link>
            
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {i18n.language === 'en' ? 'UZ' : 'EN'}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/products"
              className="block text-gray-600 dark:text-gray-300 hover:text-primary px-3 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('products')}
            </Link>
            <Link
              href="/agents"
              className="block text-gray-600 dark:text-gray-300 hover:text-primary px-3 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('agents')}
            </Link>
            <Link
              href="/about"
              className="block text-gray-600 dark:text-gray-300 hover:text-primary px-3 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <Link
              href="/contact"
              className="block text-gray-600 dark:text-gray-300 hover:text-primary px-3 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('contact')}
            </Link>
            
            {/* Mobile Language and Theme Toggles */}
            <div className="px-3 py-2 space-y-2">
              <button
                onClick={toggleLanguage}
                className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                {i18n.language === 'en' ? 'Switch to Uzbek' : 'Ingliz tiliga o\'tish'}
              </button>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
              >
                {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
