import NextAuth, { NextAuthConfig } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/libs/prismadb'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error('Invalid credentials')

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email as string }
        })

        if (!user || !user?.hashedPassword)
          throw new Error('Invalid credentials')

        const isCorrectPassword = await bcrypt.compare(
          credentials?.password as string,
          user.hashedPassword
        )

        if (!isCorrectPassword) throw new Error('Invalid credentials')

        return user
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
  pages: {
    signIn: '/auth/login'
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
