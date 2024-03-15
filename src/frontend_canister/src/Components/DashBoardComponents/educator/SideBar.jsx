import React, { useState } from 'react'
import { logoutStart } from '../../Reducers/InternetIdentityReducer';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import IndonesiaOnChain from '../../../../assets/Vectors/IndonesiaOnChain.png'
import AllCourses from '../../../../assets/Vectors/AllCourses.png'
import Certificate from '../../../../assets/Vectors/Certificate.png'
import MyCourses from '../../../../assets/Vectors/MyCourses.png'
import Profile from '../../../../assets/Vectors/Profile.png'
import Dashboard from '../../../../assets/Vectors/Dashboard.svg'

import { FaCog, FaUser } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { PiCertificateFill } from "react-icons/pi";
import { logoutSvg } from '../../utils/svgData'


const EducatorSideBar = () => {

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
            <div className="flex flex-col space-y-6 py-7 px-2">

                <div className='flex flex-row justify-center items-center'>
                    <a href="#" className="text-white h-20 space-x-2 px-4">
                        <img src={IndonesiaOnChain} alt="Logo" className='w-full h-full' />
                    </a>
                </div>

                <nav className="flex flex-col justify-center items-center w-full">

                    <Link to="/educator-dashboard" className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-purple-500 ">
                        <RxDashboard />
                        <span className="ml-4 font-poppins font-[600] text-base text-[#696969]">Dashboard</span>
                    </Link>
                    <Link to="/my-courses" className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-purple-500 ">
                        <div className=" ">
                            <img src={MyCourses} alt="MyCourses" />
                        </div>
                        <span className="ml-4 font-poppins font-[600] text-base text-[#696969]">My Courses</span>
                    </Link>
                    <Link to="/allCourses" className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-purple-500 ">
                        <div className=" ">
                            <img src={AllCourses} alt="AllCourses" />
                        </div>
                        <span className="ml-4 font-poppins font-[600] text-base text-[#696969]">All Courses</span>
                    </Link>
                    <Link to="/Certificates" className="flex items-center py-2.5 px-5 rounded-lg transition duration-200 hover:bg-purple-500 ">
                        <PiCertificateFill />
                        <span className="ml-5 font-poppins font-[600] text-base text-[#696969]">Certificates</span>
                    </Link>
                    <Link to="/profile" className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-purple-500 ">
                        <FaUser />
                        <span className="ml-4 font-poppins font-[600] text-base text-[#696969]">Profile</span>
                    </Link>
                    <Link to="/profile" className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-purple-500 ">
                        <FaCog />
                        <span className="ml-4 font-poppins font-[600] text-base text-[#696969]">Profile</span>
                    </Link>

                </nav>
            </div>

            <div>
                <button
                    className="flex items-center justify-center w-full py-2 mt-60 hover:bg-purple-500 rounded-lg"
                    onClick={() => { !isLoading && handleLogout() }}>
                    <div className="">{logoutSvg}</div>
                    <span className="ml-2">Log Out</span>
                </button>
            </div>


        </>

    )
}

export default EducatorSideBar
