// 재사용이 용이하게 따로 컴포넌트로 만들어둠
import React from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={`relative w-full cursor-pointer rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 ${outline ? 'bg-white' : 'bg-orange-500'} ${outline ? 'border-black' : 'border-orange-500'} ${outline ? 'text-black' : 'text-white'} ${small ? 'text-sm' : 'text-md'} ${small ? 'py-1' : 'py-3'} ${small ? 'font-light' : 'font-semibold'} ${small ? 'border-[1px]' : 'border-2'} `}>
      {Icon && (
        <Icon
          size={24}
          className="absolute top-3 left-4"
        />
      )}
      {label}
    </button>
  )
}

export default React.memo(Button)
