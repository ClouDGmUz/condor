'use client'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-light-secondary dark:bg-dark-secondary border-t border-light-accent/20 dark:border-dark-accent/20">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center"> 
          <div className="text-light-muted dark:text-dark-text mb-4 md:mb-0">
            2024 Condor MCHJ. {t('allRightsReserved')}
          </div>
          <div className="flex space-x-6">
            <Link 
              href="/privacy-policy" 
              className="text-light-muted dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent transition-colors"
            >
              {t('privacyPolicy')}
            </Link>
            <Link 
              href="/terms-of-service" 
              className="text-light-muted dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent transition-colors"
            >
              {t('termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
