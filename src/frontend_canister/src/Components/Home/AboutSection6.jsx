import React from 'react'
import img1 from '../../../assets/images/courseOne.png'
import img2 from '../../../assets/images/courseTwo.png'
import img3 from '../../../assets/images/courseThree.png'
import img4 from '../../../assets/images/courseFour.png'
const AboutSection6 = () => {
    return (
        <>
            <h2 className='text-4xl text-center mt-40 space-x-2'>
                <span className='font-poppins text-[#2F327D] font-[700]'>Our Best </span>
                <span className='font-nunitoSans text-[#7B61FF] font-[700]'>Blockchain</span>
                <span className='font-poppins text-[#2F327D] font-[700]'>Courses </span>


            </h2>

            <h2 className='text-center mt-4'>
                <span
                    className='text-2xl font-[400] font-poppins text-center text-[#696984]
                    mt-[400px]'
                >Dive into the world of blockchain with our top-notch courses! Here’s some of our Featured Courses.</span>
            </h2>


            <div className='w-full items-center'>
                <div className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12  mx-[10%] pt-[5.25rem] '>

                    <div className='col-span-3 relative p-8 w-full'>
                        <img src={img3} alt="" />

                        <div className='absolute bg-white p-6 flex justify-between space-x-4  py-4
                             rounded-md w-[75%] items-center left-[12.5%] bottom-12 font-quickSand
                        '>
                            <span className='font-[400] text-xs '>Blockchain Course</span>
                            <span className='font-[300] text-[10px]'>Advance</span>
                        </div>
                    </div>

                    <div className='col-span-3 relative p-8'>
                        <img src={img3} alt="" />

                        <div className='absolute bg-white p-6 flex justify-between space-x-4  py-4
                             rounded-md w-[75%] items-center left-[12.5%] bottom-12 font-quickSand
                        '>
                            <span className='font-[400] text-xs '>Blockchain Course</span>
                            <span className='font-[300] text-[10px]'>Advance</span>
                        </div>
                    </div>

                    <div className='col-span-3 relative p-8'>
                        <img src={img3} alt="" />

                        <div className='absolute bg-white p-6 flex justify-between space-x-4  py-4
                             rounded-md w-[75%] items-center left-[12.5%] bottom-12 font-quickSand
                        '>
                            <span className='font-[400] text-xs '>Blockchain Course</span>
                            <span className='font-[300] text-[10px]'>Advance</span>
                        </div>
                    </div>

                    <div className='col-span-3 relative p-8'>
                        <img src={img3} alt="" />

                        <div className='absolute bg-white p-6 flex justify-between space-x-4  py-4
                             rounded-md w-[75%] items-center left-[12.5%] bottom-12 font-quickSand
                        '>
                            <span className='font-[400] text-xs '>Blockchain Course</span>
                            <span className='font-[300] text-[10px]'>Advance</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AboutSection6;
