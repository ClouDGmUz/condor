'use client'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center"> {/* Changed to flex-col for smaller screens */}
          <div className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0"> {/* Added margin for smaller screens */}
            © 2024 Condor MCHJ. {t('allRightsReserved')}
          </div>
          <div className="flex space-x-6">
            <Link 
              href="/privacy-policy" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {t('privacyPolicy')}
            </Link>
            <Link 
              href="/terms-of-service" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {t('termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
