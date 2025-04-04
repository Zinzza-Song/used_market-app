import { DefaultSession } from 'next-auth'

declare module 'authjs' {
  interface Session {
    user?: {
      id?: string
      role?: string
    } & DefaultSession['user']
  }
}
