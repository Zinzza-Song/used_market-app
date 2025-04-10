import { Params } from '@/app/products/[productId]/page'
import { prisma } from '@/libs/prismadb'

export default async function getProductById(params: Params) {
  try {
    const { productId } = params
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { user: true }
    })

    if (!product) return null

    return product
  } catch (err: any) {
    throw new Error(err)
  }
}
