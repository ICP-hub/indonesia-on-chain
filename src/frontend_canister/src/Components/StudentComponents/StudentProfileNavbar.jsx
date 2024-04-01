import React from 'react'
import { searchIcon } from '../utils/svgData'
import User from '../../../assets/images/User12.png'
import IndonesiaOnChain from '../../../assets/images/IndonesiaOnChain.png'
import { languageSvg } from '../utils/svgData'
import language from '../../../assets/images/Language.png'
const StudentProfileNavbar = () => {
    return (
        <>

            <div className="mt-9 ml-16 md:flex sm:justify-between justify-center items-center hidden ">
                <div className='mr-2 '>
                    <h1 className='font-poppins font-bold text-4xl  leading-10 text-black'>Profile</h1>
                </div>

                <div className="md:flex md:gap-x-1 hidden ">
                    {/* Search bar */}
                    <div className="relative">
                        <input
                            className="border-2 border-[#C7C2EE] bg-white h-10 px-5 pr-16 py-6 rounded-full text-sm focus:outline-none "
                            type="search"
                            name="search"
                            placeholder="Search"
                        />
                        <button type="submit" className="absolute right-0 top-0 mt-3 md:mr-4">
                            {searchIcon}
                        </button>
                    </div>

                    {/* Language */}
                    <div>
                        <div className="text-sm font-semibold py-2 px-4 rounded  cursor-pointer">
                            {languageSvg}
                        </div>
                    </div>

                    {/* Name */}
                    <div className='flex flex-col'>
                        <span className="text-base font-[600] font-poppins text-black">Name</span>
                        <span className="text-base text-[#989898] font-[400] font-poppins">2nd year</span>
                    </div>

                    {/* User image */}
                    <div className=' pr-16' >
                        <img className="h-10 w-10 rounded-full" src={User} alt="User" />
                    </div>
                </div>
            </div>

            <div className='flex md:hidden  items-center justify-between'>

                <img src={IndonesiaOnChain} alt="" className='w-[110px] h-[80px]' />

                <div className='flex justify-evenly items-center w-1/2'>
                    <div>
                        <button type="submit" className="top-0 mt-3">
                            {searchIcon}
                        </button>
                    </div>
                    <div className="text-sm cursor-pointer">
                        <img src={language} alt="" />
                    </div>

                    <div >
                        <img className="h-10 w-10 rounded-full" src={User} alt="User" />
                    </div>
                </div>
            </div>

        </>

    )
}

export default StudentProfileNavbar