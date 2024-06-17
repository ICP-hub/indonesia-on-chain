import React from 'react'
import Clasroom from '../../../assets/images/Classroom.png'
import orangeBox from '../../../assets/images/orangeBox.png'
import PurpleBox from '../../../assets/images/PurpleBox.png'
import Ellipse from '../../../assets/images/Ellipse.png'
import EllipsePurple from '../../../assets/images/EllipsePurple.png'
import { useTranslation } from 'react-i18next';
const AboutSection3 = () => {
    const { t } = useTranslation();
    return (
        <section className="about-section bg-white  w-full "> 
      
        <div className=' mt-40 mx-auto mx-auto flex flex-col lg:flex-row lg:justify-between xl:flex-row xl:justify-center items-center'>

            <div className=' lg:w-[500px] w-full xl:w-1/2 relative items-center xl:items-start lg:text-left text-center'>
                <img src={EllipsePurple} alt="" className='z-0 hidden lg:block absolute -left-5 top-[1.75rem]' />
                <div className='pt-12 items-center lg:relative '>
                    <span className=' text-3xl text-[#2F327D] font-[600] font-poppins '> {t('about.section3.virtualLearning')}</span>
                    <span className=' text-3xl text-[#7B61FF] font-[600] font-poppins'> {t('about.section3.dohere')}</span>
                </div>

                <p className='text-[#696984] font-[400] text-xl pt-4 font-poppins leading-8 w-full xl:w-[80%]
                    
                '> {t('about.section3.virtualLearningDescription')}</p>
            </div>
{/*             
    top: 1.75rem;


    left: -1.25rem; */}
            <div className='flex justify-center'>
                <div className='relative  mt-[4rem] xl:mt-[0rem]  w-full items-center'>
                    <img src={Clasroom} alt="classroom" className='z-10 cursor-pointer relative ' />
                    <img src={orangeBox} alt="orangeBox" className='hidden lg:block sm:top-[3.5rem] sm:left-[10rem] md:top-[9rem] md:left-[18rem] lg:left-[14rem] lg:top-[6rem] xl:top-[13rem] xl:left-[24.5rem] absolute ' />
                    <img src={Ellipse} alt="ellipse" className='top-[1.75rem] -left-[24.4rem] absolute' />
                    <img src={PurpleBox} alt="PurpleBox" className='-top-[23px] -left-[19px] lg:-top-5 lg:-left-5 absolute ' />
                  
                </div>
            </div>

        </div>
       
    </section>
    )
}

export default AboutSection3
