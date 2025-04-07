// 재사용이 용이하게 따로 컴포넌트로 만들어둠
import React from 'react'

interface HeadingProps {
  title: string
  subtitle?: string
  center?: boolean
}

const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="mt-2 font-light text-neutral-500">{subtitle}</div>
    </div>
  )
}

export default Heading
