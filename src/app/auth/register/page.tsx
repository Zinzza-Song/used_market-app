'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async body => {
    setIsLoading(true)

    try {
      const { data } = await axios.post('/api/register', body)
      console.log(data)
      router.push('/auth/login')
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="grid h-[calc(100vh_-_56px)] place-items-center">
      {/* Register form */}
      <form
        className="flex min-w-[350px] flex-col justify-center gap-4"
        onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl">Register</h1>

        {/* Email Input */}
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        {/* Name Input */}
        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        {/* Password Input */}
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        {/* Register Button */}
        <Button label="Register" />

        {/* Link for Login */}
        <div className="text-center">
          <p className="text-gray-400">
            Aleady a member?{' '}
            <Link
              href="/auth/login"
              className="text-black hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default RegisterPage
