'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'

export function Navbar() {
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'uz' : 'en')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800 dark:text-white">Condor</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
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
              className="px-3 py-1 rounded-md text-gray-600 dark:text-gray-300"
            >
              {i18n.language === 'en' ? 'UZ' : 'EN'}
            </button>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
