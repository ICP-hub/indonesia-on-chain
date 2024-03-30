/* eslint-disable react/prop-types */
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdMenu, MdNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import UserIconDefault from "../../../assets/images/user.png";

const Navbar = ({ setMobileDrawer, mobileDrawer, clickCounter }) => {
    const query = new URLSearchParams(window.location.search).get("title");

    return (
        <>
            <div className="sticky top-0 z-50 flex w-full p-3 px-6 md:p-6 md:px-8 lg:px-14 backdrop-blur-md">
                <div className="flex items-center w-2/12 md:hidden">
                    <span onClick={() => setMobileDrawer(!mobileDrawer)}>
                        <MdMenu size={22} />
                    </span>
                </div>
                <div className="hidden w-7/12 lg:flex">
                    <h1 className="text-3xl font-bold">{query || "Student Dashboard"}</h1>
                </div>
                <div className="flex items-center justify-end w-10/12 gap-8 md:w-full lg:w-5/12">
                    <div className="relative w-[280px] h-10 hidden md:flex">
                        <input type="text" name="search" id="search" className="w-full bg-white rounded-full input_foucs_border" />
                        <button className="absolute top-0 right-0 h-full p-2 font-bold rounded">
                            <IoSearchOutline color="#9990CC" size={20} />
                        </button>
                    </div>

                    <Link to={"/"}>
                        <MdNotifications size={22} />
                    </Link>
                    <Link to={"/profile"}>
                        <div className="flex items-center gap-2">

                            <div className="flex flex-col">
                                <p className="text-sm font-bold whitespace-nowrap lg:text-base">Suraj Aswal</p>
                                <p className="text-xs lg:text-sm">Educator</p>
                            </div>
                            <img src={UserIconDefault} alt="" className="w-10 h-10 border border-blue-300 rounded-full lg:w-12 lg:h-12" />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar