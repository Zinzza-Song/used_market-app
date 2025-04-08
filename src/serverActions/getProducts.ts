'use server'
import { prisma } from '@/libs/prismadb'

export interface ProductsParams {
  latitude?: number
  longitude?: number
  category?: string
}

export default async function getProducts(params: ProductsParams) {
  try {
    const { latitude, longitude, category } = params

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

    const products = await prisma.product.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return {
      data: products
    }
  } catch (err: any) {
    throw new Error(err)
  }
}
