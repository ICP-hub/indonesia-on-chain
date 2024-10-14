import React, { useState, useEffect } from 'react';
import Loader from '../../../../../Components/Loader/Loader';
import { useAuth } from '../../../../../Components/utils/useAuthClient';
import InProgressCardDetails from '../../../../../Components/MyCourseComponents/InProgressCardDetails';
import NotAvailable from '../../../../../Components/notAvailable/NotAvailable';
import { useTranslation } from 'react-i18next';

const AllCoursesCoursePage = () => {
    const { t } = useTranslation();
    const [fetchcourses, setFetchCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const { contentActor } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const user = await contentActor.getallCourse();
                const courses = user.leaf.keyvals[0][0].slice(1);
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

                setFetchCourses(newData);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error, possibly show a message to the user
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [contentActor]);

    const colorMappings = [
        {
            cardBackgroundColor: "#D4DDFF",
            progressBarBaseColor: "#D4DDFF",
            progressBarColor: "#95A1F6",
        },
        {
            cardBackgroundColor: "#FFE4D0",
            progressBarBaseColor: "#FFE4D0",
            progressBarColor: "#F9BB8F",
        },
        {
            cardBackgroundColor: "#D1F7FF",
            progressBarBaseColor: "#D1F7FF",
            progressBarColor: "#96DAE9",
        },
        {
            cardBackgroundColor: "#D4DDFF",
            progressBarBaseColor: "#D4DDFF",
            progressBarColor: "#95A1F6",
        },
        {
            cardBackgroundColor: "#FFE4D0",
            progressBarBaseColor: "#FFE4D0",
            progressBarColor: "#F9BB8F",
        },
    ];

    return (
        <div className="container px-4 py-5 mx-auto font-poppins rounded-xl">
            <div className="px-8 py-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">{t('MyCourses.AllCourses')}</h2>
                    {/* <h5 className="text-[#925FE2]">{t('MyCourses.seeall')}</h5> */}
                </div>
                <div className="w-full my-4">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div>
                            {fetchcourses.length > 0 ? (
                                fetchcourses.map((course, index) => {
                                    const colors = colorMappings[index % colorMappings.length];
                                    console.log(`Course ${index} colors:`, colors);

                                    return (
                                        <div
                                            key={index}
                                            className="transition-transform duration-300 cursor-pointer hover:scale-105"
                                        >
                                            <InProgressCardDetails
                                                cardData={{
                                                    id: course.courseId,
                                                    title: course.courseTitle,
                                                    name: course.professorName,
                                                    image: course.courseImg,
                                                    ...colors,
                                                }}
                                                tabType={"All"}
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                    <div className="text-center">
                                        <NotAvailable Type={"Notfound"} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllCoursesCoursePage;
