'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/ImageUpload'
import { slugify } from '@/utils/slugify'

export default function NewProduct() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    nameKey: '',
    description: '',
    descriptionKey: '',
    category: '',
    volume: '',
    image: '',
    price: '',
    inStock: true
  })

  // Auto-generate keys when name or description changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      nameKey: slugify(prev.name),
      descriptionKey: slugify(prev.description)
    }))
  }, [formData.name, formData.description])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: formData.price ? parseFloat(formData.price) : null,
        }),
      })

      if (!response.ok) throw new Error('Failed to create product')
      
      router.push('/admin/products')
    } catch (err) {
      console.error('Failed to create product:', err)
      setError('Error creating product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Add New Product</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Name Key (Auto-generated)</label>
            <input
              type="text"
              value={formData.nameKey}
              readOnly
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              rows={3}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Description Key (Auto-generated)</label>
            <input
              type="text"
              value={formData.descriptionKey}
              readOnly
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              required
            >
              <option value="">Select Category</option>
              <option value="oil">Oil</option>
              <option value="antifreeze">Antifreeze</option>
              <option value="dot">DOT</option>
              <option value="water">Water</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Volume</label>
            <input
              type="text"
              value={formData.volume}
              onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>

          <div className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <ImageUpload
                currentImage={formData.image}
                onImageChange={(url) => setFormData({ ...formData, image: url })}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              step="0.01"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="mr-2"
              />
              In Stock
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
