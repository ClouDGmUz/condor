'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface Product {
  id: string
  name: string
  description?: string
  category: string
  volume?: string
  image?: string
  price?: number
  inStock: boolean
}

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch main product
        const response = await fetch(`/api/products/${params.id}`)
        if (!response.ok) throw new Error('Product not found')
        const data = await response.json()
        setProduct(data)

        // Fetch recommended products from same category
        const recommendedResponse = await fetch(`/api/products?category=${data.category}&limit=4&exclude=${data.id}`)
        if (recommendedResponse.ok) {
          const recommendedData = await recommendedResponse.json()
          setRecommendedProducts(recommendedData)
        }
      } catch (error) {
        console.error('Error loading product:', error)
        setError('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchData()
    }
  }, [params.id])

  const getImageUrl = (image?: string) => {
    if (!image) return '/hero-image.webp'
    if (image.startsWith('http')) return image
    return image.startsWith('/') ? image : `/${image}`
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            {error || 'Product not found'}
          </h1>
          <Link 
            href="/products"
            className="text-light-accent dark:text-dark-accent hover:underline"
          >
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 flex items-center gap-2 text-sm">
        <Link 
          href="/products"
          className="text-light-accent dark:text-dark-accent hover:underline"
        >
          Products
        </Link>
        <span className="text-light-muted/50 dark:text-dark-text/50">/</span>
        <span className="text-light-muted/80 dark:text-dark-text/80 capitalize">{product.category}</span>
        <span className="text-light-muted/50 dark:text-dark-text/50">/</span>
        <span className="text-light-muted dark:text-dark-text truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-light-secondary dark:bg-dark-secondary shadow-lg">
          <Image
            src={getImageUrl(product.image)}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/hero-image.webp'
            }}
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-light-muted dark:text-dark-text">
            {product.name}
          </h1>

          <div className="space-y-4">
            {product.description && (
              <p className="text-light-muted/80 dark:text-dark-text/80 text-lg">
                {product.description}
              </p>
            )}

            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <span className="font-semibold text-light-muted dark:text-dark-text">Category:</span>
                <Link 
                  href={`/products?category=${product.category}`}
                  className="ml-2 text-light-accent dark:text-dark-accent hover:underline capitalize"
                >
                  {product.category}
                </Link>
              </div>

              {product.volume && (
                <div className="flex items-center">
                  <span className="font-semibold text-light-muted dark:text-dark-text">Volume:</span>
                  <span className="ml-2 text-light-muted/80 dark:text-dark-text/80">
                    {product.volume}
                  </span>
                </div>
              )}

              {product.price && (
                <div className="flex items-center">
                  <span className="font-semibold text-light-muted dark:text-dark-text">Price:</span>
                  <span className="ml-2 text-light-muted/80 dark:text-dark-text/80">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex items-center">
                <span className="font-semibold text-light-muted dark:text-dark-text">Status:</span>
                <span className={`ml-2 ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="pt-6">
              <Link href="/contact" className={`inline-block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-200
                ${product.inStock
                  ? 'bg-light-accent dark:bg-dark-accent text-white hover:opacity-90'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
                onClick={(e) => !product.inStock && e.preventDefault()}
              >
                {product.inStock ? 'Contact Us' : 'Out of Stock'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="border-t border-light-accent/10 dark:border-dark-accent/10 pt-16">
          <h2 className="text-2xl font-bold mb-8 text-light-muted dark:text-dark-text">
            Similar Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((recommendedProduct) => (
              <Link
                key={recommendedProduct.id}
                href={`/products/${recommendedProduct.id}`}
                className="group bg-light-secondary dark:bg-dark-secondary rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-light-accent/10 dark:border-dark-accent/10 flex flex-col hover:translate-y-[-4px]"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-b from-transparent to-black/5">
                  <Image
                    src={getImageUrl(recommendedProduct.image)}
                    alt={recommendedProduct.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/hero-image.webp'
                    }}
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-light-muted dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors duration-200 line-clamp-2">
                    {recommendedProduct.name}
                  </h3>
                  {recommendedProduct.price && (
                    <p className="mt-2 text-light-muted/80 dark:text-dark-text/80">
                      ${recommendedProduct.price.toFixed(2)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
