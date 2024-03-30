import React from 'react'
import Clasroom from '../../../assets/images/Classroom.png'
import orangeBox from '../../../assets/images/orangeBox.png'
import PurpleBox from '../../../assets/images/PurpleBox.png'
import Ellipse from '../../../assets/images/Ellipse.png'
import EllipsePurple from '../../../assets/images/EllipsePurple.png'
const AboutSection3 = () => {
    return (
        <section className=' mt-40 mx-[10%] flex justify-center  flex-col xl:flex-row xl:justify-between'>

            <div className=' w-full xl:w-1/2 relative items-center xl:items-start'>
                <img src={EllipsePurple} alt="" className='-z-10 absolute -left-5 top-[1.75rem]' />
                <div className='pt-12 items-center'>
                    <span className=' text-3xl text-[#2F327D] font-[600] font-poppins '>Everything you can do in a physical classroom, </span>
                    <span className=' text-3xl text-[#7B61FF] font-[600] font-poppins'>you can do here</span>
                </div>

                <p className='text-[#696984] font-[400] text-xl pt-4 font-poppins leading-8 w-full xl:w-[80%]
                    
                '>Indonesia on Chain offers a dynamic learning experience, providing comprehensive courses that demystify blockchain technology whether you're a beginner or an enthusiast.</p>
            </div>

            <div className='flex justify-center'>
                <div className='relative  mt-[4rem] xl:mt-[0rem]  w-full items-center'>
                    <img src={Clasroom} alt="classroom" className='z-50 cursor-pointer ' />
                    <img src={orangeBox} alt="orangeBox" className='hidden lg:block sm:top-[3.5rem] sm:left-[10rem] md:top-[9rem] md:left-[18rem] lg:left-[14rem] lg:top-[6rem] xl:top-[13rem] xl:left-[24.5rem] absolute -z-10' />
                    <img src={Ellipse} alt="ellipse" className='top-[13.75rem] -left-[2.40rem] absolute' />
                    <img src={PurpleBox} alt="PurpleBox" className='-top-4 -left-4 absolute -z-10' />
                </div>
            </div>

        </section>
    )
}

export default AboutSection3
