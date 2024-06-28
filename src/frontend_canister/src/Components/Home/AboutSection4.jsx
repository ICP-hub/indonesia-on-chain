import React from 'react'
import CollegeGirl from '../../../assets/images/CollegeGirl.png'
import { useTranslation } from 'react-i18next';
const AboutSection4 = () => {
    const { t } = useTranslation();
    return (
        <>
           <section id='features' className="about-section bg-white  w-full mx-auto "> 
            <div className="mx-auto">
            <h2 className='text-4xl text-center mt-40 '>
                <span className='font-poppins text-[#2F327D] font-[700]'> {t('about.section4.our')} </span>
                <span className='font-nunitoSans text-[#7B61FF] font-[700]'>{t('about.section4.Features')} </span>


            </h2>

            <h2 className='text-center mt-4'>
                <span
                    className='text-2xl font-[400] font-poppins  text-[#696984]
                    mt-[400px]'
                >{t('about.section4.featuresDescription')}</span>
            </h2>

            <div className='mx-auto flex flex-col lg:flex-row lg:justify-center xl:flex-row xl:justify-center items-center mt-[3.75rem]'>

                <div className='xl:w-1/2  w-full text-center lg:text-left  justify-center 
                  content-center space-y-4  xl:grid xl:grid-cols-1
                '>

                    <h2 className='text-3xl w-full lg:w-[70%] space-x-2 '>
                        <span className='text-[#7B61FF] font-[600]'>
                        {t('about.section4.tools')}
                        </span>
                        <span className='text-[#2F327D] font-[600]'>
                        {t('about.section4.toolsForEducatorsAndLearners')}
                        </span>
                    </h2>

                    <p className='text-[#696984] font-[400] text-xl font-poppins w-full lg:w-[80%] leading-8'>
                    {t('about.section4.toolsDescription')}
                    </p>
                </div>

                <div className='relative justify-center items-center'>
                    <img src={CollegeGirl} alt="classroom" className='z-50 cursor-pointer' />

                </div>
                {/* <div className=' w-full mt-4 items-center flex flex-col justify-center
                  content-center space-y-4 xl:hidden  
                '>

                    <h2 className='text-3xl w-[50%] space-x-2 text-center  '>
                        <span className='text-[#7B61FF] font-[600]'>
                            Tools
                        </span>
                        <span className='text-[#2F327D] font-[600] '>
                            For Educators

                            And Learners
                        </span>
                    </h2>

                    <p className='text-[#696984] font-[400] text-xl font-poppins w-[100%] leading-8 text-center'>
                        Indonesia on Chain offers a dynamic learning experience, providing comprehensive courses that demystify blockchain technology whether you're a beginner or an enthusiast.
                    </p>
                </div> */}
            </div>
            </div>
    </section>
        </>
    )
}

export default AboutSection4
