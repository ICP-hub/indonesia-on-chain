import React from 'react';
import ScreenPage from '../../../assets/images/ScreenPage.png'
import GreenCircle from '../../../assets/images/GreenCircle.png'
import CyanCircle from '../../../assets/images/CyanCircle.png'
import PurpleCircle from  '../../../assets/images/PurpleCircle.png'
import RedCircle from '../../../assets/images/RedCircle.png'
import { useTranslation } from 'react-i18next';
const AboutSection7 = () => {
    const { t } = useTranslation();
    return (
        <>
            <section className="about-section bg-white  w-full mx-auto "> 
            <div className="mx-auto">
           
            <div className='mx-auto flex flex-col lg:flex-row lg:justify-center xl:flex-row xl:justify-center items-center mt-[10rem] mb-5'>
                <div className=' relative  md:block'>   
                {/* //**w-2/3**/}
                    <img src={ScreenPage} alt="" className='z-0 relative' />

                    <div>
                        <img src={GreenCircle} alt="green" className='absolute -top-[11%] left-[3rem] -z-10' />
                        <img src={CyanCircle} alt=""  className='absolute -top-[8%] left-[11rem] '/>
                        <img src={RedCircle} alt="red" className='absolute md:left-[10rem] sm:left-[10rem] lg:left-[25rem] bottom-[8%]'  />
                        <img src={PurpleCircle} alt="purpul"  className='absolute sm:top-[-103px] md:top-[ -89px] md:left-[130px]
    sm:left-[130px]  lg:left-[15rem] lg:bottom-[55%] -z-10 '/>
                    </div>
                </div>
                <div className=' md:text-left z-10  text-center pt-8 xl:w-[37%]  w-full text-left justify-center 
                  content-center'>
                {/* md:w-1/3 */}
                    <h2 className='text-3xl mb-8'>
                        <span className=' text-[#2F327D] font-[600] font-nunitoSans'>
                           {t('about.section7.ourBestPerformers')}
                        </span>

                    </h2>

                    <p className='text-[#696984] font-[400] text-xl font-poppins  leading-8 '>
                    {t('about.section7.starStudentsDescription')}
                    </p>
                </div>
            </div>
            </div>
          
            </section>
        </>
    );
}

export default AboutSection7; 