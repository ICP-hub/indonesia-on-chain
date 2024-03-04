import React from 'react';
import ScreenPage from '../../../assets/Vectors/ScreenPage.png'
import GreenCircle from '../../../assets/Vectors/GreenCircle.png'
import CyanCircle from '../../../assets/Vectors/CyanCircle.png'
import PurpleCircle from  '../../../assets/Vectors/PurpleCircle.png'
import RedCircle from '../../../assets/Vectors/RedCircle.png'

const AboutSection7 = () => {

    return (
        <>
            <section className='mx-[10%] flex mt-[10rem]'>

                <div className='w-2/3 relative'>
                    <img src={ScreenPage} alt="" className='' />

                    <div>
                        <img src={GreenCircle} alt="green" className='absolute -top-[11%] left-[3rem] -z-10' />
                        <img src={CyanCircle} alt=""  className='absolute -top-[8%] left-[11rem] '/>
                        <img src={RedCircle} alt="" className='absolute left-[28.75rem] bottom-[8%]' />
                        <img src={PurpleCircle} alt=""  className='absolute left-[30rem] bottom-[5%] -z-10'/>
                    </div>
                </div>
                <div className='w-1/3 text-left pt-8 '>

                    <h2 className='text-3xl mb-8'>
                        <span className=' text-[#2F327D] font-[600] font-nunitoSans'>
                            Our Best Performers
                        </span>

                    </h2>

                    <p className='text-[#696984] font-[400] text-xl font-poppins w-[80%] leading-8'>
                        Meet our star students! Discover exceptional academic achievers and leaders on our website. From top grades to impactful contributions, be inspired by their success stories and celebrate excellence with us.
                    </p>
                </div>
            </section>

        </>
    );
}

export default AboutSection7;