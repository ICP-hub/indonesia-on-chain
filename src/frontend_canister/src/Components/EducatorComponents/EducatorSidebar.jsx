/* eslint-disable react/prop-types */
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { BiLogOutCircle } from "react-icons/bi";
// import { logoutSvg } from '../../utils/svgData'

import DashboardIcon_1 from "../../../assets/Vectors/Dashboard-1.png";
import DashboardIcon_2 from "../../../assets/Vectors/Dashboard-2.png";
import MyCoursesIcon_1 from "../../../assets/Vectors/MyCourses-1.png";
import MyCoursesIcon_2 from "../../../assets/Vectors/MyCourses-2.png";
import MyCertificatesIcon_1 from "../../../assets/Vectors/Certificate-1.png";
import MyCertificatesIcon_2 from "../../../assets/Vectors/Certificate-2.png";
import MyProfileIcon_1 from "../../../assets/Vectors/profile-1.png";
import MyProfileIcon_2 from "../../../assets/Vectors/profile-2.png";
import MySettingIcon from "../../../assets/Vectors/settings.png";

import IndonesiaLogo from "../../../assets/Vectors/logo.png";

const sidebarStruct = [{
    id: 0,
    name: "Dashboard",
    icon: DashboardIcon_1,
    iconHover: DashboardIcon_2,
    path: "/educator-dashboard",
}, {
    id: 1,
    name: "My Courses",
    icon: MyCoursesIcon_1,
    iconHover: MyCoursesIcon_2,
    path: "/my-courses",
}, {
    id: 2,
    name: "Certificates",
    icon: MyCertificatesIcon_1,
    iconHover: MyCertificatesIcon_2,
    path: "/Certificates",
}, {
    id: 3,
    name: "My Profile",
    icon: MyProfileIcon_1,
    iconHover: MyProfileIcon_2,
    path: "/MyProfile",
}, {
    id: 4,
    name: "Settings",
    icon: MySettingIcon,
    iconHover: MySettingIcon,
    path: "/Settings",
}]



const EducatorSideBar = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [hover, setHover] = useState({
        id: 0,
        hover: false,
    });
    // const dispatch = useDispatch();
    const handleLogout = async () => {
        setIsLoading(true);
    };


    return (
        <>
            <div className="h-full flex-col space-y-6 py-7 px-2 lg:px-3 relative hidden md:flex">

                <div className='flex flex-row justify-center items-center'>
                    <a href="#" className="text-white w-20 h-10 md:w-auto md:h-20 space-x-2 lg:px-4">
                        <img src={IndonesiaLogo} alt="Logo" className='w-full h-full object-contain' />
                    </a>
                </div>

                <nav className="flex flex-col justify-center items-center w-full">

                    {
                        sidebarStruct.map((item) => (
                            <NavLink key={item.id} to={item.path} className="sidebar_nav_link" onMouseEnter={() => setHover({
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
                                <span className="sidebar_text_style hidden lg:block">{item.name}</span>
                            </NavLink>
                        ))
                    }
                </nav>

                <div className='px-3 absolute left-0 bottom-2 w-full flex justify-center'>
                    <button
                        className="flex text-gray-600 items-center gap-2 justify-center w-full py-2 hover:bg-red-500 rounded-lg hover:text-white"
                        onClick={() => { !isLoading && handleLogout() }}>
                        <BiLogOutCircle size={28} />
                        <span className='text-medium hidden lg:block'>Log Out</span>
                    </button>
                </div>
            </div>
        </>

    )
}

export default EducatorSideBar