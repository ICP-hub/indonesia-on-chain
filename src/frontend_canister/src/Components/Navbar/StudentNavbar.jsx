/* eslint-disable react/prop-types */
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdMenu, MdNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import UserIconDefault from "../../../assets/images/user.png";
import { useAuth } from "../utils/useAuthClient";

const Navbar = ({ setMobileDrawer, mobileDrawer, clickCounter }) => {
    const query = new URLSearchParams(window.location.search).get("title");

    const [userInfo, setUserInfo] = React.useState(null);
    const { actor } = useAuth();

    React.useEffect(() => {
        const fetchData = async () => {
            // console.log("selectActor harshit", selectActor)
            try {
                const userinfo = await actor.get_user_info();
                // console.log("selectActor", actor)
                console.log("user", userinfo.ok);
                setUserInfo(userinfo.ok);
            } catch (error) {
                const message = error.message;
                const startIndex = message.indexOf("trapped explicitly:");
                const errorMessageSubstring = message.substring(startIndex);
                const endIndex = errorMessageSubstring.indexOf(":");
                const finalErrorMessage = errorMessageSubstring.substring(endIndex + 1).trim();
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


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
                                <p className="text-sm font-bold whitespace-nowrap lg:text-base">{userInfo && userInfo.name ? userInfo.name : "N/A"}</p>
                                <p className="text-xs lg:text-sm">{userInfo && userInfo.role ? userInfo.role : "N/A"}</p>
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