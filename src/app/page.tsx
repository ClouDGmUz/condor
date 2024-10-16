'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800 dark:text-blue-300">{t('heroTitle')}</h1>
              <p className="text-xl mb-6 text-gray-700 dark:text-gray-300">{t('heroSubtitle')}</p>
              <Link href="/products" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                {t('exploreProducts')}
              </Link>
            </div>
            <div className="md:w-1/2">
              <Image src="/engine-fluids.jpg" alt={t('heroImageAlt')} width={600} height={400} className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">{t('whyChooseCondor')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-4 inline-block mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{t('antifreeze')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('antifreezeDesc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-800 rounded-full p-4 inline-block mb-4">
                <svg className="w-8 h-8 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{t('motorOil')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('motorOilDesc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-800 rounded-full p-4 inline-block mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{t('transmissionFluid')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('transmissionFluidDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">{t('whyChooseCondor')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">{t('premiumQuality')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('premiumQualityDesc')}</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">{t('extensiveRange')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('extensiveRangeDesc')}</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">{t('expertSupport')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('expertSupportDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 dark:bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('readyToEnhance')}</h2>
          <p className="mb-8">{t('discoverDifference')}</p>
          <Link href="/contact" className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-2 px-4 rounded transition duration-300">
            {t('contactExperts')}
          </Link>
        </div>
      </section>
    </div>
  );
}

