import Link from 'next/link'
import React from 'react'

const NavItem = ({ mobile }: { mobile?: boolean }) => {
  return (
    <ul
      className={`text-md flex w-full items-center justify-center gap-4 ${mobile && 'h-full flex-col'}`}>
      {/* Admin menu */}
      <li className="border-b-4 py-2 text-center">
        <Link
          className="cursor-pointer"
          href="/admin">
          Admin
        </Link>
      </li>

      {/* User menu */}
      <li className="border-b-4 py-2 text-center">
        <Link
          className="cursor-pointer"
          href="/user">
          User
        </Link>
      </li>

      {/* Sign-Out button */}
      <li className="border-b-4 py-2 text-center">
        <button className="cursor-pointer">Sign-Out</button>
      </li>

      {/* Sign-In button */}
      <li className="border-b-4 py-2 text-center">
        <button className="cursor-pointer">Sign-In</button>
      </li>
    </ul>
  )
}

export default NavItem
