import { TUserWithChat } from '@/types'
import React from 'react'
import Input from './Input'

interface ChatProps {
  currentUser: TUserWithChat
  receiver: {
    receiverId: string
    receiverName: string
    receiverImage: string
  }
  setLayout: (layout: boolean) => void
}

const Chat = ({ currentUser, receiver, setLayout }: ChatProps) => {
  if (!receiver.receiverName || !currentUser)
    return <div className="h-full w-full"></div>

  return (
    <div className="w-full">
      <div>{/* chat header */}</div>

      <div className="flex h-[calc(100vh_-_60px_-_70px_-_80px)] flex-col gap-8 overflow-auto p-4">
        {/* chat message */}
      </div>

      <div>
        <Input
          receiverId={receiver?.receiverId}
          currentUserId={currentUser?.id}
        />
      </div>
    </div>
  )
}

export default React.memo(Chat)
