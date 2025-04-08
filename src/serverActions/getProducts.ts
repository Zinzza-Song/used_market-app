'use server'
import { PRODUCT_PER_PAGE } from '@/constants'
import { prisma } from '@/libs/prismadb'

export interface ProductsParams {
  latitude?: number
  longitude?: number
  category?: string
  page?: number
  skip?: number
}

export default async function getProducts(params: Promise<ProductsParams>) {
  try {
    const { latitude, longitude, category, skip } = await params

    let query: any = {}

    if (category) query.category = category

    if (latitude) {
      query.latitude = {
        gte: Number(latitude) - 0.01,
        lte: Number(latitude) + 0.01
      }
    }

    if (longitude) {
      query.latitude = {
        gte: Number(longitude) - 0.01,
        lte: Number(longitude) + 0.01
      }
    }

    const totalItems = await prisma.product.count({ where: query })

    const products = await prisma.product.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      },
      skip: skip ? Number(skip) : 0,
      take: PRODUCT_PER_PAGE
    })

    return {
      data: products,
      totalItems
    }
  } catch (err: any) {
    throw new Error(err)
  }
}
