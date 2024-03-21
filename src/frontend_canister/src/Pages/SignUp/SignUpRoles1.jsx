import React from 'react'
import Image from '../../Components/Auth/Image'
import SignUpRolesComponent from '../../Components/Auth/SignUpRolesComponent'
import SignUpSudentComponent from '../../Components/Auth/SignUpSudentComponent'
import SignUpEducatorComponent from '../../Components/Auth/SignUpEducatorComponent'
import StudentDashboardPage from '../DashboardPage/StudentDashboardPage'
import LandingPage from '../LandingPage/LandingPage'
import Error404 from '../Error404Page/Error404'
const SignUpRoles1 = () => {


    const path = window.location.pathname;

    if (path !== '/signup-role' && path !== '/signup-student' && path !== '/signup-educator' && path !== '/'
    && path !== '/student-dashboard') {
        return <Error404 />
    }

    return (
        <div className='flex min-h-screen '>
            <Image />
            <div className='flex w-full justify-end'>
                {path === '/signup-role'
                    ? <SignUpRolesComponent />
                    : path === '/signup-student'
                        ? <SignUpSudentComponent />
                        : path === '/signup-educator'
                            ? <SignUpEducatorComponent />
                            : path === '/student-dashboard'
                                ? <StudentDashboardPage />
                                : <LandingPage />
                }
            </div>
        </div>
    )
}

export default SignUpRoles1
