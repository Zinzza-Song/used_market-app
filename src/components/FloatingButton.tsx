import Link from 'next/link'
import React from 'react'

interface FloatingButtonProps {
  children: React.ReactNode
  href: string
}

const FloatingButton = ({ children, href }: FloatingButtonProps) => {
  return (
    <Link
      href={href}
      className="fixed right-5 bottom-5 flex aspect-square w-14 cursor-pointer items-center justify-center rounded-full border-0 border-transparent bg-orange-400 text-white shadow-xl transition-colors hover:bg-orange-500">
      {children}
    </Link>
  )
}

export default FloatingButton
