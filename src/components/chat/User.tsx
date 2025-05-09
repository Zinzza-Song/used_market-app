import { TConversation, TUserWithChat } from '@/types'
import React from 'react'
import Avatar from '../Avatar'
import { fromNow } from '@/libs/dayjs'

interface UserProps {
  user: TUserWithChat
  currentUserId: string
}

const User = ({ user, currentUserId }: UserProps) => {
  const messagesWithCurrentUser = user.conversations.find(
    (conversation: TConversation) =>
      conversation.users.find(user => user.id === currentUserId)
  )

  const latestMessage = messagesWithCurrentUser?.messages.slice(-1)[0]

  return (
    <div className="grid grid-cols-[40px_1fr_50px] grid-rows-[40px] gap-3 border-b-[1px] px-4 hover:cursor-pointer hover:bg-orange-500">
      <div className="">
        <Avatar src={user.image} />
      </div>

      <div className="overflow-hidden">
        <h3>{user.name}</h3>
        {latestMessage && (
          <p className="overflow-hidden text-xs font-medium break-words whitespace-pre-wrap text-gray-600">
            {latestMessage.text}
          </p>
        )}
        {latestMessage && latestMessage.image && (
          <p className="text-xs font-medium text-gray-600">[이미지]</p>
        )}
      </div>
      <div className="flex items-center justify-center text-xs text-gray-500">
        {latestMessage && <p>{fromNow(latestMessage.createdAt)}</p>}
      </div>
    </div>
  )
}

export default React.memo(User)
