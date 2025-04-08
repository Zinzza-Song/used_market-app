'use client'
import Link from 'next/link'
import { useState } from 'react'
import NavItem from './NavItem'
import { User } from '@prisma/client'
import React from 'react'

interface NavbarProps {
  currentUser?: User | null
}

const Navbar = ({ currentUser }: NavbarProps) => {
  const [menu, setMenu] = useState(false)

  const handleMenu = () => {
    setMenu(!menu)
  }

  return (
    <nav className="relative z-10 w-full bg-orange-500 text-white">
      <div className="mx-5 flex items-center justify-between sm:mx-10 lg:mx-20">
        {/* logo */}
        <div className="flex h-14 items-center text-2xl">
          <Link href="/">Logo</Link>
        </div>

        {/* menu */}
        <div className="text-2xl sm:hidden">
          {menu === false ? (
            <button onClick={handleMenu}>+</button>
          ) : (
            <button onClick={handleMenu}>-</button>
          )}
        </div>

        {/* navItem large screen */}
        <div className="hidden sm:block">
          <NavItem currentUser={currentUser} />
        </div>
      </div>

      {/* navItem mobile */}
      <div className="block sm:hidden">
        {menu === false ? null : (
          <NavItem
            mobile
            currentUser={currentUser}
          />
        )}
      </div>
    </nav>
  )
}

export default React.memo(Navbar)
