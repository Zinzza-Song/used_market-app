import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className="mx-auto flex h-[60vh] w-full max-w-6xl flex-row items-center justify-center py-40">
      <RotatingLines
        strokeColor="gray"
        strokeWidth="5"
        animationDuration="0.75"
        width="30"
        visible={true}
      />
    </div>
  )
}

export default Loader
