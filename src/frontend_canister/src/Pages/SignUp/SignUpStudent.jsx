import React from 'react'
import Image from '../../Components/Auth/Image'
import SignUpSudent from '../../Components/Auth/SignUpSudentComponent'

const SignUpStudent = () => {
  console.log('Loading')

  return (
    <div className='flex min-h-screen'>
      <Image />

      <div className='flex w-full justify-end'>
        <SignUpSudent />
      </div>


    </div>
  )
}

export default SignUpStudent
