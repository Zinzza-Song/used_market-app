import Image from 'next/image'
import React from 'react'

interface AvatarProps {
  src: string | null
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      className="h-10 w-10 rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={src || 'https://placehold.co/400x400?text=no+user+image'}
    />
  )
}

export default Avatar
