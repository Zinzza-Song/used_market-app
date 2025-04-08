import { prisma } from '@/libs/prismadb'
import getCurrentUser from '@/serverActions/getCurrentUser'
import { NextResponse } from 'next/server'

interface Params {
  productId?: string
}

export async function POST(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const currentUser = await getCurrentUser()
  if (!currentUser) return NextResponse.error()

  const { productId } = await params
  if (!productId || typeof productId !== 'string') throw new Error('Invalid ID')

  let favoriteIds = [...(currentUser.favoriteIds || [])]

  favoriteIds.push(productId)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds: favoriteIds
    }
  })

  return NextResponse.json(user)
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const currentUser = await getCurrentUser()
  if (!currentUser) return NextResponse.error()

  const { productId } = await params
  if (!productId || typeof productId !== 'string') throw new Error('Invalid ID')

  let favoriteIds = [...(currentUser.favoriteIds || [])]

  favoriteIds = favoriteIds.filter(id => id != productId)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds: favoriteIds
    }
  })

  return NextResponse.json(user)
}
