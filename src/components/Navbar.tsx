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
    <nav className="bg-light-secondary dark:bg-dark-secondary border-b border-light-accent/20 dark:border-dark-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-light-muted dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent transition-colors">
                Condor
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-4">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-md text-sm font-medium text-light-muted dark:text-dark-text bg-light-primary/50 dark:bg-dark-surface hover:bg-light-accent/20 dark:hover:bg-dark-accent/20 transition-colors"
            >
              {i18n.language === 'en' ? 'EN' : 'UZ'}
            </button>

            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md text-light-muted dark:text-dark-text bg-light-primary/50 dark:bg-dark-surface hover:bg-light-accent/20 dark:hover:bg-dark-accent/20 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-light-muted dark:text-dark-text bg-light-primary/50 dark:bg-dark-surface hover:bg-light-accent/20 dark:hover:bg-dark-accent/20 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/products"
              className="px-3 py-2 rounded-md text-light-muted dark:text-dark-text hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors"
            >
              {t('products')}
            </Link>
            <Link
              href="/agents"
              className="px-3 py-2 rounded-md text-light-muted dark:text-dark-text hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors"
            >
              {t('agents')}
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-md text-light-muted dark:text-dark-text hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors"
            >
              {t('about')}
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 rounded-md text-light-muted dark:text-dark-text hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors"
            >
              {t('contact')}
            </Link>
            
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-md text-sm font-medium text-light-muted dark:text-dark-text bg-light-primary/50 dark:bg-dark-surface hover:bg-light-accent/20 dark:hover:bg-dark-accent/20 transition-colors"
            >
              {i18n.language === 'en' ? 'EN' : 'UZ'}
            </button>

            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md text-light-muted dark:text-dark-text bg-light-primary/50 dark:bg-dark-surface hover:bg-light-accent/20 dark:hover:bg-dark-accent/20 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-light-secondary dark:bg-dark-secondary border-t border-light-accent/20 dark:border-dark-accent/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/products"
                className="block px-3 py-2 rounded-md text-light-muted dark:text-dark-text hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors"
              >
                {t('products')}
              </Link>
              <Link
                href="/agents"
                className="block px-3 py-2 rounded-md text-light-muted dark:text-dark-text hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors"
              >
                {t('agents')}
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-light-muted dark:text-dark-text hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors"
              >
                {t('about')}
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-light-muted dark:text-dark-text hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors"
              >
                {t('contact')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
