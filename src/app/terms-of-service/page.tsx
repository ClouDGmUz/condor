'use client'
import { useTranslation } from 'react-i18next'

export default function TermsOfService() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-light-muted dark:text-dark-text">{t('termsTitle')}</h1>
        <p className="text-light-muted/70 dark:text-dark-text/70 mb-12">{t('termsLastUpdated')}</p>
        
        <div className="bg-light-secondary dark:bg-dark-secondary rounded-xl p-8 border border-light-accent/10 dark:border-dark-accent/10 shadow-lg space-y-12">
          <p className="text-light-muted/80 dark:text-dark-text/80 leading-relaxed">{t('termsIntro')}</p>

          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group">
              <h2 className="text-2xl font-semibold mb-6 text-light-muted dark:text-dark-text flex items-center">
                <span className="bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg p-2 mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-light-accent dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {i === 1 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                    {i === 2 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    )}
                    {i === 3 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    )}
                    {i === 4 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </span>
                {t(`termsSection${i}`)}
              </h2>
              <div className="pl-16">
                <p className="text-light-muted/80 dark:text-dark-text/80 leading-relaxed">
                  {t(`termsSection${i}Desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
