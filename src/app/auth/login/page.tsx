'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async body => {
    setIsLoading(true)

    try {
      const data = signIn('credentials', body)
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
      <form
        className="flex min-w-[350px] flex-col justify-center gap-4"
        onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl">Login</h1>

        {/* Emain Input */}
        <Input
          id="email"
          label="Email"
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

        {/* Login Button */}
        <Button label="Login" />

        {/* Link for Register */}
        <div className="text-center">
          <p className="text-gray-400">
            Not a member?{' '}
            <Link
              href="/auth/register"
              className="text-black hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default LoginPage
