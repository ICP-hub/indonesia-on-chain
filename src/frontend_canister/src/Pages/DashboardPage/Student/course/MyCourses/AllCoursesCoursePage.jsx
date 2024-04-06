import React, { useState, useEffect } from 'react';
import Image1 from '../../../../../../assets/images/surr-8092.png'
import DashboardRecommededCourse from '../../../../../Components/DashBoardComponents/components/DashboardRecommededCourse';
import Loader from '../../../../../Components/Loader/Loader';
import { useAuth } from '../../../../../Components/utils/useAuthClient';
import InProgressCardDetails from '../../../../../Components/MyCourseComponents/InProgressCardDetails';
const AllCoursesCoursePage = () => {
    const [fetchcourses, setFetchCourses] = useState([]);
    const [Loading, setLoading] = useState(false);
    const { contentActor } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
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
            }
        };

        setLoading(true);
        fetchData();
        setLoading(false);
    }, []);

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
                    <h2 className="text-2xl font-semibold">All Courses</h2>
                    <h5 className="text-[#925FE2]">see all</h5>
                </div>
                <div className="w-full my-4">
                    {Loading ? (
                        <Loader />
                    ) : (
                        <div>
                            {fetchcourses.map((course, index) => (

                                <div
                                    onClick={() => {
                                        // /course/:id
                                        if (tabType === "Process") {
                                            navigate(
                                                process.env.DFX_NETWORK === "ic"
                                                    ? `/student-dashboard/my-courses/course-content${course.courseId}`
                                                    : `/student-dashboard/my-courses/course-content${course.courseId}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`
                                            );
                                        }
                                    }}
                                    key={index}
                                    className="cursor-pointer transition-transform duration-300 hover:scale-105"
                                >
                                    <InProgressCardDetails
                                        cardData={{
                                            id: course.courseId,
                                            title: course.courseTitle,
                                            name: course.professorName,
                                            // completed: 60,
                                            image: course.courseImg,
                                            ...colorMappings[index],
                                        }}
                                        key={index}
                                        tabType={"All"}
                                    />
                                </div>
                            ))}

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default AllCoursesCoursePage;
