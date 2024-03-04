import React from 'react'
import LatestNews from '../../../assets/Vectors/LatestNews.png'
import news1 from '../../../assets/Vectors/news1.png'
import news2 from '../../../assets/Vectors/news2.png'
import news3 from '../../../assets/Vectors/news3.png'

const AboutSection8 = () => {
    return (
        <section className='mx-[10%] '>
            <h2 className='text-4xl text-center mt-40 space-x-2'>
                <span className='text-[#2F327D] font-[700] font-nunitoSans'>Lastest News and Resources </span>



            </h2>

            <h2 className='text-center mt-4'>
                <span
                    className='text-2xl font-[400] font-poppins text-center text-[#696984]
            mt-[400px]'
                >See the developments that have occurred to Blockchain in the world.</span>
            </h2>


            <div className='w-full mt-[4.25rem] flex'>

                <div className='w-1/2'>
                    <img src={LatestNews} alt="" className='w-[80%]' />

                    <button className='bg-[#F4C467] px-[1.5625rem] py-1 rounded-full mt-8 mb-8'>
                        <span className='font-[500] font-poppins text-sm'>NEWS</span>
                    </button>

                    <h1 className='font-poppins font-[500] text-xl text-[#252641] leading-9 w-[80%]'>
                        Blockchain experts from around the globe have applauded the achievement
                    </h1>

                    <p className='font-poppins font-[400] text-[15px] leading-7 text-[#696984] mt-4 w-[80%]'
                    >Less than a year ago Blockchain Technologies Inc., the company that created Blockchain....</p>

                    <p className='font-poppins font-[400] text-[15px] leading-7 text-[#696984] mt-4 underline cursor-pointer'>
                        Read More
                    </p>
                </div>

                <div className='w-1/2 space-y-8'>

                    <div className='flex justify-between '>
                        <div className='relative'>
                            <img src={news1} alt="" className='' />
                            <button className='absolute bg-[#F4C467]  rounded-full px-[0.59rem] py-[0.2rem] right-4 bottom-[10%]'>
                                <span className='font-[400] font-poppins text-sm tracking-wide '>PRESS RELEASE</span>
                            </button>
                        </div>
                        <div className='pl-8 w-[60%]'>
                            <h1 className='font-poppins font-[500] text-base leading-8 text-[#252641] '>
                                Blockchain experts from around the globe have applauded the achievement
                            </h1>
                            <p className='font-poppins font-[400] text-xs leading-[1.75rem] tracking-wide text-[#696984] '>Blockchain Technologies Inc., the company that created Blockchain...</p>
                        </div>

                    </div>

                    <div className='flex justify-between '>
                        <div className='relative'>
                            <img src={news2} alt="" className='' />
                            <button className='absolute bg-[#F4C467]  rounded-full px-[0.59rem] py-[0.2rem] right-4 bottom-[10%]'>
                                <span className='font-[400] font-poppins text-sm tracking-wide '>NEWS</span>
                            </button>
                        </div>
                        <div className='pl-8 w-[60%]'>
                            <h1 className='font-poppins font-[500] text-base leading-8 text-[#252641] '>
                                Blockchain experts from around the globe have applauded the achievement
                            </h1>
                            <p className='font-poppins font-[400] text-xs leading-[1.75rem] tracking-wide text-[#696984] '>Blockchain Technologies Inc., the company that created Blockchain...</p>
                        </div>

                    </div>

                    <div className='flex justify-between '>
                        <div className='relative'>
                            <img src={news3} alt="" className='' />
                            <button className='absolute bg-[#F4C467]  rounded-full px-[0.59rem] py-[0.2rem] right-4 bottom-[10%]'>
                                <span className='font-[400] font-poppins text-sm tracking-wide '>NEWS</span>
                            </button>
                        </div>
                        <div className='pl-8 w-[60%]'>
                            <h1 className='font-poppins font-[500] text-base leading-8 text-[#252641] '>
                                Blockchain experts from around the globe have applauded the achievement
                            </h1>
                            <p className='font-poppins font-[400] text-xs leading-[1.75rem] tracking-wide text-[#696984] '>Blockchain Technologies Inc., the company that created Blockchain...</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection8
