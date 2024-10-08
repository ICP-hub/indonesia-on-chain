import React, { useState, useEffect } from "react";
import User from '../../../../assets/images/User12.png';
import UserIconDefault from "../../../../assets/images/default-user.png";
import { useAuth } from "../../utils/useAuthClient";
import { LiaPhoneSolid, LiaUser, LiaEnvelope, LiaUserEditSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { MdSchool } from 'react-icons/md';
import { FaAward } from 'react-icons/fa';
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { PiUserCircle } from "react-icons/pi";
import { LiaUniversitySolid } from 'react-icons/lia';
import { useTranslation } from "react-i18next";

const EducatorProfileComponent = () => {
    const { t } = useTranslation();
    const [userinfo, setUserInfo] = useState(null);
    const { actor } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userinfo = await actor.get_user_info();
                console.log(userinfo,'hello I am user info')
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
    }, [actor]);

    const getIcon = (url) => {
        if (url.includes('instagram.com')) return <FaInstagram size="1.5em" />;
        if (url.includes('linkedin.com')) return <FaLinkedin size="1.5em" />;
        if (url.includes('x.com') || url.includes('twitter.com')) return <FaTwitter size="1.5em" />;
        return null;
    };

    const getHandle = (url) => {
        if (url.includes('instagram.com')) return url.replace('https://www.instagram.com/', '');
        if (url.includes('linkedin.com')) return url.replace('https://www.linkedin.com/in/', '');
        if (url.includes('x.com')) return url.replace('https://x.com/', '');
        if (url.includes('twitter.com')) return url.replace('https://twitter.com/', '');
        return url;
    };


    // const handleFlattenList = (data) => {
    //     return data.reduce((acc, val) => {
    //         return acc.concat(Array.isArray(val) ? handleFlattenList(val) : val);
    //     }, []);
    // }

    return (
        <>
            {userinfo ? (
                <div>
                    <div className='w-full gap-6 md:flex md:justify-center -z-10 '>
                        <div className='items-start block md:hidden'>
                            <h1 className='font-poppins font-bold text-2xl mb-[24px] leading-10 text-black'>{t('EducatorProfileComponent.Profile')}</h1>
                        </div>
                        <div className='relative w-full p-10 bg-white shadow-lg rounded-xl md:w-1/2 md:ml-12'>
                            <div className="flex flex-col justify-start w-full">
                                <div className='flex flex-wrap w-full md:flex-col lg:flex-row'>
                                    <img
                                        className="w-16 h-16 border-2 border-purple-500 rounded-full md:w-24 md:h-24"
                                        src={userinfo.profileImage ? userinfo.profileImage : UserIconDefault}
                                        alt="Profile"
                                    />
                                    <div className='mt-2 ml-4 overflow-x-auto sm:my-auto md:mt-2 '>
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
                                <div className='flex items-center gap-4 mt-4'>
                                    <span className='font-poppins font-[600] text-xl text-black'>{userinfo.userName}</span>
                                    <span className='bg-[#EFF1FF] rounded-full font-poppins font-[500] text-sm text-[#6478FF] text-center py-1 px-3 '> {userinfo.role}</span>
                                </div>
                            </div>
                            <div className="mt-6 overflow-hidden">
                                <p className="font-[400] font-poppins text-black text-base leading-6 break-words">
                                    {userinfo.bio}
                                </p>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-xl font-[600] text-black font-poppins">{t('EducatorProfileComponent.Educations')}</h3>

                                <div className="flex flex-col justify-start mt-6">
                                    {
                                        
                                        userinfo.education ? userinfo.education.map((edu, index) => (
                                            <div className="w-full flex flex-col gap-3 bg-[#EFF1FF] p-3 border border-[#dde0f3] mt-2 rounded-md relative">
                                                <div className='flex items-center gap-2'>
                                                    <LiaUniversitySolid size={24} />
                                                    <div className="font-[400] font-poppins text-sm">{t('EducatorProfileComponent.University')}: {edu.institution}</div>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <MdSchool size={24} />
                                                    <div className="font-[400] font-poppins text-sm">{t('EducatorProfileComponent.Degree')}: {edu.program}</div>
                                                </div>
                                                {/* <div className='flex items-center gap-2'>
                                                    <FaAward size={24} />
                                                    <div className="font-[400] font-poppins text-sm">{t('EducatorProfileComponent.CGPA')}: {edu.score}</div>
                                                </div> */}
                                            </div>
                                        )) : <div className="w-full">{t('EducatorProfileComponent.EducationDetails')}</div>

                                    }
                                </div>

                            </div>
                        </div>
                        <div className='flex flex-col w-full mt-4 mr-10 space-y-3 lg:w-1/2 md:mt-0'>
                            <div className="w-full p-6 bg-white shadow-lg rounded-xl ">
                                <h3 className="text-xl font-poppins font-[600] mt-[1.2rem] ml-[2.25rem]">{t('EducatorProfileComponent.Interests')}</h3>
                                <div className="flex flex-wrap gap-x-8 gap-y-4 mt-[2rem] ml-[1.5rem] pb-4">
                                    {userinfo.interest.length > 0 ?
                                        userinfo.interest.map((interest, index) => <div key={index} className="bg-[#EFF1FF] text-[#6478FF] rounded-full  px-4 py-1 font-poppins font-[500] text-sm ">{interest}</div>) :
                                        <div className="w-full p-3 rounded-md">
                                            {t('EducatorProfileComponent.Nointerest')}
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="w-full p-6 bg-white shadow-lg rounded-xl">
                                <h3 className="text-xl font-poppins font-[600] mt-[1.2rem] ml-[2.25rem] mb-4">{t('EducatorProfileComponent.SocialMedia')}</h3>
                                <div className="space-y-4">
                                    {userinfo && userinfo.social.length > 0 ? (
                                        userinfo.social.map((social, index) => (
                                            <div key={index} className="flex items-center w-full gap-2 p-2 text-blue-700 rounded-md">
                                                {getIcon(social)}
                                                <a href={social} target="_blank" rel="noopener noreferrer" className="w-full text-blue-700 bg-transparent outline-none">
                                                    <p className="w-full text-blue-700 bg-transparent outline-none" name="social" id="social" disabled>
                                                        {getHandle(social)}
                                                    </p>
                                                </a>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="w-full ml-[2.25rem] rounded-md">
                                            {t('StudentProfileComponent.NoSocial')}
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) :
                <div className="flex items-center justify-center w-full">
                    <div className="w-8 h-8 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
                </div>
            }
        </>
    )
}

export default EducatorProfileComponent;
