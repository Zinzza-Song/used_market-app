// 재사용이 용이하게 따로 컴포넌트로 만들어둠
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  register,
  required,
  errors
}) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <span className="absolute top-5 left-2 text-neutral-700">₩</span>
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        className={`w-full rounded-md bg-white p-4 pt-6 font-light transition outline-none disabled:cursor-not-allowed disabled:opacity-70 ${formatPrice ? 'pl-9' : 'pl-4'} ${errors[id] ? 'border-rose-500' : 'border-neutral-300'} ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'} `}
      />
      <label
        className={`text-md absolute top-5 z-10 origin-[0] -translate-y-3 transform duration-150 ${formatPrice ? 'left-9' : 'left-4'} peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 ${errors[id] ? 'text-rose-500' : 'text-zinc-400'} `}>
        {label}
      </label>
    </div>
  )
}

export default Input
