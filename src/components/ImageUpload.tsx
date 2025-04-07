/* eslint-disable @typescript-eslint/no-explicit-any */
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import React from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleUpload = (result: any) => {
    console.log('result', result)
    onChange(result.info.secure_url)
  }

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={'test'}
      options={{ maxFiles: 1 }}>
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="frlex relative cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-300 transition hover:opacity-70">
            <TbPhotoPlus size={50} />
            {value && (
              <div className="absolute inset-0 h-full w-full">
                <Image
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                  alt=""
                />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload
