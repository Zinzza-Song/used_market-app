'use client'
import Button from '@/components/Button'
import { categories } from '@/components/categories/Categories'
import CategoryInput from '@/components/categories/CategoryInput'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ImageUpload from '@/components/ImageUpload'
import Input from '@/components/Input'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const ProductUploadPage = () => {
  const [isLodading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      latitude: 33.5563,
      longitude: 126.79581,
      imageSrc: '',
      price: 1
    }
  })

  const imageSrc = watch('imageSrc')
  const category = watch('category')

  const onSubmit: SubmitHandler<FieldValues> = data => {}

  const setCustomValue = (id: string, value: unknown) => {
    setValue(id, value)
  }

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}>
          <Heading
            title="Product Upload"
            subtitle="Upload your product"
          />

          <ImageUpload
            value={imageSrc}
            onChange={value => setCustomValue('imageSrc', value)}
          />

          {/* Title Input */}
          <Input
            id="title"
            label="Title"
            disabled={isLodading}
            register={register}
            errors={errors}
          />
          <hr className="border-neutral-300" />

          {/* Description Input */}
          <Input
            id="description"
            label="Description"
            disabled={isLodading}
            register={register}
            errors={errors}
          />
          <hr className="border-neutral-300" />

          {/* Price Input */}
          <Input
            id="price"
            label="Price"
            formatPrice
            disabled={isLodading}
            register={register}
            errors={errors}
          />
          <hr className="border-neutral-300" />

          {/* category */}
          <div className="gpa-3 grid max-h-[50vh] grid-cols-1 overflow-y-auto md:grid-cols-2">
            {categories.map(item => (
              <div
                key={item.label}
                className="col-span-1">
                <CategoryInput
                  onClick={category => setCustomValue('category', category)}
                  selected={category === item.path}
                  label={item.label}
                  icon={item.icon}
                  path={item.path}
                />
              </div>
            ))}
          </div>
          <hr className="border-neutral-300" />

          {/* KakaoMap 들어갈 곳 */}

          <Button label="상품 생성하기" />
        </form>
      </div>
    </Container>
  )
}

export default ProductUploadPage
