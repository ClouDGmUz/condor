'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'

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
    if (!image) return '/placeholder-product.jpg'
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
      <h1 className="text-4xl font-bold mb-8">Products</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
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
            className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {product.image && (
              <div className="relative h-48">
                <Image
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/placeholder-product.jpg'
                  }}
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              {product.description && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {product.description}
                </p>
              )}
              {product.volume && (
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                  Volume: {product.volume}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => router.push(`/products?category=${selectedCategory}&page=${page - 1}`)}
            disabled={page === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => router.push(`/products?category=${selectedCategory}&page=${i + 1}`)}
              className={`px-4 py-2 border rounded-lg ${
                page === i + 1 ? 'bg-primary text-white' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => router.push(`/products?category=${selectedCategory}&page=${page + 1}`)}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
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
