import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const NavItem = ({ mobile }: { mobile?: boolean }) => {
  const { data: session, status } = useSession()
  console.log({ session }, status)

  return (
    <ul
      className={`text-md flex w-full items-center justify-center gap-4 ${mobile && 'h-full flex-col'}`}>
      {
        /* Admin menu */
        session?.user?.role === 'Admin' ? (
          <li className="border-b-4 py-2 text-center">
            <Link
              className="cursor-pointer"
              href="/admin">
              Admin
            </Link>
          </li>
        ) : null
      }

      {/* User menu */}
      <li className="border-b-4 py-2 text-center">
        <Link
          className="cursor-pointer"
          href="/user">
          User
        </Link>
      </li>

      {session?.user ? (
        /* Sign-Out button */
        <li className="border-b-4 py-2 text-center">
          <button
            className="cursor-pointer"
            onClick={() => signOut()}>
            Sign-Out
          </button>
        </li>
      ) : (
        /* Sign-In button */
        <li className="border-b-4 py-2 text-center">
          <button
            className="cursor-pointer"
            onClick={() => signIn()}>
            Sign-In
          </button>
        </li>
      )}
    </ul>
  )
}

export default NavItem
