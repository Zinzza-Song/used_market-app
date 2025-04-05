'use server'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET })
  const pathname = req.nextUrl.pathname

  // 로그인된 유저만 접근 가능
  if (pathname.startsWith('/user') && !session)
    return NextResponse.redirect(new URL('/auth/login', req.url))

  // 어드민 유저만 접근 가능
  if (pathname.startsWith('/admin') && session?.role !== 'Admin')
    return NextResponse.redirect(new URL('/', req.url))

  // 로그인된 유저는 로그인, 회원가입 접근 방지
  if (pathname.startsWith('/auth') && session)
    return NextResponse.redirect(new URL('/', req.url))

  return NextResponse.next()
}
