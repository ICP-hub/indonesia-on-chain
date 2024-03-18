import React from 'react'
import Image from '../../Components/Auth/Image'
import SignUpEducatorComponent from '../../Components/Auth/SignUpEducatorComponent'


const SignUpEducator = () => {
  return (
    <div className='flex min-h-screen'>
      <Image />
      <div className='flex w-full justify-end'>
        <SignUpEducatorComponent />
      </div>
    </div>
  )
}

export default SignUpEducator
