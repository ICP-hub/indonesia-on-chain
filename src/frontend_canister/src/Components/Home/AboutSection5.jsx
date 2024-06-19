import React from 'react'
import City from '../../../assets/images/City.png'
import { useTranslation } from 'react-i18next';
const AboutSection5 = () => {
     const { t } = useTranslation();
    return (
        <>
             <section className="about-section bg-white  w-full  mx-auto"> 
                <div className="mx-auto">
                   
            <div className='mx-auto flex flex-col lg:flex-row lg:justify-center xl:flex-row xl:justify-center items-center mt-[3.75rem]'>
                {/* //left side */}
                <div className='  relative justify-between items-center
                '>
                    <img src={City} alt="" />

                </div>
                {/* //right side */}
                <div className='md:w-1/2 w-full text-center md:text-left justify-around 
                grid grid-cols-1  content-center space-y-4 items-center
                '>

                    <h2 className='lg:flex lg:justify-start justify-center text-3xl md:w-[5%] lg:w-full w-full text-center items-center space-x-2 '>
                        <span className=' text-[#2F327D] font-[600]'>
                        {t('about.section5.assessments')}
                            <br />
                        </span>
                        <span className=' text-[#7B61FF] font-[600]'>
                        {t('about.section5.Quizzes')}
                            <span className=' text-[#2F327D] font-[600]'>,</span>
                        </span>
                        <span className=' text-[#2F327D] font-[600]'>
                        {t('about.section5.Tests')}
                        </span>
                    </h2>

                    <p className='text-[#696984] font-[400] text-xl font-poppins w-full lg:w-full md:w-[80%] leading-8'>
                    {t('about.section5.streamlineLearning')}
                    </p>
                </div>
            </div>
                
            <div className='flex justify-center'>
                <button className='border border-purple-600 mt-[1rem] py-[0.69rem] px-[1.70rem] rounded-full'>
                    <span className=' text-[#7B61FF]'>{t('about.section5.seeMoreFeatures')}</span>
                </button>
            </div>
         </div>   
    </section>
        </>
    )
}

export default AboutSection5
