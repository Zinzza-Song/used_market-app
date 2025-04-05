/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { NextAuthConfig } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import Credentials from 'next-auth/providers/credentials'

export const config = {
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const user = {
          id: '1',
          name: 'test',
          email: 'test@test.com',
          role: 'Admin'
        }

        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    maxAge: 30 * 24 * 60 * 60 // 30일
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as unknown as AdapterUser
      return session
    }
  }
} satisfies NextAuthConfig

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update // Beta!
} = NextAuth(config)
