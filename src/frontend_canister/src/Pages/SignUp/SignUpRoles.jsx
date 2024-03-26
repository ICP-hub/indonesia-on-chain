import React, { useEffect } from 'react'
import Image from '../../Components/Auth/Image'
import SignUpRolesComponent from '../../Components/Auth/SignUpRolesComponent'
import SignUpSudentComponent from '../../Components/Auth/SignUpSudentComponent'
import SignUpEducatorComponent from '../../Components/Auth/SignUpEducatorComponent'
import StudentDashboardPage from '../DashboardPage/Student/StudentDashboard'
import LandingPage from '../LandingPage/LandingPage'
import Error404 from '../Error404Page/Error404'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const SignUpRoles = () => {

  const navigate = useNavigate();
  const { role } = useSelector((state) => state.users);
  useEffect(() => {

    console.log("signup roles.jsx",role)
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
      <div className='flex justify-end w-full'>
        <SignUpRolesComponent />
      </div>
    </div>
  )
}

export default SignUpRoles
