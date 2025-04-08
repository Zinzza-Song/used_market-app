import { auth, signOut, update } from '@/auth'

export const signOutWithForm = async () => {
  await signOut()
}

export { auth as getSession, update as updateSession }
