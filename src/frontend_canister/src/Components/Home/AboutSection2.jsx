import React from 'react';
import png1 from "../../../assets/Vectors/Teacher.png"
import png2 from '../../../assets/Vectors/Students.png'
const AboutSection2 = () => {
    return (
        <section id="AboutUs" className=" w-full flex flex-col ">
            <div className="mx-auto flex flex-col ">
                <div className=" text-center  mb-8 lg:mb-0">
                    <h2 className="text-4xl font-[700] font-sans mb-4  ">

                        <span className='text-indigo-800 font-sans'>What is</span> <span className='text-purple-500 font-sans'>Indonesia on Chain?
                        </span>
                    </h2>
                    <p className="text-gray-600 mb-8 font-[400] font-sans mx-auto w-[50%]">
                        Indonesia on Chain is a platform offers a dynamic learning experience, providing comprehensive courses that demystify blockchain technology. Whether you're a beginner or an enthusiast, our expertly curated content ensures a seamless journey into the world of blockchain.
                    </p>
                </div>


                <div className='md:flex md:justify-evenly'>
                    <div className=' relative md:top-8 md:right-0 md:bottom-0'>
                        <img src={png1} alt="logo"
                            className=''
                        />
                        <div className="absolute left-[30%]  top-[30%] items-center flex flex-col justify-end">
                            <p className='flex justify-center text-white text-2xl font-bold'>FOR EDUCATORS</p>
                            <button className=" font-poppins mt-4 self-start px-7 py-4 bg-transparent text-white rounded-full font-semibold tracking-wide cursor-pointer border border-white transition duration-300">

                                <span className='font-poppins'>Start a course today</span>
                            </button>
                        </div>

                    </div>




                    <div className=' relative top-8 right-0 bottom-0'>
                        <img src={png2} alt="logo"
                            className=''
                        />
                        <div className="absolute left-[30%]  top-[30%] items-center flex flex-col justify-end">
                            <p className='flex justify-center text-white text-2xl font-bold'>FOR EDUCATORS</p>
                            <button className=" font-poppins mt-4  px-7 py-4  text-white rounded-full font-semibold  cursor-pointer bg-[#7B61FF] ">
                                <span className='font-poppins'>Get Started</span>
                            </button>
                        </div>

                    </div>


                </div>

            </div>
        </section>
    );
}


export default AboutSection2;