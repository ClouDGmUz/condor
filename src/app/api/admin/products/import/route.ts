import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const products = await request.json()

    // Import each product
    const results = await Promise.all(
      products.map(async (product: any) => {
        try {
          return await prisma.product.upsert({
            where: { id: product.id },
            update: {
              name: product.nameKey,
              nameKey: product.nameKey,
              description: product.descriptionKey,
              descriptionKey: product.descriptionKey,
              category: product.category,
              volume: product.volume,
              image: product.image,
              inStock: true
            },
            create: {
              id: product.id,
              name: product.nameKey,
              nameKey: product.nameKey,
              description: product.descriptionKey,
              descriptionKey: product.descriptionKey,
              category: product.category,
              volume: product.volume,
              image: product.image,
              inStock: true
            }
          })
        } catch (error) {
          console.error('Failed to import product:', error)
          return null
        }
      })
    )

    const imported = results.filter(Boolean).length

    return NextResponse.json({
      success: true,
      imported,
      total: products.length
    })
  } catch (error) {
    console.error('Failed to import products:', error)
    return NextResponse.json(
      { error: 'Failed to import products' },
      { status: 500 }
    )
  }
}
