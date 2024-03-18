import React from 'react'
// import { searchIcon } from '../utils/svgData'

// import Language from '../../../assets/Vectors/Language.png'
const UpperSection= () => {
    return (

        <div className="mt-9 ml-16 flex sm:justify-between justify-center items-center">

            <div className='mr-2 '>
                <h1 className='font-poppins font-bold text-4xl leading-10 text-black'>Blockchain Course</h1>
            </div>

            <div className="sm:flex  gap-4 hidden">
                {/* Search bar */}
                <div className="relative">
                    <input
                        className="border-2 border-[#C7C2EE] bg-white h-10 px-5 pr-16 py-6 rounded-full text-sm focus:outline-none"
                        type="search"
                        name="search"
                        placeholder="Search"
                    />
                    <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                        {/* {searchIcon} */}
                    </button>
                </div>

                {/* Language */}
                <div>
                    <div className="text-sm font-semibold py-2 px-4 rounded inline-flex items-center cursor-pointer">
                        {/* <img src={Language} alt="" /> */}
                    </div>
                </div>

                {/* Name */}
                <div className='flex flex-col'>
                    <span className="text-base font-[600] font-poppins text-black">Name</span>
                    <span className="text-base text-[#989898] font-[400] font-poppins">2nd year</span>
                </div>

                {/* User image */}
                <div className=' pr-16' >
                    <img className="h-10 w-10 rounded-full" src="/path-to-your-image.jpg" alt="User" />
                </div>
            </div>
        </div>


    )
}

export default UpperSection;