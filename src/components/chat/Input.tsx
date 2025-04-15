'use client'
import React, { FormEvent, useState } from 'react'
import { IoImageOutline } from 'react-icons/io5'
import { RiSendPlaneLine } from 'react-icons/ri'
import useSWRMutation from 'swr/mutation'

interface InputProps {
  receiverId: string
  currentUserId: string
}

const sendRequest = (
  url: string,
  {
    arg
  }: {
    arg: {
      text: string
      image: string
      receiverId: string
      senderId: string
    }
  }
) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  }).then(res => res.json())
}

const Input = ({ receiverId, currentUserId }: InputProps) => {
  const [message, setMessage] = useState('')
  const { trigger } = useSWRMutation('/api/chat', sendRequest)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const imageUrl = ''

    if (message || imageUrl) {
      try {
        trigger({
          text: message,
          image: imageUrl,
          receiverId: receiverId,
          senderId: currentUserId
        })
      } catch (err) {
        console.error(err)
      }
    }

    setMessage('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full items-center justify-between gap-4 rounded-md border-[1px] border-gray-300 p-2 pl-4 shadow-sm">
      <input
        className="w-full text-base outline-none"
        type="text"
        placeholder="메시지를 작성해주세요."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <div className="cursor-pointer text-2xl text-gray-200">
        <IoImageOutline />
      </div>
      <button
        type="submit"
        className="flex cursor-pointer items-center justify-center rounded-lg bg-orange-500 p-2 text-gray-500 hover:bg-orange-600 disabled:opacity-60">
        <RiSendPlaneLine className="text-white" />
      </button>
    </form>
  )
}

export default React.memo(Input)
