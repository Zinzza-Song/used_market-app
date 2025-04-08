import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'

interface CategoryBoxProps {
  icon: IconType
  label: string
  path: string
  selected?: boolean
}

const CategoryBox = ({
  icon: Icon,
  label,
  path,
  selected
}: CategoryBoxProps) => {
  return (
    <Link
      href={`/?category=${path}`}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800 ${selected ? 'border-b-neutral-800' : 'border-transparent'} ${selected ? 'text-neutral-800' : 'text-neutral-500'} `}>
      <Icon size={26} />
      <div>{label}</div>
    </Link>
  )
}

export default React.memo(CategoryBox)
