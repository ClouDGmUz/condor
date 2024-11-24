'use client'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Image from 'next/image'

export default function Page() {
  const { t } = useTranslation()

  const categories = [
    {
      id: 'motor-oil',
      icon: '🛢️',
      image: '/images/motor-oil.jpg',
    },
    {
      id: 'antifreeze',
      icon: '❄️',
      image: '/images/antifreeze.jpg',
    },
    {
      id: 'dot',
      icon: '🚗',
      image: '/images/Dot.jpg',
    },
    {
      id: 'more',
      icon: '➕',
      image: '/images/more-products.jpg',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between py-16 md:py-24">
            {/* Text Content */}
            <div className="text-white max-w-xl md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">{t('heroTitle')}</h1>
              <p className="text-base md:text-xl mb-6 md:mb-8">{t('heroDescription')}</p>
              <Link
                href="/products"
                className="inline-block bg-light-primary dark:bg-dark-accent text-light-muted dark:text-dark-text px-6 md:px-8 py-2.5 md:py-3.5 rounded-lg font-medium hover:bg-light-accent/20 dark:hover:bg-dark-accent/80 transition-all duration-200 text-sm md:text-base shadow-lg hover:shadow-xl"
              >
                {t('exploreProducts')}
              </Link>
            </div>

            {/* Hero Image */}
            <div className="md:w-1/2 relative">
              <Image
                src="/hero-image.webp"
                alt="Condor Products"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-light-primary dark:bg-dark-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-light-muted dark:text-dark-text">{t('whyChooseUs')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="bg-light-secondary dark:bg-dark-secondary p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-light-accent/10 dark:border-dark-accent/10"
              >
                <div className="text-4xl mb-6 bg-light-accent/10 dark:bg-dark-accent/10 w-16 h-16 rounded-lg flex items-center justify-center">
                  {i === 1 && '🌟'}
                  {i === 2 && '🔬'}
                  {i === 3 && '🌿'}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-light-muted dark:text-dark-text">
                  {t(`feature${i}Title`)}
                </h3>
                <p className="text-light-muted/80 dark:text-dark-text/80 leading-relaxed">
                  {t(`feature${i}Description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-light-primary/50 dark:bg-dark-primary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-light-muted dark:text-dark-text">{t('ourProducts')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.id === 'more' ? '/products' : `/products?category=${category.id}`}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-w-1 aspect-h-1 bg-light-secondary dark:bg-dark-secondary border border-light-accent/10 dark:border-dark-accent/10">
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="text-4xl mb-6 bg-light-accent/10 dark:bg-dark-accent/10 w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-light-muted dark:text-dark-text">
                      {t(`category${category.id}Title`)}
                    </h3>
                    <p className="text-sm text-light-muted/80 dark:text-dark-text/80">
                      {t(`category${category.id}Desc`)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-light-accent dark:bg-dark-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white dark:text-dark-text">{t('ctaTitle')}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90 dark:text-dark-text/90">{t('ctaDescription')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4">
            <Link
              href="/products"
              className="btn btn-secondary bg-light-primary dark:bg-dark-primary text-light-muted dark:text-dark-text hover:bg-light-primary/80 dark:hover:bg-dark-primary/80"
            >
              {t('viewProducts')}
            </Link>
            <Link
              href="/contact"
              className="btn btn-secondary backdrop-blur-sm bg-white/10 dark:bg-dark-primary/10 text-white dark:text-dark-text border border-white/20 dark:border-dark-text/20 hover:bg-white/20 dark:hover:bg-dark-primary/20"
            >
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-light-primary dark:bg-dark-primary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="text-4xl font-bold mb-3 bg-gradient-to-r from-light-accent to-light-surface dark:from-dark-accent dark:to-dark-surface bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {t(`stat${i}Number`)}
                </div>
                <div className="text-light-muted dark:text-dark-text/80">
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
