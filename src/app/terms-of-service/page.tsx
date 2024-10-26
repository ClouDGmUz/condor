'use client'
import { useTranslation } from 'react-i18next'

export default function TermsOfService() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{t('termsTitle')}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{t('termsLastUpdated')}</p>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-8">{t('termsIntro')}</p>

        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {t(`termsSection${i}`)}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t(`termsSection${i}Desc`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
