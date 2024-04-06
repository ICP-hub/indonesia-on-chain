/* eslint-disable react/prop-types */
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdMenu, MdNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import UserIconDefault from "../../../assets/images/default-user.png";
import { useAuth } from "../utils/useAuthClient";
import { setMobileNav } from "../Reducers/utilityReducer";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoFail, setUserInfoSuccess } from "../Reducers/UserLogin";

const Navbar = ({ type }) => {
    const utilityState = useSelector((state) => state.utility);
    const { userInfo, userInfoError } = useSelector(state=>state.users)
    const dispatch = useDispatch()
    const { actor } = useAuth();

    const formatDate = (bigintDate) => {
        const bigintStr = bigintDate.toString();
        const millisStr = bigintStr.slice(0, -6); // Extract milliseconds part
        const millis = parseInt(millisStr, 10); // Convert milliseconds part to number
        const date = new Date(millis);
        return date.toLocaleString(); // Adjust formatting as needed
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await actor.get_user_info();
                console.log("selectActor", userData)
                console.log("user", userData.ok.user_id.toText());
                dispatch(setUserInfoSuccess({
                    user_id: userData.ok.user_id.toText(),
                    name: userData.ok.name,
                    email: userData.ok.email,
                    active: userData.ok.active,
                    createdAt: formatDate(BigInt(userData.ok.createdAt)),
                    lastLoginAt: formatDate(BigInt(userData.ok.lastLoginAt[0])),
                    phone: userData.ok.phone,
                    profileImage: userData.ok.profileImage[0],
                    bio: userData.ok.bio[0],
                    role: userData.ok.role,
                    status: userData.ok.status,
                    degree: userData.ok.degree[0],
                    qualification: userData.ok.qualification[0],
                    university: userData.ok.university[0],
                    cgpa: userData.ok.cgpa[0],
                    experience: userData.ok.experience[0],
                    completedCourse: userData.ok.completedCourse,
                    ongoingCourse: userData.ok.ongoingCourse,
                    nationalId: userData.ok.nationalId[0],
                    nationalIdProof: userData.ok.nationalIdProof[0],
                    interest: userData.ok.interest,
                    social: userData.ok.social,
                    isEmailVerified: userData.ok.isEmailVerified,
                    userName: userData.ok.userName,
                    updatedAt: formatDate(BigInt(userData.ok.updatedAt)),
                }));

            } catch (error) {
                console.log(error);
                dispatch(setUserInfoFail("Something Went Wrong!"))
            }
        };
        fetchData();
    }, []);


    return (
        <>
            <div className="sticky top-0 z-50 flex w-full p-3 px-6 md:p-6 md:px-8 lg:px-14 backdrop-blur-md">
                <div className="flex items-center w-2/12 md:hidden">
                    <span onClick={() => setMobileNav(true)}>
                        <MdMenu size={22} />
                    </span>
                </div>
                <div className="hidden w-7/12 lg:flex">
                    <h1 className="text-3xl font-bold">{type === "student" ? utilityState.studentPageTitle : utilityState.educatorPageTitle}</h1>
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
                    <Link to={"/student-dashboard/my-profile?title=My%20Profile"}>
                        <div className="flex items-center gap-2">

                            <div className="flex flex-col">
                                <p className="text-sm font-bold whitespace-nowrap lg:text-base">{userInfo && userInfo.name ? userInfo.name : "N/A"}</p>
                                <p className="text-xs lg:text-sm">{userInfo && userInfo.role ? userInfo.role : "N/A"}</p>
                            </div>
                            <img src={userInfo && userInfo.profileImage ? userInfo.profileImage : UserIconDefault} alt="User Profile Image" className="w-10 h-10 border border-blue-300 rounded-full lg:w-12 lg:h-12" />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar