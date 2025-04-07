// 재사용이 용이하게 따로 컴포넌트로 만들어둠
import React from 'react'

interface ContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="mx-auto max-w-[2520px] px-4 py-6 sm:px-2 md:px-10 xl:px-20">
      {children}
    </div>
  )
}

export default Container
