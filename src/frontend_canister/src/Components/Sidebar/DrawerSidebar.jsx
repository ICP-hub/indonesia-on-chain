/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useDispatch } from 'react-redux';
import { BiLogOutCircle } from "react-icons/bi";
import { logoutStart } from '../Reducers/InternetIdentityReducer';
import IndonesiaLogo from "../../../assets/Vectors/logo.png";
import { Drawer } from '@mui/material';
import { useSidebar } from '../../hooks/useSidebar';

const DrawerSidebar = ({ mobileDrawer, setMobileDrawer,setClickCounter }) => {
    let navLinkStyle = "w-full flex items-center py-2.5 my-3 px-2 lg:px-4 rounded-md transition duration-200 hover:bg-purple-500 hover:text-white text-[#696969]";
    let navLinkStyleActive = "w-full flex items-center py-2.5 my-3 px-2 lg:px-4 rounded-md bg-purple-500 text-white";

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const sidebarStruct = useSidebar()

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

    const handleCloseSidebar = () => {
        setMobileDrawer(!mobileDrawer);
    }
    return (
        <>
            <Drawer open={mobileDrawer} onClose={handleCloseSidebar}
                variant="temporary"
                ModalProps={{
                    keepMounted: false
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '60%' },
                }}
                anchor="left"

            >
                <div className="relative flex flex-col w-full h-full px-2 space-y-6 py-7 lg:px-3">

                    <div className='flex flex-row items-center justify-center'>
                        <a href="#" className="w-auto h-20 space-x-2 text-white lg:px-4">
                            <img src={IndonesiaLogo} alt="Logo" className='object-contain w-full h-full' />
                        </a>
                    </div>

                    <nav className="flex flex-col items-center justify-center w-full">

                        {
                            sidebarStruct.map((item) => (
                                <NavLink key={item.id} to={item.path} className={({ isActive }) => isActive ? navLinkStyleActive : navLinkStyle}
                                    onClick={() => {
                                        setClickCounter(p => p + 1)
                                        handleCloseSidebar()
                                    }}>
                                    {item.icon}
                                    <span className="sidebar_text_style">{item.name}</span>
                                </NavLink>
                            ))
                        }
                    </nav>

                    <div className='absolute left-0 flex justify-center w-full px-3 bottom-2'>
                        <button
                            className="flex items-center justify-center w-full gap-2 py-2 text-gray-600 rounded-lg hover:bg-red-500 hover:text-white"
                            onClick={() => { !isLoading && handleLogout() }}>
                            <BiLogOutCircle size={28} />
                            <span className='hidden text-medium lg:block'>Log Out</span>
                        </button>
                    </div>
                </div>
            </Drawer>
        </>

    )
}

export default DrawerSidebar
