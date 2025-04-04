'use server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from 'path-to-regexp'
import { getSession } from '@/serverActions/auth'

const matcherForAuth = ['/admin', '/admin/*splat', '/user', '/user/*splat']

export async function middleware(req: NextRequest) {
  if (isMatch(req.nextUrl.pathname, matcherForAuth)) {
    return (await getSession())
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/api/auth/signin', req.url))
  }
}

function isMatch(pathname: string, urls: string[]) {
  return urls.some(url => !!match(url)(pathname))
}
