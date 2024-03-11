import React, { useState } from 'react'
import { logoutStart } from '../../Reducers/InternetIdentityReducer';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import IndonesiaOnChain from '../../../../assets/Vectors/IndonesiaOnChain.png'
import { logoutSvg, MyCourses, AllCoursesSvg, profileSvg, certSvg } from '../../utils/svgData'


const StudentSideBar = () => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const handleLogout = async () => {
        setIsLoading(true);
        try {
            dispatch(logoutStart());
            setIsLoading(false);
            window.location.href =
                process.env.DFX_NETWORK === "ic" ?
                    '/' :
                    `/?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`;
        } catch (error) {
            setIsLoading(false);
        }
    };
    return (
        <>
            {/* Your side navbar code */}
            <div className=" flex flex-col space-y-6 py-7 px-2">

                <div className='flex flex-row justify-center items-center'>
                    <a href="#" className="text-white  space-x-2 px-4">
                        <img src={IndonesiaOnChain} alt="" />
                    </a>
                </div>

                <nav className="flex flex-col justify-center items-center w-full">
                    <div className='w-full'>
                        <Link to="/student-dashboard" className="flex items-center  py-4 px-[5rem] mt-[3.5rem] mb-[2rem] rounded-lg transition duration-200 hover:bg-purple-500 hover:text-white">
                            <div className=""></div>
                            <span className="ml-2 font-poppins font-[600] text-base text-[#696969]">Dashboard</span>
                        </Link>
                    </div>
                    <div className='w-full'>

                        <Link to="/my-courses" className="flex items-center  py-4 px-[5rem]  mb-[2rem] rounded-lg transition duration-200 hover:bg-purple-500 hover:text-white ">
                            {MyCourses}
                            <span className="ml-2 font-poppins font-[600] text-base text-[#696969]">My Courses</span>
                        </Link>
                    </div>
                    <div className='w-full'>
                        <Link to="/allCourses" className="flex items-center  py-5 px-[5rem]  mb-[2rem] rounded-lg transition duration-200 hover:bg-purple-500 hover:text-white">
                            {AllCoursesSvg}

                            <span className="ml-2 font-poppins font-[600] text-base text-[#696969]">All Courses</span>
                        </Link>
                    </div>

                    <div className='w-full'>

                        <Link to="/Certificates" className="flex items-center  py-5 px-[5rem]  mb-[2rem] rounded-lg transition duration-200 hover:bg-purple-500 hover:text-white">
                            {certSvg}
                            <span className="ml-2 font-poppins font-[600] text-base text-[#696969]">Certificates</span>
                        </Link>
                    </div>
                    <div className='w-full'>
                        <Link to="/student-profile" className="flex items-center py-5 px-[5rem]  mb-[2rem] rounded-lg transition duration-200 hover:bg-purple-500 text-[#696969] hover:text-white">
                            {profileSvg}
                            <span className="ml-2 font-poppins font-[600] text-base ">Profile</span>
                        </Link>
                    </div>

                </nav>
                <div className='w-full'>
                    <button
                        className="group flex items-center py-5 px-[5rem] mt-60 hover:bg-[#7B61FF] text-[#696969] hover:text-white rounded-lg"
                        onClick={() => { !isLoading && handleLogout() }}>
                        {logoutSvg}
                        <span className="ml-2 font-poppins font-[600] text-base">Log Out</span>
                    </button>
                </div>
            </div>




        </>

    )
}

export default StudentSideBar
