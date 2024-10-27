'use client'
import { useState, useEffect } from 'react'

interface Category {
  id: string
  name: string
  slug: string
  icon?: string
}

const defaultCategories = [
  { id: 'oil', name: 'Motor Oil', slug: 'oil', icon: '🛢️' },
  { id: 'antifreeze', name: 'Antifreeze', slug: 'antifreeze', icon: '❄️' },
  { id: 'dot', name: 'DOT', slug: 'dot', icon: '🚗' },
  { id: 'water', name: 'Water', slug: 'water', icon: '💧' }
]

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories)
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', icon: '' })
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCategory) {
        // Update existing category
        const updatedCategories = categories.map(cat => 
          cat.id === editingCategory.id ? { ...editingCategory } : cat
        )
        setCategories(updatedCategories)
        setEditingCategory(null)
      } else {
        // Add new category
        const newId = newCategory.slug.toLowerCase()
        setCategories([...categories, { ...newCategory, id: newId }])
        setNewCategory({ name: '', slug: '', icon: '' })
      }
    } catch (err) {
      setError('Failed to save category')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return

    try {
      const updatedCategories = categories.filter(cat => cat.id !== id)
      setCategories(updatedCategories)
    } catch (err) {
      setError('Failed to delete category')
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
  }

  const handleCancelEdit = () => {
    setEditingCategory(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Categories</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Category Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={editingCategory ? editingCategory.name : newCategory.name}
              onChange={(e) => editingCategory 
                ? setEditingCategory({ ...editingCategory, name: e.target.value })
                : setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Slug</label>
            <input
              type="text"
              value={editingCategory ? editingCategory.slug : newCategory.slug}
              onChange={(e) => editingCategory
                ? setEditingCategory({ ...editingCategory, slug: e.target.value })
                : setNewCategory({ ...newCategory, slug: e.target.value })
              }
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Icon (emoji)</label>
            <input
              type="text"
              value={editingCategory ? editingCategory.icon : newCategory.icon}
              onChange={(e) => editingCategory
                ? setEditingCategory({ ...editingCategory, icon: e.target.value })
                : setNewCategory({ ...newCategory, icon: e.target.value })
              }
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          {editingCategory && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editingCategory ? 'Update Category' : 'Add Category'}
          </button>
        </div>
      </form>

      {/* Categories List */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Icon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-2xl">
                  {category.icon}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                  {category.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
