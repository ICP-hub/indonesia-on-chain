import React from 'react'
import LatestNews from '../../../assets/images/LatestNews.png'
import news1 from '../../../assets/images/news1.png'
import news2 from '../../../assets/images/news2.png'
import news3 from '../../../assets/images/news3.png'
import { useTranslation } from 'react-i18next';
const AboutSection8 = () => {
    const { t } = useTranslation();
    return (
        <section className="about-section bg-white  w-full  "> 
        <div className='mx-auto '>
            <h2 className='text-4xl text-center mt-40 space-x-2'>
                <span className='text-[#2F327D] font-[700] font-nunitoSans'>{t('about.section8.latestNewsAndResources')}</span>



            </h2>

            <h2 className='text-center mt-4'>
                <span
                    className='text-2xl font-[400] font-poppins text-center text-[#696984]
            mt-[400px]'
                >{t('about.section8.latestNewsDescription')}</span>
            </h2>


            <div className='w-full mt-[4.25rem] xl:flex'>

                <div className='xl:w-1/2 w-full'>
                    <img src={LatestNews} alt="" className='xl:w-[80%] w-full' />

                    <button className='bg-[#F4C467] px-[1.5625rem] py-1 rounded-full mt-8 mb-8'>
                        <span className='font-[500] font-poppins text-sm'>{t('about.section8.news')}</span>
                    </button>

                    <h1 className='font-poppins font-[500] text-xl text-[#252641] leading-9 w-[80%]'>
                    {t('about.section8.newsArticle1')}
                    </h1>

                    <p className='font-poppins font-[400] text-[15px] leading-7 text-[#696984] mt-4 w-[80%]'
                    >{t('about.section8.newsArticle2')}</p>

                    <p className='font-poppins font-[400] text-[15px] leading-7 text-[#696984] mt-4 underline cursor-pointer'>
                    {t('about.section8.readMore')}
                    </p>
                </div>


                <div className='block xl:hidden w-full mt-4 mb-4'>
                    <img src={news1} alt="w-full" />

                    <button className='bg-[#F4C467] px-[1.5625rem] py-1 rounded-full mt-8 mb-8'>
                        <span className='font-[500] font-poppins text-sm'>{t('about.section8.news')}</span>
                    </button>

                    <h1 className='font-poppins font-[500] text-xl text-[#252641] leading-9 w-[80%]'>
                    {t('about.section8.newsArticle1')}
                    </h1>

                    <p className='font-poppins font-[400] text-[15px] leading-7 text-[#696984] mt-4 w-[80%]'
                    > {t('about.section8.newsArticle2')}</p>

                    <p className='font-poppins font-[400] text-[15px] leading-7 text-[#696984] mt-4 underline cursor-pointer'>
                    {t('about.section8.readMore')}
                    </p>
                </div>

                <div className='block xl:hidden w-full mt-4 mb-4'>
                    <img src={news1} alt="w-full" />

                    <button className='bg-[#F4C467] px-[1.5625rem] py-1 rounded-full mt-8 mb-8'>
                        <span className='font-[500] font-poppins text-sm'>{t('about.section8.news')}</span>
                    </button>

                    <h1 className='font-poppins font-[500] text-xl text-[#252641] leading-9 w-[80%]'>
                    {t('about.section8.newsArticle1')}
                    </h1>

                    <p className='font-poppins font-[400] text-[15px] leading-7 text-[#696984] mt-4 w-[80%]'
                    > {t('about.section8.newsArticle2')}</p>

                    <p className='font-poppins font-[400] text-[15px] leading-7 text-[#696984] mt-4 underline cursor-pointer'>
                    {t('about.section8.readMore')}
                    </p>
                </div>

                <div className='block xl:hidden w-full mt-4 mb-4'>
                    <img src={news1} alt="w-full" />

                    <button className='bg-[#F4C467] px-[1.5625rem] py-1 rounded-full mt-8 mb-8'>
                        <span className='font-[500] font-poppins text-sm'>{t('about.section8.news')}</span>
                    </button>

                    <h1 className='font-poppins font-[500] text-xl text-[#252641] leading-9 w-[80%]'>
                    {t('about.section8.newsArticle1')}
                    </h1>

                    <p className='font-poppins font-[400] text-[15px] leading-7 text-[#696984] mt-4 w-[80%]'
                    > {t('about.section8.newsArticle2')}</p>

                    <p className='font-poppins font-[400] text-[15px] leading-7 text-[#696984] mt-4 underline cursor-pointer'>
                    {t('about.section8.readMore')}
                    </p>
                </div>

                <div className='xl:w-1/2 w-full space-y-8 hidden xl:block'>

                    <div className='xl:flex xl:justify-between '>
                        <div className='relative'>
                            <img src={news1} alt="" className='' />
                            <button className='absolute bg-[#F4C467]  rounded-full px-[0.59rem] py-[0.2rem] right-4 bottom-[10%]'>
                                <span className='font-[400] font-poppins text-sm tracking-wide '>{t('about.section8.press')}</span>
                            </button>
                        </div>
                        <div className='pl-8 w-[60%]'>
                            <h1 className='font-poppins font-[500] text-base leading-8 text-[#252641] '>
                            {t('about.section8.newsArticle1')}
                            </h1>
                            <p className='font-poppins font-[400] text-xs leading-[1.75rem] tracking-wide text-[#696984] '>{t('about.section8.newsArticle2')}</p>
                        </div>

                    </div>

                    <div className='xl:flex xl:justify-between '>
                        <div className='relative'>
                            <img src={news2} alt="" className='' />
                            <button className='absolute bg-[#F4C467]  rounded-full px-[0.59rem] py-[0.2rem] right-4 bottom-[10%]'>
                                <span className='font-[400] font-poppins text-sm tracking-wide '>{t('about.section8.news')}</span>
                            </button>
                        </div>
                        <div className='pl-8 w-[60%]'>
                            <h1 className='font-poppins font-[500] text-base leading-8 text-[#252641] '>
                            {t('about.section8.newsArticle1')}
                            </h1>
                            <p className='font-poppins font-[400] text-xs leading-[1.75rem] tracking-wide text-[#696984] '>{t('about.section8.newsArticle2')}</p>
                        </div>

                    </div>

                    <div className='xl:flex xl:justify-between '>
                        <div className='relative'>
                            <img src={news3} alt="" className='' />
                            <button className='absolute bg-[#F4C467]  rounded-full px-[0.59rem] py-[0.2rem] right-4 bottom-[10%]'>
                                <span className='font-[400] font-poppins text-sm tracking-wide '>{t('about.section8.news')}</span>
                            </button>
                        </div>
                        <div className='pl-8 w-[60%]'>
                            <h1 className='font-poppins font-[500] text-base leading-8 text-[#252641] '>
                            {t('about.section8.newsArticle1')}
                            </h1>
                            <p className='font-poppins font-[400] text-xs leading-[1.75rem] tracking-wide text-[#696984] '>{t('about.section8.newsArticle2')}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        
    </section>
    )
}

export default AboutSection8
