'use client'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('about')}</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('aboutUs')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('aboutUsDescription')}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {t('aboutUsDescription2')}
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('ourMission')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('ourMissionDescription')}
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            {[1, 2, 3].map((i) => (
              <li key={i}>{t(`missionPoint${i}`)}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Shop Information Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6">{t('ourShop')}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">{t('shopLocation')}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{t('shopLocationDesc')}</p>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">{t('address')}:</span> {t('shopAddress')}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">{t('workingHours')}:</span> {t('shopWorkingHours')}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">{t('phoneNumbers')}:</span> {t('shopPhoneNumbers')}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">{t('shopServices')}</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-center">
                  <span className="mr-2">✓</span>
                  {t(`shopService${i}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6">{t('whyChooseUs')}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">{t(`benefit${i}Title`)}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t(`benefit${i}Description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
