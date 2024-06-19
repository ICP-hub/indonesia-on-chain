/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { NavLink,Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { BiLogOutCircle } from "react-icons/bi";
import { logoutStart } from '../../Reducers/InternetIdentityReducer';
// import { logoutSvg } from '../../utils/svgData'

import DashboardIcon_1 from "../../../../assets/images/Dashboard-1.png";
import DashboardIcon_2 from "../../../../assets/images/Dashboard-2.png";
import MyCoursesIcon_1 from "../../../../assets/images/MyCourses-1.png";
import MyCoursesIcon_2 from "../../../../assets/images/MyCourses-2.png";
import MyCertificatesIcon_1 from "../../../../assets/images/Certificate-1.png";
import MyCertificatesIcon_2 from "../../../../assets/images/Certificate-2.png";
import MyProfileIcon_1 from "../../../../assets/images/profile-1.png";
import MyProfileIcon_2 from "../../../../assets/images/profile-2.png";
import MySettingIcon from "../../../../assets/images/settings.png";
import EnrollIcon_1 from "../../../../assets/images/enroll-1.png";
import EnrollIcon_2 from "../../../../assets/images/enroll-2.png";

import IndonesiaLogo from "../../../../assets/images/logo.png";

import { useTranslation } from "react-i18next";
const sidebarStruct = [{
    id: 0,
    name: t('DashboardComponents.educator.Dashboard'),
    icon: DashboardIcon_1,
    iconHover: DashboardIcon_2,
    path: "/student-dashboard?title=Student%20Dashboard",
}, {
    id: 1,
    name:  t('DashboardComponents.educator.MyCourses'),
    icon: MyCoursesIcon_1,
    iconHover: MyCoursesIcon_2,
    path: "/my-courses?title=Upload Courses",
}, {
    id: 1.1,
    name: t('DashboardComponents.educator.Enrollments'),
    icon: EnrollIcon_1,
    iconHover: EnrollIcon_2,
    path: "/enrollments?title=Enrollments",
}, {
    id: 2,
    name: t('DashboardComponents.educator.Certificates'),
    icon: MyCertificatesIcon_1,
    iconHover: MyCertificatesIcon_2,
    path: "/Certificates?title=Certificates",
}, {
    id: 3,
    name: t('DashboardComponents.educator.Profile'),
    icon: MyProfileIcon_1,
    iconHover: MyProfileIcon_2,
    path: "/MyProfile?title=My Profile",
}, {
    id: 4,
    name: t('DashboardComponents.educator.Settings'),
    icon: MySettingIcon,
    iconHover: MySettingIcon,
    path: "/Settings?title=Settings",
}]



const SideBar = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [hover, setHover] = useState({
        id: 0,
        hover: false,
    });
    // const dispatch = useDispatch();
    const handleLogout = async () => {
        setIsLoading(true);

        try {
            dispatch(logoutStart());
            setIsLoading(false);
            window.location.href =
                process.env.DFX_NETWORK === "ic" ?
                    '/' :
                    `/?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`;
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="relative flex-col hidden h-full px-2 space-y-6 py-7 lg:px-3 md:flex">

                <div className='flex flex-row items-center justify-center'>
                    <a href="#" className="w-20 h-10 space-x-2 text-white md:w-auto md:h-20 lg:px-4">
                        <img src={IndonesiaLogo} alt="Logo" className='object-contain w-full h-full' />
                    </a>
                </div>

                <nav className="flex flex-col items-start justify-start w-full">
                    <div className='w-full'>
                        <Link to="/student-dashboard" className="flex items-center py-4 xl:px-[5rem] px-[2rem]  mb-[2rem] rounded-lg transition duration-200 hover:bg-[#7B61FF] text-[#696969] hover:text-white">
                            <div className=""></div>
                            <span className="ml-2 font-poppins font-[600] text-base ">{t('DashboardComponents.educator.Dashboard')}</span>
                        </Link>
                    </div>
                    <div className='w-full'>

                    {
                        sidebarStruct.map((item) => (
                            <NavLink key={item.id} to={item.path} className={({ isActive }) => isActive ? `sidebar_nav_link bg-[#7B61FF]  text-white` : "sidebar_nav_link"} onMouseEnter={() => setHover({
                                id: item.id,
                                hover: true,
                            })} onMouseLeave={() => setHover({
                                id: item.id,
                                hover: false,
                            })}>
                                <div className="sidebar_icon_size">
                                    {
                                        hover.id === item.id && hover.hover ? (
                                            <img src={item.iconHover} alt={item.name} className='object-contain w-full h-full' />
                                        ) : (
                                            <img src={item.icon} alt={item.name} className='object-contain w-full h-full' />
                                        )
                                    }
                                </div>
                                <span className="hidden sidebar_text_style lg:block">{item.name}</span>
                            </NavLink>
                        ))
                    }
                    </div>
                </nav>

                <div className='absolute left-0 flex flex-col items-center justify-center w-full px-3 bottom-2'>

                    <button
                        className="flex items-center justify-center w-full gap-2 py-2 text-gray-600 rounded-lg hover:bg-red-500 hover:text-white"
                        onClick={() => { !isLoading && handleLogout() }}>
                        <BiLogOutCircle size={28} />
                        <span className='hidden text-medium lg:block'>{t('DashboardComponents.educator.LogOut')}</span>
                    </button>
                </div>
            </div>
        </>

    )
}

export default SideBar;

