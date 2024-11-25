'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'

interface ImageUploadProps {
  currentImage?: string
  onImageChange: (imageUrl: string) => void
}

export default function ImageUpload({ currentImage, onImageChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(currentImage)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB')
      return
    }

    try {
      setUploading(true)
      setError('')

      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()
      setPreview(data.url)
      onImageChange(data.url)
    } catch (err) {
      console.error('Upload error:', err)
      setError('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div 
        onClick={handleImageClick}
        className="relative w-full aspect-video bg-light-secondary dark:bg-dark-secondary rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-2 border-dashed border-light-accent/20 dark:border-dark-accent/20"
      >
        {preview ? (
          <Image
            src={preview}
            alt="Product image"
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/hero-image.webp' // Using existing hero image as fallback
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/hero-image.webp)' }}>
            <div className="text-center bg-black/50 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-4xl mb-2">📷</div>
              <p className="text-white">
                Click to upload image
              </p>
            </div>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
}
