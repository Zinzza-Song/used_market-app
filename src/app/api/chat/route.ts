import { prisma } from '@/libs/prismadb'
import getCurrentUser from '@/serverActions/getCurrentUser'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.error()

  const users = await prisma.user.findMany({
    include: {
      conversations: {
        include: {
          messages: {
            include: {
              sender: true,
              receiver: true
            },
            orderBy: {
              createdAt: 'asc'
            }
          },
          users: true
        }
      }
    }
  })

  return NextResponse.json(users)
}
