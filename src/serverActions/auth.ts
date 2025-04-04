/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import { auth, signIn, signOut, update } from '@/auth'

export const signOutWithForm = async (formData: FormData) => {
  await signOut()
}

export { auth as getSession, update as updateSession }
