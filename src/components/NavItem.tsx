import { User } from '@prisma/client'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

interface NavItemProps {
  mobile?: boolean
  currentUser?: User | null
}

const NavItem = ({ mobile, currentUser }: NavItemProps) => {
  return (
    <ul
      className={`text-md flex w-full items-center justify-center gap-4 ${mobile && 'h-full flex-col'}`}>
      {
        /* Admin menu */
        currentUser?.role === 'Admin' ? (
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

      {currentUser ? (
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
