import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { toast } from 'react-toastify'

interface UseFavorite {
  productId: string
  currentUser?: User | null
}

const useFavorite = ({ productId, currentUser }: UseFavorite) => {
  const router = useRouter()
  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(productId)
  }, [currentUser, productId])

  const toogleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    if (!currentUser) {
      toast.warn('먼저 로그인 하십시오.')
      return
    }

    try {
      let req

      if (hasFavorite) req = () => axios.delete(`/api/favorites/${productId}`)
      else req = () => axios.post(`/api/favorites/${productId}`)

      await req()
      router.refresh()
      toast.success('성공적으로 추가됬습니다.')
    } catch (err) {
      toast.error('실패했습니다.')
    }
  }

  return {
    hasFavorite,
    toogleFavorite
  }
}

export default useFavorite
