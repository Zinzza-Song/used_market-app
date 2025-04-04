/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update // Beta!
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const user = { id: '1', name: 'test', email: 'test@test.com' }

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
  }
})
