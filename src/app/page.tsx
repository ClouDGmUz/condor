'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  nameKey: string;
  descriptionKey: string;
  image: string;
}

export default function Home() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error loading products:', error));
  }, []);

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
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">{t('ourProducts')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="text-center">
                <Image 
                  src={product.image} 
                  alt={t(product.nameKey)} 
                  width={200} 
                  height={200} 
                  className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{t(product.nameKey)}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t(product.descriptionKey)}</p>
              </div>
            ))}
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
