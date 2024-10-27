'use client'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  nameKey: string
  description?: string
  descriptionKey: string
  category: string
  volume?: string
  image?: string
  price?: number
  inStock: boolean
}

export default function Products() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category')
  
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) throw new Error('Failed to fetch products')
        const data = await response.json()
        setProducts(categoryFilter 
          ? data.filter((p: Product) => p.category === categoryFilter)
          : data
        )
      } catch (error) {
        console.error('Error loading products:', error)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryFilter])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('products')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {product.image && (
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={t(product.nameKey)}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{t(product.nameKey)}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {t(product.descriptionKey)}
              </p>
              {product.volume && (
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                  {t('volume')}: {product.volume}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
