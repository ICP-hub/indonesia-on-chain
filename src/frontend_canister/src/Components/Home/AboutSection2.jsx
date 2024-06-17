import React from 'react';
import png1 from "../../../assets/images/Teacher.png"
import png2 from '../../../assets/images/Students.png'
import { useTranslation } from 'react-i18next';
const AboutSection2 = () => {
    const { t } = useTranslation();
    return (
        <section className="about-section bg-white  w-full  "> 
        
        <div id="AboutUs" className=" w-full flex flex-col mx-auto">
            <div className="mx-auto flex-col space-x-4">
                <div className=" text-center  mb-8 lg:mb-0">
                    <h2 className="text-4xl font-[700] font-sans mb-4  px-1 py-0">

                        <span className='text-indigo-800 font-sans'>{t('about.section2.whatIs')}</span> <span className='text-purple-500 font-sans'>{t('about.section2.Chain')}
                        </span>
                    </h2>
                    <p className="text-gray-600 mb-8 font-[400] font-sans mx-auto  w-full">
                    {t('about.section2.platformDescription')}
                    </p>
                </div>

                {/* flex items-center justify-center */}
                <div className='flex flex-col justify-center items-center lg:flex-row lg:justify-between gap-5  xl:flex-row xl:justify-evenly'>
                    <div className=' relative md:top-8 md:right-0 md:bottom-0 '>
                        <img src={png1} alt="logo"
                            className=''
                        />
                        <div className="absolute left-[30%] top-[30%] items-center flex flex-col justify-center items-center">
                            <div className='text-start'>
                                <p className='flex justify-center text-white text-2xl font-bold'>{t('about.section2.forEducators')}</p>
                                <button className=" font-poppins mt-4 self-start px-7 py-4 bg-transparent text-white rounded-full font-semibold tracking-wide cursor-pointer border border-white transition duration-300">

                                    <span className='font-poppins '>{t('about.section2.startCourseToday')}</span>
                                </button>
                            </div>
                        </div>

                    </div>




                    <div className=' relative md:top-8 md:right-0 md:bottom-0 '>
                        <img src={png2} alt="logo"
                            className=' xl:mt-[0rem]'
                        />
                        <div className="absolute left-[30%]  top-[30%] items-center flex flex-col justify-end">
                            <p className='flex justify-center text-white text-2xl font-bold'>{t('about.section2.forStudents')}</p>
                            <button className=" font-poppins mt-4  px-7 py-4  text-white rounded-full font-semibold  cursor-pointer bg-[#7B61FF] ">
                                <span className='font-poppins w-full'>{t('about.section2.getStarted')}</span>
                            </button>
                        </div>

                    </div>


                </div>

            </div>
        </div>
       
    </section>
    );
}


export default AboutSection2;