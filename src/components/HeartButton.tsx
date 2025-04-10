'use client'
import useFavorite from '@/hooks/useFavorite'
import { User } from '@prisma/client'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface HeartButtonProps {
  productId: string
  currentUser?: User | null
}

const HeartButton = ({ productId, currentUser }: HeartButtonProps) => {
  const { hasFavorite, toogleFavorite } = useFavorite({
    productId,
    currentUser
  })

  return (
    <div
      onClick={toogleFavorite}
      className="relative cursor-pointer transition hover:opacity-80">
      <AiOutlineHeart
        size={28}
        className="absolute -top-[2px] -right-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={hasFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  )
}

export default React.memo(HeartButton)
