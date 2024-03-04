import React from 'react';
import { blockchainBasicsSvg, innovateWithSvg, blockchainLearningPlatformSvg } from '../utils/svgData';

const AboutSection = () => (
    <section className="about-section bg-white  mb-36 w-full flex justify-center"> {/* Add min-h-screen and flex items-center for vertical centering */}
        <div className=" mx-auto flex   items-center justify-between"> {/* Change to justify-center for horizontal centering */}
            <div className=" text-center  mb-8 lg:mb-0"> {/* Adjust width to lg:w-1/2 and add margin-bottom */}
                <h2 className="text-4xl font-[700] font-sans mb-4 justify-center items-center">

                    <span className='text-purple-500 font-sans'>Blockchain</span> <span className='text-indigo-800 font-sans'>Learning Platform</span>
                </h2>
                <p className="text-gray-600 mb-8 font-[400] font-poppins">
                    Indonesia on Chain is a platform that offers a dynamic learning experience, providing comprehensive courses that demystify blockchain technology.
                </p>


                <div className='grid sm:grid-cols-1 lg:grid-cols-3 gap-4'>
                    <div className='col-span-1 flex '>
                        <div className="max-w-sm rounded-2xl   shadow-lg bg-white text-center p-6 m-4 flex flex-col items-center">
                            <div className="-mt-12 flex items-center justify-center   -top-2 left-1/2 transform -translate-y-1/4">{blockchainBasicsSvg}</div>
                            <h2 className="text-2xl font-bold mb-2 grid-cols-2">Blockchain Basics Bootcamp</h2>
                            <p className="text-gray-700 text-base">
                                Master the essentials of blockchain technology and build a strong foundation for the blockchain revolution with hands-on learning.
                            </p>
                        </div>
                    </div>

                    <div className='col-span-1 flex '>
                        <div className="max-w-sm rounded-2xl   shadow-lg bg-white text-center p-6 m-4 flex flex-col items-center">
                            <div className="-mt-12  flex items-center justify-center   -top-2 left-1/2 transform -translate-y-1/4 ">{innovateWithSvg}</div>
                            <h2 className="text-2xl font-bold mb-2 grid-cols-2">Innovate with Blockchain</h2>
                            <p className="text-gray-700 text-base">
                                Join the Blockchain Innovators Hub to collaborate on cutting-edge projects, explore emerging technologies, and network with industry enthusiasts.
                            </p>
                        </div>
                    </div>

                    <div className='col-span-1 flex '>
                        <div className="max-w-sm rounded-2xl   shadow-lg bg-white text-center p-6 m-4 flex flex-col items-center">
                            <div className="-mt-12 flex items-center justify-center   -top-2 left-1/2 transform -translate-y-1/4 "
                            >{blockchainLearningPlatformSvg}</div>
                            <h2 className="text-2xl font-bold mb-2 grid-cols-2">Innovate with Blockchain</h2>
                            <p className="text-gray-700 text-base">
                                Indonesia on Chain is a platform offers a dynamic learning experience, providing comprehensive courses that demystify blockchain technology. Whether you're a beginner or an enthusiast, our expertly curated content ensures a seamless journey into the world of blockchain.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
);

export default AboutSection;
