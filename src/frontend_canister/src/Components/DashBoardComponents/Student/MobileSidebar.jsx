import React, { useState } from 'react';
import { logoutStart } from '../../Reducers/InternetIdentityReducer';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import IndonesiaOnChain from '../../../../assets/Vectors/IndonesiaOnChain.png';
// import menu from '../../../../assets/Vectors/menu.png'; // Assume you have a menu icon
import { logoutSvg, MyCourses, AllCoursesSvg, profileSvg, certSvg } from '../../utils/svgData';

const MobileSideBar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            dispatch(logoutStart());
            setIsLoading(false);
            window.location.href =
                process.env.DFX_NETWORK === "ic" ?
                    '/' :
                    '/?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID'
        }catch (error) {
        setIsLoading(false);
    }
};

return (
    <>
        <div className='w-full '>

            <div className="md:hidden flex justify-between items-center p-4">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {/* <img src={menu} alt="" className='absolute w-10 h-10 top-[4.75rem]' /> */}
                </button>
            </div>

            {/* Sidebar Navigation */}
            <div className={`transform top-0 left-0 md:w-[100%] w-[60%] md:bg-white backdrop-blur-xl fixed h-screen overflow-auto  ease-in-out transition-all duration-300 z-30 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:h-screen`}>


                <div className='flex flex-row justify-center '>
                    <img src={IndonesiaOnChain} alt="" className='' />
                </div>
                <span className={`absolute cursor-pointer top-2 right-6 ${isSidebarOpen ? 'block' : 'hidden'}`}
                    onClick={() => {
                        setIsSidebarOpen(!isSidebarOpen)
                    }}>
                    X
                </span>
                <nav className="flex flex-col mt-8 justify-start items-start w-full">
                    <div className='w-full'>
                        <Link to="/student-dashboard" className="flex items-center py-4 xl:px-[5rem] px-[2rem]  mb-[2rem] rounded-lg transition duration-200 hover:bg-[#7B61FF] text-[#696969] hover:text-white">
                            <div className=""></div>
                            <span className="ml-2 font-poppins font-[600] text-base ">Dashboard</span>
                        </Link>
                    </div>
                    <div className='w-full'>

                        <Link to="/my-courses" className="flex items-center py-4 xl:px-[5rem] px-[2rem]  mb-[2rem] rounded-lg transition duration-200 hover:bg-[#7B61FF] text-[#696969] hover:text-white ">
                            {MyCourses}
                            <span className="ml-2 font-poppins font-[600] text-base ">My Courses</span>
                        </Link>
                    </div>
                    <div className='w-full'>
                        <Link to="/allCourses" className="flex items-center py-[1.25rem] xl:px-[5rem] px-[2rem]  mb-[2rem] rounded-lg transition duration-200 hover:bg-[#7B61FF] text-[#696969] hover:text-white">
                            {AllCoursesSvg}

                            <span className="ml-2 font-poppins font-[600] text-base ">All Courses</span>
                        </Link>
                    </div>

                    <div className='w-full'>

                        <Link to="/Certificates" className="flex items-center py-[1.25rem] xl:px-[5rem] px-[2rem]  mb-[1rem] rounded-lg transition duration-200 hover:bg-[#7B61FF] text-[#696969] hover:text-white">
                            {certSvg}
                            <span className="ml-2 font-poppins font-[600] text-base ">Certificates</span>
                        </Link>
                    </div>
                    <div className='w-full'>
                        <Link to="/student-profile" className="flex items-center py-5 xl:px-[5.2rem] px-[2rem]  mb-[2rem] rounded-lg transition duration-200 hover:bg-[#7B61FF] text-[#696969] hover:text-white">
                            {profileSvg}
                            <span className="ml-2 font-poppins font-[600] text-base ">Profile</span>
                        </Link>
                    </div>

                    <div className='w-full'>
                        <div
                            className="cursor-pointer flex items-center py-5 xl:px-[5rem] px-[2rem]  mb-[2rem] rounded-lg transition duration-200 hover:bg-[#7B61FF] text-[#696969] hover:text-white"
                            onClick={() => { !isLoading && handleLogout() }}>
                            {logoutSvg}
                            <span className="ml-2 font-poppins font-[600] text-base">Log Out</span>
                        </div>
                    </div>

                </nav>

            </div>
        </div >
    </>
);
};

export default MobileSideBar;