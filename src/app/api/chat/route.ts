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

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.error()

  const body = await req.json()

  // 이미 둘이 대화를 한 적적이 있는지 체크
  const conversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        {
          users: {
            some: { id: body.senderId }
          }
        },
        {
          users: {
            some: {
              id: body.receiverId
            }
          }
        }
      ]
    }
  })

  if (conversation) {
    // 이미 둘이 대화를 한 전적이 있으면 메시지만 생성
    try {
      const message = await prisma.message.create({
        data: {
          text: body.text,
          image: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
          conversationId: conversation.id
        }
      })

      return NextResponse.json(message)
    } catch (err) {
      return NextResponse.json(err)
    }
  } else {
    // 둘이 처음 대화하는 거라면 conversation과 message를 생성
    const newConversation = await prisma.conversation.create({
      data: {
        senderId: body.senderId,
        receiverId: body.receiverId,
        users: {
          connect: [
            {
              id: body.senderId
            },
            {
              id: body.receiverId
            }
          ]
        }
      }
    })

    try {
      const message = await prisma.message.create({
        data: {
          text: body.text,
          image: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
          conversationId: newConversation.id
        }
      })

      return NextResponse.json(message)
    } catch (err) {
      return NextResponse.json(err)
    }
  }
}
