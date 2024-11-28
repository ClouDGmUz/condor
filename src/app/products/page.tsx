'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

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

const ITEMS_PER_PAGE = 8

function ProductList() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryFilter = searchParams.get('category')
  const page = Number(searchParams.get('page')) || 1
  
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || 'all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) throw new Error('Failed to fetch products')
        const data = await response.json()
        setProducts(data)
        filterProducts(data, selectedCategory, searchTerm)
      } catch (error) {
        console.error('Error loading products:', error)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filterProducts = (products: Product[], category: string, search: string) => {
    let filtered = [...products]

    // Apply category filter
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category)
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.volume?.toLowerCase().includes(searchLower)
      )
    }

    setFilteredProducts(filtered)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterProducts(products, category, searchTerm)
    router.push(`/products?category=${category}&page=1`)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterProducts(products, selectedCategory, term)
  }

  const getImageUrl = (image?: string) => {
    if (!image) return '/hero-image.webp'
    if (image.startsWith('http')) return image
    return image.startsWith('/') ? image : `/${image}`
  }

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-light-muted dark:text-dark-text">{/* t('products') */}</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-2.5 bg-light-secondary dark:bg-dark-secondary text-light-muted dark:text-dark-text border border-light-accent/20 dark:border-dark-accent/20 rounded-lg focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent outline-none transition-all duration-200"
          >
            <option value="all">All Categories</option>
            <option value="oil">Motor Oil</option>
            <option value="antifreeze">Antifreeze</option>
            <option value="dot">DOT</option>
            <option value="water">Water</option>
          </select>

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="px-4 py-2.5 bg-light-secondary dark:bg-dark-secondary text-light-muted dark:text-dark-text border border-light-accent/20 dark:border-dark-accent/20 rounded-lg focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent outline-none transition-all duration-200 placeholder:text-light-muted/50 dark:placeholder:text-dark-text/50"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <Link 
            key={product.id}
            href={`/products/${product.id}`}
            className="group bg-light-secondary dark:bg-dark-secondary rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-light-accent/10 dark:border-dark-accent/10 flex flex-col hover:translate-y-[-4px]"
          >
            <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-b from-transparent to-black/5">
              <Image
                src={getImageUrl(product.image)}
                alt={product.name}
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
              <div className="flex justify-between items-start gap-2 mb-3">
                <h2 className="text-lg font-bold text-light-muted dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors duration-200 line-clamp-2">
                  {product.name}
                </h2>
                <span className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium ${
                  product.inStock 
                    ? 'bg-green-500/90 text-white' 
                    : 'bg-red-500/90 text-white'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out'}
                </span>
              </div>
              
              <div className="flex justify-between items-center gap-2">
                {product.price && (
                  <p className="text-light-accent dark:text-dark-accent font-semibold text-lg">
                    ${product.price.toLocaleString()}
                  </p>
                )}
                {product.volume && (
                  <p className="text-light-muted/80 dark:text-dark-text/80 text-sm bg-light-accent/5 dark:bg-dark-accent/5 px-2 py-1 rounded-lg">
                    {product.volume}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => router.push(`/products?category=${selectedCategory}&page=${page - 1}`)}
            disabled={page === 1}
            className="px-4 py-2 bg-light-secondary dark:bg-dark-secondary text-light-muted dark:text-dark-text border border-light-accent/20 dark:border-dark-accent/20 rounded-lg disabled:opacity-50 hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-all duration-200"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => router.push(`/products?category=${selectedCategory}&page=${i + 1}`)}
              className={`px-4 py-2 border border-light-accent/20 dark:border-dark-accent/20 rounded-lg transition-all duration-200 
                ${page === i + 1 
                  ? 'bg-light-accent dark:bg-dark-accent text-white dark:text-dark-text' 
                  : 'bg-light-secondary dark:bg-dark-secondary text-light-muted dark:text-dark-text hover:bg-light-accent/10 dark:hover:bg-dark-accent/10'
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => router.push(`/products?category=${selectedCategory}&page=${page + 1}`)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-light-secondary dark:bg-dark-secondary text-light-muted dark:text-dark-text border border-light-accent/20 dark:border-dark-accent/20 rounded-lg disabled:opacity-50 hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-all duration-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

// Main Products Page Component
export default function Products() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    }>
      <ProductList />
    </Suspense>
  )
}
