'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('heroTitle')}</h1>
              <p className="text-xl mb-6">{t('heroSubtitle')}</p>
              <Link href="/products" className="bg-white text-blue-700 hover:bg-blue-100 font-bold py-3 px-6 rounded-full transition duration-300">
                {t('exploreProducts')}
              </Link>
            </div>
            <div className="md:w-1/2">
              <Image src="/hero-image.jpg" alt={t('heroImageAlt')} width={600} height={400} className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('featuredProducts')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['antifreeze', 'motorOil', 'transmissionFluid'].map((product) => (
              <div key={product} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                <Image src={`/${product}.jpg`} alt={t(`${product}ImageAlt`)} width={200} height={200} className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t(product)}</h3>
                <p className="text-gray-600 mb-4">{t(`${product}Desc`)}</p>
                <Link href={`/products#${product}`} className="text-blue-500 hover:text-blue-700">{t('learnMore')}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('whyChooseCondor')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['quality', 'innovation', 'support'].map((feature) => (
              <div key={feature} className="bg-white rounded-lg shadow-md p-6">
                <div className="text-4xl text-blue-500 mb-4">
                  {feature === 'quality' && '🏆'}
                  {feature === 'innovation' && '💡'}
                  {feature === 'support' && '🤝'}
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(`${feature}Title`)}</h3>
                <p className="text-gray-600">{t(`${feature}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('readyToStart')}</h2>
          <p className="text-xl mb-8">{t('ctaSubtitle')}</p>
          <Link href="/contact" className="bg-white text-blue-700 hover:bg-blue-100 font-bold py-3 px-6 rounded-full transition duration-300">
            {t('contactUs')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
