import bcrypt from 'bcryptjs'
import { prisma } from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  const { email, name, password } = body

  // Password 암호화
  const hashedPassword = await bcrypt.hash(password, 9)

  // 새로 가입한 user 생성하여 DB 테이블에 추가
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword
    }
  })

  return NextResponse.json(user)
}
