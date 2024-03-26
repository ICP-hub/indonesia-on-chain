import React, { useEffect } from 'react'
import Image from '../../Components/Auth/Image'
import SignUpRolesComponent from '../../Components/Auth/SignUpRolesComponent'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Components/utils/useAuthClient';

const SignUpRoles = () => {

  const navigate = useNavigate();
  const { role } = useSelector((state) => state.users);
  useEffect(() => {

    console.log("signup roles.jsx", role)
    if (role === "student") {
      navigate(
        process.env.DFX_NETWORK === "ic"
          ? '/student-dashboard/main'
          : `/student-dashboard/main?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`);
    } else if (role === "educator") {
      navigate(
        process.env.DFX_NETWORK === "ic"
          ? '/educator-dashboard/main'
          : `/educator-dashboard/main?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`);
    }
  })
  return (
    <div className='flex min-h-screen'>
      <Image />
      <div className='flex justify-end w-full'>
        <SignUpRolesComponent />
      </div>
    </div>
  )
}

export default SignUpRoles
