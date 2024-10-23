'use client'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">{t('heroTitle')}</h1>
            <p className="text-xl mb-8">{t('heroDescription')}</p>
            <Link
              href="/products"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('exploreProducts')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('whyChooseUs')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-primary text-4xl mb-4">
                  {i === 1 && '🌟'}
                  {i === 2 && '🔬'}
                  {i === 3 && '🌿'}
                </div>
                <h3 className="text-xl font-semibold mb-3">{t(`feature${i}Title`)}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t(`feature${i}Description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('ourProducts')}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['oil', 'antifreeze', 'dot', 'water'].map((category) => (
              <Link
                key={category}
                href={`/products?category=${category}`}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <Image
                    src={`/images/${category}-category.jpg`}
                    alt={t(category)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-semibold mb-2">{t(category)}</h3>
                    <p className="text-sm">{t(`${category}CategoryDesc`)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">{t('ctaTitle')}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{t('ctaDescription')}</p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/products"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('viewProducts')}
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {t(`stat${i}Number`)}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {t(`stat${i}Label`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
