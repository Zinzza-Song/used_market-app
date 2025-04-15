import React from 'react'
import { IoChevronBackCircleSharp } from 'react-icons/io5'
import Avatar from '../Avatar'
import { formatTime } from '@/libs/dayjs'

interface ChatHeaderProps {
  setLayout: (layout: boolean) => void
  receiverName: string
  receiverImage: string
  lastMessageTime: Date | undefined
}

const ChatHeader = ({
  setLayout,
  receiverName,
  receiverImage,
  lastMessageTime
}: ChatHeaderProps) => {
  return (
    <div className="border-b-[1px] pl-4">
      <div className="flex h-16 items-center gap-4">
        <div className="flex items-center justify-center text-3xl text-gray-400 hover:text-gray-600">
          <button
            onClick={() => setLayout(false)}
            className="md:hidden">
            <IoChevronBackCircleSharp />
          </button>
        </div>

        <div className="flex items-center gap-[0.6rem]">
          <div>
            <Avatar src={receiverImage} />
          </div>
          <h2 className="text-lg font-semibold">
            {receiverName}
            {lastMessageTime && (
              <p className="text-gray-600">{formatTime(lastMessageTime)}</p>
            )}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ChatHeader)
