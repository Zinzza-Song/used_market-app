import EmptyState from '@/components/EmptyState'
import getCurrentUser from '@/serverActions/getCurrentUser'
import getProductById from '@/serverActions/getProductById'
import React from 'react'
import ProductClient from './ProductClient'

export interface Params {
  productId?: string
}

const ProductPage = async ({ params }: { params: Promise<Params> }) => {
  const product = await getProductById(await params)
  const currentUser = await getCurrentUser()

  if (!product) return <EmptyState />

  return (
    <ProductClient
      product={product}
      currentUser={currentUser}
    />
  )
}

export default ProductPage
