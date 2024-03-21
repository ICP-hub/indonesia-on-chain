import React, { useEffect } from 'react'
import Image from '../../Components/Auth/Image'
import SignUpRolesComponent from '../../Components/Auth/SignUpRolesComponent'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const SignUpRoles = () => {

  const navigate = useNavigate();
  const { role } = useSelector((state) => state.users);
  useEffect(() => {

    if (role === "student") {
      navigate(
        process.env.DFX_NETWORK === "ic"
          ? '/student-dashboard'
          : `/student-dashboard?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`);
    } else if (role === "educator") {
      navigate(
        process.env.DFX_NETWORK === "ic"
          ? '/educator-dashboard'
          : `/educator-dashboard?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`);
    }
  })
  return (
    <div className='flex min-h-screen'>
      <Image />
      <div className='flex w-full justify-end'>
        <SignUpRolesComponent />
      </div>
    </div>
  )
}

export default SignUpRoles
