'use client'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-light-muted dark:text-dark-text">{t('about')}</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-light-secondary dark:bg-dark-secondary rounded-xl p-8 border border-light-accent/10 dark:border-dark-accent/10 shadow-lg">
          <div className="bg-light-accent/10 dark:bg-dark-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-light-accent dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-light-muted dark:text-dark-text">{t('aboutUs')}</h2>
          <p className="text-light-muted/80 dark:text-dark-text/80 mb-4 leading-relaxed">
            {t('aboutUsDescription')}
          </p>
          <p className="text-light-muted/80 dark:text-dark-text/80 leading-relaxed">
            {t('aboutUsDescription2')}
          </p>
        </div>
        <div className="bg-light-secondary dark:bg-dark-secondary rounded-xl p-8 border border-light-accent/10 dark:border-dark-accent/10 shadow-lg">
          <div className="bg-light-accent/10 dark:bg-dark-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-light-accent dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-light-muted dark:text-dark-text">{t('ourMission')}</h2>
          <p className="text-light-muted/80 dark:text-dark-text/80 mb-6 leading-relaxed">
            {t('ourMissionDescription')}
          </p>
          <ul className="space-y-3">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex items-center text-light-muted/70 dark:text-dark-text/70">
                <span className="bg-light-accent/10 dark:bg-dark-accent/10 w-6 h-6 rounded flex items-center justify-center mr-3 text-light-accent dark:text-dark-accent">
                  ✓
                </span>
                {t(`missionPoint${i}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-light-secondary dark:bg-dark-secondary rounded-xl p-8 border border-light-accent/10 dark:border-dark-accent/10 shadow-lg mb-16">
        <div className="bg-light-accent/10 dark:bg-dark-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-light-accent dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-light-muted dark:text-dark-text">{t('ourShop')}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-light-muted dark:text-dark-text">{t('shopLocation')}</h3>
            <p className="text-light-muted/80 dark:text-dark-text/80 mb-6 leading-relaxed">{t('shopLocationDesc')}</p>
            <div className="space-y-4">
              <p className="flex items-center text-light-muted/70 dark:text-dark-text/70">
                <svg className="w-5 h-5 mr-3 text-light-accent dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium mr-2">{t('address')}:</span> {t('shopAddress')}
              </p>
              <p className="flex items-center text-light-muted/70 dark:text-dark-text/70">
                <svg className="w-5 h-5 mr-3 text-light-accent dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium mr-2">{t('workingHours')}:</span> {t('shopWorkingHours')}
              </p>
              <p className="flex items-center text-light-muted/70 dark:text-dark-text/70">
                <svg className="w-5 h-5 mr-3 text-light-accent dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium mr-2">{t('phoneNumbers')}:</span> {t('shopPhoneNumbers')}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-light-muted dark:text-dark-text">{t('shopServices')}</h3>
            <ul className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-center text-light-muted/70 dark:text-dark-text/70">
                  <span className="bg-light-accent/10 dark:bg-dark-accent/10 w-6 h-6 rounded flex items-center justify-center mr-3 text-light-accent dark:text-dark-accent">
                    ✓
                  </span>
                  {t(`shopService${i}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="group bg-light-secondary dark:bg-dark-secondary rounded-xl p-8 border border-light-accent/10 dark:border-dark-accent/10 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="bg-light-accent/10 dark:bg-dark-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {i === 1 && (
                <svg className="w-6 h-6 text-light-accent dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )}
              {i === 2 && (
                <svg className="w-6 h-6 text-light-accent dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              {i === 3 && (
                <svg className="w-6 h-6 text-light-accent dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              )}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-light-muted dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors duration-200">
              {t(`benefit${i}Title`)}
            </h3>
            <p className="text-light-muted/70 dark:text-dark-text/70 leading-relaxed">
              {t(`benefit${i}Description`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
