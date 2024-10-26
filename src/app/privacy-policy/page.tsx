'use client'
import { useTranslation } from 'react-i18next'

export default function PrivacyPolicy() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{t('privacyPolicyTitle')}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{t('privacyPolicyLastUpdated')}</p>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-8">{t('privacyPolicyIntro')}</p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('dataWeCollect')}</h2>
          <p className="mb-4">{t('dataWeCollectDesc')}</p>
          <ul className="list-disc pl-6 space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="text-gray-600 dark:text-gray-300">
                {t(`dataPoint${i}`)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('howWeUseData')}</h2>
          <p className="mb-4">{t('howWeUseDataDesc')}</p>
          <ul className="list-disc pl-6 space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="text-gray-600 dark:text-gray-300">
                {t(`usePoint${i}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
