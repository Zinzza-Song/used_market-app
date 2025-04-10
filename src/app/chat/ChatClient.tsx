'use client'
import { TUserWithChat } from '@/types'
import { User } from '@prisma/client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

interface ChatClientProps {
  currentUser?: User | null
}

const ChatClient = ({ currentUser }: ChatClientProps) => {
  const [reciever, setReceiver] = useState({
    receiverId: '',
    receiverName: '',
    receiverImage: ''
  })

  const [layout, setLayout] = useState(false)

  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const {
    data: users,
    error,
    isLoading
  } = useSWR('/api/chat', fetcher, {
    refreshInterval: 1000
  })

  users?.find((user: TUserWithChat) => user.email === currentUser?.email)

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>Error!</p>

  return (
    <main>
      <div className="grid-cols-1[fr] grid md:grid-cols-[300px_1fr]">
        {/* md 보다 클 때는 둘 다 보여야 됨 */}
        {/* md 보다 작고 layout이 true 일 때는 contact 안보임 */}
        <section className={`md:flex ${layout && 'hidden'}`}>
          Contact Component
        </section>

        {/* md 보다 클 때는 둘 다 보여야 됨 */}
        {/* md 보다 작고 layout이 false 일 때는 chat 안보임 */}
        <section className={`md:flex ${!layout && 'hidden'}`}>
          Chat Component
        </section>
      </div>
    </main>
  )
}

export default ChatClient
