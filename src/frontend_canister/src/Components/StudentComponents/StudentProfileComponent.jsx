import React, { useState, useEffect } from "react";
import User from '../../../assets/images/User12.png';
import { useAuth } from "../utils/useAuthClient";
import { LiaPhoneSolid, LiaUser, LiaEnvelope, LiaUserEditSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { MdSchool } from 'react-icons/md';
import { FaAward } from 'react-icons/fa';
import { PiUserCircle } from "react-icons/pi";
import { LiaUniversitySolid } from 'react-icons/lia';

const StudentProfileComponent = () => {
    const [userinfo, setUserInfo] = useState(null);
    const { actor } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userinfo = await actor.get_user_info();
                setUserInfo(userinfo.ok);
            } catch (error) {
                const message = error.message;
                const startIndex = message.indexOf("trapped explicitly:");
                const errorMessageSubstring = message.substring(startIndex);
                const endIndex = errorMessageSubstring.indexOf(":");
                const finalErrorMessage = errorMessageSubstring.substring(endIndex + 1).trim();
                toast.error(finalErrorMessage);
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleFlattenList = (data) => {
        return data.reduce((acc, val) => {
            return acc.concat(Array.isArray(val) ? handleFlattenList(val) : val);
        }, []);
    }

    return (
        <>
            {userinfo ? (
                <div>
                    <div className='md:flex md:justify-center w-full gap-6 -z-10 '>
                        <div className='items-start block md:hidden'>
                            <h1 className='font-poppins font-bold text-2xl mb-[24px] leading-10 text-black'>Profile</h1>
                        </div>
                        <div className='bg-white rounded-xl shadow-lg p-10 md:w-1/2  w-full md:ml-12 relative'>
                            <div className="flex flex-col justify-start">
                                <div className='flex  md:flex-col   lg:flex-row'>
                                    <img
                                        className="md:w-24 md:h-24 w-16 h-16 rounded-full border-2 border-purple-500"
                                        src={userinfo.profileImage ? userinfo.profileImage : User}
                                        alt="Profile"
                                    />
                                    <div className='ml-4 sm:my-auto mt-2 md:mt-2 '>
                                        <div className="font-[400] text-sm text-[#707070] font-poppins flex items-center gap-2">
                                            <LiaUser />
                                            {userinfo.name}
                                        </div>
                                        <div className="font-[400] text-sm text-[#707070] font-poppins flex items-center gap-2">
                                            <LiaPhoneSolid />
                                            {userinfo.phone}
                                        </div>
                                        <div className="font-[400] text-sm text-[#707070] font-poppins flex items-center gap-2 ">
                                            <LiaEnvelope />
                                            {userinfo.email}
                                        </div>
                                    </div>
                                    <div className='absolute right-8'>
                                        <Link to={'edit-profile?title=Edit Profile'} state={userinfo}>
                                            <LiaUserEditSolid size={20} />
                                        </Link>
                                    </div>
                                </div>
                                <div className='flex gap-4 mt-4 items-center'>
                                    <span className='font-poppins font-[600] text-xl text-black'>{userinfo.userName}</span>
                                    <span className='bg-[#EFF1FF] rounded-full font-poppins font-[500] text-sm text-[#6478FF] text-center py-1 px-3 '> {userinfo.role}</span>
                                </div>
                            </div>
                            <div className="mt-6 break-words overflow-auto">
                                <p className="font-[400] font-poppins text-black text-base leading-6">
                                    {userinfo.bio[0]}
                                </p>
                            </div>
                            <div className="mt-6 flex flex-col justify-start">
                                <h3 className="text-xl font-[600] text-black font-poppins">Education</h3>
                                {
                                    userinfo.university[0].length !== 0 && userinfo.degree[0].length !== 0 && userinfo.cgpa[0].length !== 0 ?

                                        <div className="w-full flex flex-col gap-3 bg-[#EFF1FF] p-3 border border-[#dde0f3] mt-2 rounded-md relative">
                                            <div className='flex items-center  gap-2'>
                                                <LiaUniversitySolid size={24} />
                                                <div className="font-[400] font-poppins text-sm">University/School: {userinfo.university[0] || "N/A"}</div>
                                            </div>
                                            <div className='flex items-center  gap-2'>
                                                <MdSchool size={24} />
                                                <div className="font-[400] font-poppins text-sm">Degree/Course: {userinfo.degree[0] || "N/A"}</div>
                                            </div>
                                            <div className='flex items-center  gap-2'>
                                                <FaAward size={24} />
                                                <div className="font-[400] font-poppins text-sm">CGPA/Percentage: {userinfo.cgpa[0] || "N/A"}</div>
                                            </div>
                                        </div> : <div className="w-full p-3 border border-[#C1C9FF] rounded-md">
                                            No education details found
                                        </div>
                                }
                            </div>
                        </div>
                        <div className='flex flex-col w-full lg:w-1/2 mr-10 justify-between space-y-3 mt-4 md:mt-0'>
                            <div className="bg-white w-full rounded-xl p-6 shadow-lg ">
                                <h3 className="text-xl font-poppins font-[600] mt-[1.2rem] ml-[2.25rem]">Interests</h3>
                                <div className="flex flex-wrap gap-x-8 gap-y-4 mt-[2rem] ml-[1.5rem] pb-4">
                                    {handleFlattenList(userinfo.interest).length > 0 ?
                                        handleFlattenList(userinfo.interest).map((interest, index) => <div key={index} className="bg-[#EFF1FF] text-[#6478FF] rounded-full  px-4 py-1 font-poppins font-[500] text-sm ">{interest}</div>) :
                                        <div className="w-full p-3 border border-[#C1C9FF] rounded-md">
                                            No interest found
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="bg-white w-full rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-poppins font-[600] mt-[1.2rem] ml-[2.25rem] mb-4">Social Media Accounts</h3>
                                <div className='space-y-4'>
                                    {handleFlattenList(userinfo.social).length > 0 ?
                                        handleFlattenList(userinfo.social).map((social, index) =>
                                            <div key={index} className="flex w-full p-2 gap-2 border border-[#C1C9FF] rounded-md items-center">
                                                <PiUserCircle />
                                                <input type="text" className='w-full outline-none bg-transparent' name="social" id="social" value={social} disabled />
                                            </div>) :
                                        <div className="w-full p-3 border border-[#C1C9FF] rounded-md">
                                            No Social Media Link found
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) :
                <div className="w-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            }
        </>
    )
}

export default StudentProfileComponent;
