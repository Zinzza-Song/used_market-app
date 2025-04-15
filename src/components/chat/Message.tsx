import React from 'react'
import Avatar from '../Avatar'
import { fromNow } from '@/libs/dayjs'

interface MessageProps {
  isSender: boolean
  messageText?: string | null
  messageImage?: string | null
  receiverName: string
  receiverImage: string
  senderImage?: string | null
  time: Date
}

const Message = ({
  isSender,
  messageText,
  messageImage,
  receiverName,
  receiverImage,
  senderImage,
  time
}: MessageProps) => {
  return (
    <div
      className="mx-auto grid w-full grid-cols-[40px_1fr] gap-3"
      style={{ direction: `${isSender ? 'rtl' : 'ltr'}` }}>
      <div>
        <Avatar src={senderImage && isSender ? senderImage : receiverImage} />
      </div>
      <div className="flex flex-col items-start justify-center">
        <div className="mb-2 flex items-center gap-2 text-sm">
          <span className="font-medium">{isSender ? 'You' : receiverName}</span>
          <span className="text-xs text-gray-500 opacity-80">
            {fromNow(time)}
          </span>
        </div>
        {messageText && (
          <div
            className={`rounded-lg p-2 break-all text-white ${isSender ? 'rounded-tr-none bg-orange-500' : 'rounded-tl-none bg-gray-400'} `}>
            <p>{messageText}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(Message)
