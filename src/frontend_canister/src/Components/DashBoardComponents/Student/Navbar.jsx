/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdMenu, MdNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import UserIconDefault from "../../../../assets/Vectors/user.png";

const Navbar = ({ setMobileDrawer, mobileDrawer }) => {
    const [navbarTitle, setNavbarTitle] = useState("Student Dashboard")
    const query = new URLSearchParams(window.location.search);
    console.log(query.get("title"))
    useEffect(() => {
        setNavbarTitle(query.get("title"))
        console.log(navbarTitle)
        return () => {
            setNavbarTitle("")
        }
    }, [navbarTitle])
    return (
        <>
            <div className="w-full px-6 p-3 md:p-6 md:px-8 lg:px-14 mt-2 flex">
                <div className="w-2/12 flex md:hidden items-center">
                    <span onClick={() => setMobileDrawer(!mobileDrawer)}>
                        <MdMenu size={22} />
                    </span>
                </div>
                <div className="w-7/12 hidden lg:flex">
                    <h1 className="font-bold text-3xl">{navbarTitle || "Student Dashboard"}</h1>
                </div>
                <div className="w-10/12 md:w-full lg:w-5/12 flex gap-8 items-center justify-end">
                    <div className="relative w-[280px] h-10 hidden md:flex">
                        <input type="text" name="search" id="search" className="input_foucs_border rounded-full bg-white w-full" />
                        <button className="font-bold p-2 rounded absolute top-0 right-0 h-full">
                            <IoSearchOutline color="#9990CC" size={20} />
                        </button>
                    </div>

                    <Link to={"/"}>
                        <MdNotifications size={22} />
                    </Link>
                    <Link to={"/profile"}>
                        <div className="flex items-center gap-2">

                            <div className="flex flex-col">
                                <p className="font-bold whitespace-nowrap text-sm lg:text-base">Suraj Aswal</p>
                                <p className="text-xs lg:text-sm">Educator</p>
                            </div>
                            <img src={UserIconDefault} alt="" className="w-10 h-10 lg:w-12 lg:h-12 border border-blue-300 rounded-full" />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar