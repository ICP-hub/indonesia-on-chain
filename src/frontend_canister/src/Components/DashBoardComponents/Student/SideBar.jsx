import React, { useState } from 'react'
import { logoutStart } from '../../Reducers/InternetIdentityReducer';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import IndonesiaOnChain from '../../../../assets/Vectors/IndonesiaOnChain.png'
import { logoutSvg, MyCourses, AllCoursesSvg, profileSvg, certSvg, dashSvg } from '../../utils/svgData'


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
        <div >
            {/* Your side navbar code */}
            <div className=" flex flex-col space-y-6 py-7 px-2 min-h-screen  bg-white">

                <div className='flex flex-row justify-center items-center'>
                    <a href="#" className="text-white  space-x-2 px-4">
                        <img src={IndonesiaOnChain} alt="" />
                    </a>
                </div>

                <nav className="flex flex-col justify-start items-start w-full">
                    <div className='w-full'>
                        <Link to="/student-dashboard" className="flex items-center py-4 xl:px-[5rem] px-[2rem]  mb-[2rem] rounded-lg transition duration-200 hover:bg-[#7B61FF] text-[#696969] hover:text-white">
                            <div >
                                {dashSvg}
                            </div>
                            <span className="ml-2 font-poppins font-[600] text-base ">Dashboard</span>
                        </Link>
                    </div>
                    <div className='w-full'>

                        <Link to="/my-courses" className="flex items-center py-4 xl:px-[5rem] px-[2rem]  mb-[2rem] rounded-lg transition duration-200 hover:bg-[#7B61FF] text-[#696969] hover:text-white ">
                            <div>
                                {MyCourses}
                            </div>
                            <div>
                                <span className="ml-2 font-poppins font-[600] text-base ">My Courses</span>
                            </div>
                        </Link>
                    </div>
                    <div className='w-full'>
                        <Link to="/allCourses" className="flex items-center py-[1.5rem] xl:px-[5rem] px-[2rem]  mb-[2rem] rounded-lg transition duration-200 hover:bg-[#7B61FF] text-[#696969] hover:text-white">
                            <div>

                                {AllCoursesSvg}
                            </div>

                            <div>
                                <span className="ml-2 font-poppins font-[600] text-base ">All Courses</span>

                            </div>
                        </Link>
                    </div>

                    <div className='w-full'>

                        <Link to="/Certificates" className="flex items-center py-[1.5rem] xl:px-[5rem] px-[2rem]  mb-[1rem] rounded-lg transition duration-200 hover:bg-[#7B61FF] text-[#696969] hover:text-white">
                            <div>

                                {certSvg}
                            </div>

                            <div>
                                <span className="ml-2 font-poppins font-[600] text-base ">Certificates</span>

                            </div>
                        </Link>
                    </div>
                    <div className='w-full'>
                        <Link to="/student-profile" className="flex items-center py-5 xl:px-[5.2rem] px-[2rem]  mb-[2rem] rounded-lg transition duration-200 hover:bg-[#7B61FF] text-[#696969] hover:text-white">

                            <div>
                                {profileSvg}
                            </div>

                            <div>
                                <span className="ml-2 font-poppins font-[600] text-base ">Profile</span>
                            </div>
                        </Link>
                    </div>

                    <div className='w-full'>
                        <div
                            className="cursor-pointer flex items-center py-5 xl:px-[5rem] px-[2rem]  mb-[2rem] rounded-lg transition duration-200 hover:bg-[#7B61FF] text-[#696969] hover:text-white"
                            onClick={() => { !isLoading && handleLogout() }}>
                            <div>
                                {logoutSvg}
                            </div>

                            <div>
                                <span className="ml-2 font-poppins font-[600] text-base">Log Out</span>
                            </div>
                        </div>
                    </div>

                </nav>

            </div>




        </div>

    )
}

export default StudentSideBar
