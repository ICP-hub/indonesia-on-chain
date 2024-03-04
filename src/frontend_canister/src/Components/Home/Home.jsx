import React from 'react';
import Navbar from '../layouts/Navbar';
import { mainHomeSvg } from '../utils/svgData';
import PlayButton from '../../../assets/Vectors/PlayButton.png';
const Home = () => {

    return (

        <section className='w-full'>

            <div className=' bg-[#e7dfff] '>

                <div className='block'>
                    <Navbar />
                </div>

                <div className='flex justify-evenly items-center '>

                    <div className='block w-[33%]'>
                        <div className='text-3xl text-[20px]  block md:text-[45px]  leading-[67px] '>
                            <span className='text-[#7B61FF] font-[700] font-poppins'>Learning  </span>
                            <span className='text-indigo-800 font-[800] font-nunitoSans '>Blockchain is now much easier</span>

                        </div>
                        <p className='font-[400] text-[#464646] font-nunitoSans w-[75%]'>Indonesia on Chain is an interesting platform that will teach you in more an interactive way.</p>

                        <div className='mt-[43px] flex '>
                            <button className=" bg-indigo-600 px-[30px] py-[13px] text-white rounded-[80px]"
                                onClick={() => {
                                    !isLoading ? handleLogin() : ''
                                }}
                            >
                                Get Started
                            </button>

                            <div className='flex items-center px-8'>
                                <img className='h-[53px] w-[53px] ' src={PlayButton} alt="" />
                                <p className='font-poppins font-[400] pl-6'>Watch how it works</p>
                            </div>

                        </div>
                    </div>



                    <div
                        className='h-screen  items-end overflow-hidden'
                    >
                        {mainHomeSvg}
                    </div>
                </div>


            </div>
        </section>

    );
}

export default Home;