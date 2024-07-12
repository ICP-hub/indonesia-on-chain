import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/useAuthClient';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const AboutSection6 = () => {
    const { t } = useTranslation();
    const { contentActor, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [allCourse, setAllCourse] = useState([]);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
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

                const enrolledCourses = [];
                for (const course of newData) {
                    const isEnrolled = await contentActor.isuserenrolled(course.courseId);
                    if (isEnrolled) {
                        enrolledCourses.push(course);
                    }
                }

                setAllCourse(enrolledCourses);
            } catch (error) {
                console.log(error);
            }
        };

        if (isAuthenticated) {
            fetchEnrolledCourses();
        }
    }, [contentActor, isAuthenticated]);

    const handleCourseClick = (courseId) => {
        navigate(`/student-dashboard/my-courses/course-content/${courseId}`);
    };

    if (!isAuthenticated) {
        return null; // Or you could return a message or a redirect
    }

    return (
        <>
            {allCourse.length > 0 && (
                <section id="courses" className="w-full mx-auto bg-white about-section">
                    <div className="mx-auto">
                        <h2 className='mt-40 space-x-2 text-4xl text-center'>
                            <span className='font-poppins text-[#2F327D] font-[700]'>{t('about.section6.ourBest')} </span>
                            <span className='font-nunitoSans text-[#7B61FF] font-[700]'>{t('about.section6.Blockchain')}</span>
                            <span className='font-poppins text-[#2F327D] font-[700]'>{t('about.section6.Courses')} </span>
                        </h2>
                        <h2 className='mt-4 text-center'>
                            <span className='text-2xl font-[400] font-poppins text-center text-[#696984]'>
                                {t('about.section6.bestCoursesDescription')}
                            </span>
                        </h2>
                        <div className='flex flex-col items-center justify-center mx-auto lg:flex-row xl:flex-row xl:justify-center'>
                            <div className='w-full xl:w-[90%] grid grid-cols-3 items-center justify-center lg:grid-cols-12 md:grid-cols-6 mx-auto pt-[5.25rem]'>
                                {allCourse.slice(0, 4).map((item, index) => (
                                    <div className='relative col-span-3' key={index} onClick={() => handleCourseClick(item.courseId)}>
                                        <div className='relative col-span-3 px-6 py-2'>
                                            <img src={item.courseImg} alt={item.courseTitle} className='rounded cursor-pointer' />
                                        </div>
                                        <div className='relative p-6 flex justify-center space-x-4 py-4 rounded-md w-[75%] items-center left-[12.5%] font-quickSand'>
                                            <span className='font-[400] text-black text-sm font-semibold'>
                                                {item.courseTitle.substring(0, 20)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default AboutSection6;
