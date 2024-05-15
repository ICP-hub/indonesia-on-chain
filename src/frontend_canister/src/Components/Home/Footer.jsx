import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-[#252641] text-center  ">

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
                                Careers
                            </NavLink>
                        </li>

                        <li className="border-r border-[#626381] px-4 flex justify-center items-center h-8">
                            <NavLink to="/privacy" className="text-[#B2B3CF] hover:underline text-center">
                                Privacy Policy
                            </NavLink>
                        </li>


                        <li className=" px-4 flex justify-center items-center h-8">
                            <NavLink to="/terms" className="text-[#B2B3CF] hover:underline text-center">
                                Terms & Conditions
                            </NavLink>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="text-[#B2B3CF] text-center px-4 py-4">
                © 2021 Indonesia on Chain, Inc. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
