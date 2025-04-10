'use server'
import { auth } from '@/auth'
import { prisma } from '@/libs/prismadb'

export default async function getCurrentUser() {
  try {
    const session = await auth()

    if (!session?.user?.email) return null

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    })

    if (!currentUser) return null

    return currentUser
  } catch (err) {
    return null
  }
}
