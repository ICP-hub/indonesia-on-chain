import React, { useEffect } from 'react'
import { useAuth } from '../utils/useAuthClient'
import { useTranslation } from 'react-i18next';
const AboutSection6 = () => {
    const { t } = useTranslation();
    const { contentActor } = useAuth()
    const [allCourse, setAllCourse] = React.useState([]);

    useEffect(() => {
        const fetchAllCourse = async () => {
            try {
                const user = await contentActor.getallCourse();
                let number = parseInt(user.leaf.size);
                const newData = [];
                for (let i = 0; i < number; i++) {

                    let time = 0;
                    let newCourse = user.leaf.keyvals;
                    while (time < i) {
                        newCourse = newCourse[0][1];
                        time++;
                    }
                    newCourse = newCourse[0][0][1];
                    newData.push(newCourse);
                }
                console.log(newData);
                // testing---if no course exist
                // newData.forEach(async (item) => {
                //     await contentActor.deleteCourse(item.courseId)
                // })
                
                setAllCourse(newData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCourse();
    }, []);
    return (
        <>
            {
                allCourse.length > 0 ?

                    <>
                        <section className="about-section bg-white  w-full  mx-auto"> 
<div className="mx-auto">
                        <h2 className='text-4xl text-center mt-40 space-x-2'>
                            <span className='font-poppins text-[#2F327D] font-[700]'>{t('about.section6.ourBest')} </span>
                            <span className='font-nunitoSans text-[#7B61FF] font-[700]'>{t('about.section6.Blockchain')}</span>
                            <span className='font-poppins text-[#2F327D] font-[700]'>{t('about.section6.Courses')} </span>


                        </h2>

                        <h2 className='text-center mt-4'>
                            <span
                                className='text-2xl font-[400] font-poppins text-center text-[#696984]
                    mt-[400px]'
                            >{t('about.section6.bestCoursesDescription')}</span>
                        </h2>


                        <div className='flex flex-col items-center items:center justify-center lg:flex-row mx-auto xl:flex-row xl:justify-center'>
                            <div className='w-full xl:w-[90%] grid grid-cols-3 items-center justify-center lg:grid-cols-12 md:grid-cols-6 mx-auto pt-[5.25rem] '>
                                {
                                    allCourse.splice(0, 4).map((item, index) => {

                                        return (

                                            <div className='col-span-3 relative  ' key={index}>
                                            <div className='col-span-3 relative p-8' >
                                                <img src={item.courseImg} alt="" />

                                                
                                            </div>
                                            <div className='relative bg-black p-6 flex justify-center space-x-4  py-4
                                         rounded-md w-[75%] items-center left-[12.5%]  font-quickSand
                                    '>
                                                    <span className='font-[400] text-xs text-white text-center'>{item && item.courseTitle.substring(0, 20)}</span>
                                                    {/* <span className='font-[300] text-[10px]'>{ }</span> */}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        </div>
    </section>
                    </> : <></>
            }
        </>
    )
}

export default AboutSection6;
