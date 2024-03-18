import React from 'react'
import Image from '../../Components/Auth/Image'
import SignUpSudentComponent from '../../Components/Auth/SignUpSudentComponent'

const SignUpStudent = () => {
  return (
    <div className='flex min-h-screen'>
      <Image />

      <div className='flex w-full justify-end'>
        <SignUpSudentComponent />
      </div>


    </div>
  )
}

export default SignUpStudent
