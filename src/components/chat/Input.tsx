'use client'
import previewImage from '@/libs/previewImage'
import uploadImage from '@/libs/uploadImage'
import React, { FormEvent, useRef, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { IoImageOutline } from 'react-icons/io5'
import { RiSendPlaneLine } from 'react-icons/ri'
import useSWRMutation from 'swr/mutation'

interface InputProps {
  receiverId: string
  currentUserId: string
}

const sendRequest = async (
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
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  })
  return await res.json()
}

const Input = ({ receiverId, currentUserId }: InputProps) => {
  const [message, setMessage] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const imageRef = useRef<HTMLInputElement>(null)

  const { trigger } = useSWRMutation('/api/chat', sendRequest)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const imageUrl = image ? await uploadImage(image as File) : null

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
    setImage(null)
    setImagePreview(null)
  }

  const chooseImage = () => {
    imageRef.current?.click()
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full items-center justify-between gap-4 rounded-md border-[1px] border-gray-300 p-2 pl-4 shadow-sm">
      {imagePreview && (
        <div className="absolute right-0 bottom-[4.2rem] w-full max-w-[300px] overflow-hidden rounded-md shadow-md">
          <img
            src={imagePreview}
            alt=""
          />
          <span
            onClick={removeImage}
            className="absolute top-[0.4rem] right-[0.4rem] flex cursor-pointer items-center justify-center rounded-full bg-gray-900 p-2 text-xl text-white opacity-60 hover:opacity-100">
            <CgClose />
          </span>
        </div>
      )}

      <input
        className="w-full text-base outline-none"
        type="text"
        placeholder="메시지를 작성해주세요."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <input
        type="file"
        className="hidden"
        ref={imageRef}
        onChange={e => previewImage(e, setImagePreview, setImage)}
        accept="image/*"
        multiple={false}
      />

      <div
        onClick={chooseImage}
        className="cursor-pointer text-2xl text-gray-200">
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
