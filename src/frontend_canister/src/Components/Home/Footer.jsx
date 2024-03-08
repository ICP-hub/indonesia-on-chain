import React from 'react';
import { NavLink } from 'react-router-dom';
import MainLogo from '../../../assets/Vectors/MainLogo.png'
const Footer = () => {
    return (
        <footer className="bg-[#252641] text-center  mt-[5rem]">

            <div className='flex justify-center items-center pt-4 p-8 md:p-16'>
                <img src={MainLogo} alt="" />

                <div className='w-[12rem] h-[4rem] text-center border-l-[1px] border-[#626381] ml-[2rem] pl-[1.90rem]'>
                    <span className='font-poppins font-[600] text-xl leading-8 tracking-wider text-white'>Virtual Class for Zoom</span>
                </div>
            </div>
            <div className=''>
                <p className="text-base font-[500] text-[#B2B3CF] font-poppins mt-[5rem]">Subscribe to get our Newsletter</p>
                <form className="mt-4 flex justify-center space-x-4">
                    <input
                        type="email"
                        placeholder="Your Email"
                        className=" border py-3 px-4 rounded-full border-[#83839A] bg-transparent"
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r px-7 from-[#545AE7] to-[#393FCF] text-white rounded-full font-poppins font-[500] text-base"
                    >
                        Subscribe
                    </button>
                </form>
            </div>

            <div className="flex justify-between p-6 flex-wrap">
                <div className='w-full '>
                    <ul className="flex justify-center md:text-[15px] font-[400]">
                        <li className="p-2">
                            <NavLink to="/careers" className="text-[#B2B3CF] hover:underline ">
                                Careers
                            </NavLink>
                            <span className="border-r border-[#626381] h-4 align-middle ml-4"></span>
                        </li>

                        <li className="p-2">
                            <NavLink to="/privacy" className="text-[#B2B3CF] hover:underline">
                                Privacy Policy
                            </NavLink>
                            <span className="border-r border-[#626381] h-4 align-middle ml-4"></span>
                        </li>
                        <li className="p-2">
                            <NavLink to="/terms" className="text-[#B2B3CF] hover:underline">
                                Terms & Conditions
                            </NavLink>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="text-[#B2B3CF] text-center px-4 -mt-4">
                © 2021 Indonesia on Chain, Inc. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
