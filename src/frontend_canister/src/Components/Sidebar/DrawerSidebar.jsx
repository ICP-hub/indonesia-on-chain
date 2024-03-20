/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useDispatch } from 'react-redux';
import { BiLogOutCircle } from "react-icons/bi";
import { logoutStart } from '../Reducers/InternetIdentityReducer';
import IndonesiaLogo from "../../../assets/Vectors/logo.png";
import { Drawer } from '@mui/material';
import { useSidebar } from '../../hooks/useSidebar';

const DrawerSidebar = ({ mobileDrawer, setMobileDrawer }) => {
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
                <div className="h-full w-full flex flex-col space-y-6 py-7 px-2 lg:px-3 relative">

                    <div className='flex flex-row justify-center items-center'>
                        <a href="#" className="text-white w-auto h-20 space-x-2 lg:px-4">
                            <img src={IndonesiaLogo} alt="Logo" className='w-full h-full object-contain' />
                        </a>
                    </div>

                    <nav className="flex flex-col justify-center items-center w-full">

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

                    <div className='px-3 absolute left-0 bottom-2 w-full flex justify-center'>
                        <button
                            className="flex text-gray-600 items-center gap-2 justify-center w-full py-2 hover:bg-red-500 rounded-lg hover:text-white"
                            onClick={() => { !isLoading && handleLogout() }}>
                            <BiLogOutCircle size={28} />
                            <span className='text-medium hidden lg:block'>Log Out</span>
                        </button>
                    </div>
                </div>
            </Drawer>
        </>

    )
}

export default DrawerSidebar
