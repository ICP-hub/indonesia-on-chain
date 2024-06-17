import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="bg-[#252641] text-center  w-full">

            <div className='flex justify-center items-center  p-8'>

                <div className='w-full text-sm md:text-base'>
                    <ul className="flex justify-center   font-normal">
                        <li className="border-r border-[#626381] px-4 flex justify-center items-center h-8"
                        >
                            <Link to='#' className="text-[#B2B3CF] hover:underline text-center"
                                onClick={(e) => {
                                    window.location.href = "mailto:info@indonesiaonchain.com";
                                    e.preventDefault();
                                }}
                            >
                                <MdEmail size={20} />
                            </Link>
                        </li>

                        <li className="border-r border-[#626381] px-4 flex justify-center items-center h-8">
                            <Link to="https://www.instagram.com/indonesiaonchain/ " target="_bank" className="text-[#B2B3CF] hover:underline text-center">
                                <FaInstagram size={20} />
                            </Link>
                        </li>

                        <li className="border-r border-[#626381] px-4 flex justify-center items-center h-8">
                            <Link to="https://twitter.com/Indoonchain" target="_bank" className="text-[#B2B3CF] hover:underline text-center">
                                <BsTwitterX size={20} />
                            </Link>
                        </li>


                        <li className=" px-4 flex justify-center items-center h-8">
                            <Link to="https://www.linkedin.com/company/101692895/admin/settings/manage-admins/" target="_bank" className="text-[#B2B3CF] hover:underline text-center">
                                <FaLinkedin size={20} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex justify-between p-6 flex-wrap text-sm md:text-base my-3">
                <div className='w-full '>
                    <ul className="flex justify-center   font-normal">
                        <li className="border-r border-[#626381] px-4 flex justify-center items-center h-8">
                            <NavLink to="/careers" className="text-[#B2B3CF] hover:underline text-center">
                            {t('footer.careers')}
                            </NavLink>
                        </li>

                        <li className="border-r border-[#626381] px-4 flex justify-center items-center h-8">
                            <NavLink to="/privacy" className="text-[#B2B3CF] hover:underline text-center">
                            {t('footer.privacyPolicy')}
                            </NavLink>
                        </li>


                        <li className=" px-4 flex justify-center items-center h-8">
                            <NavLink to="/terms" className="text-[#B2B3CF] hover:underline text-center">
                            {t('footer.termsConditions')}
                            </NavLink>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="text-[#B2B3CF] text-center px-4 py-4">
            {t('footer.copyright')}
            </div>
        </footer>
    );
};

export default Footer;
