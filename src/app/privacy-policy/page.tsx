'use client'
import { useTranslation } from 'react-i18next'

export default function PrivacyPolicy() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-light-muted dark:text-dark-text">{t('privacyPolicyTitle')}</h1>
        <p className="text-light-muted/70 dark:text-dark-text/70 mb-12">{t('privacyPolicyLastUpdated')}</p>
        
        <div className="bg-light-secondary dark:bg-dark-secondary rounded-xl p-8 border border-light-accent/10 dark:border-dark-accent/10 shadow-lg space-y-12">
          <p className="text-light-muted/80 dark:text-dark-text/80 leading-relaxed">{t('privacyPolicyIntro')}</p>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-light-muted dark:text-dark-text flex items-center">
              <span className="bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg p-2 mr-4">
                <svg className="w-6 h-6 text-light-accent dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              {t('dataWeCollect')}
            </h2>
            <p className="mb-6 text-light-muted/80 dark:text-dark-text/80 leading-relaxed">{t('dataWeCollectDesc')}</p>
            <ul className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-light-accent/10 dark:bg-dark-accent/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-light-accent dark:bg-dark-accent" />
                  </div>
                  <span className="text-light-muted/80 dark:text-dark-text/80">{t(`dataPoint${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-light-muted dark:text-dark-text flex items-center">
              <span className="bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg p-2 mr-4">
                <svg className="w-6 h-6 text-light-accent dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              {t('howWeUseData')}
            </h2>
            <p className="mb-6 text-light-muted/80 dark:text-dark-text/80 leading-relaxed">{t('howWeUseDataDesc')}</p>
            <ul className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-light-accent/10 dark:bg-dark-accent/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-light-accent dark:bg-dark-accent" />
                  </div>
                  <span className="text-light-muted/80 dark:text-dark-text/80">{t(`usePoint${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
