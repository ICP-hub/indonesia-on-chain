import React, { useState, useEffect } from 'react';
import Image1 from '../../../../../../assets/images/surr-8092.png'
import DashboardRecommededCourse from '../../../../../Components/DashBoardComponents/components/DashboardRecommededCourse';
import Loader from '../../../../../Components/Loader/Loader';
import { useAuth } from '../../../../../Components/utils/useAuthClient';
const AllCourses = () => {
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [Loading, setLoading] = useState(false);
    const { contentActor } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
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
                setRecommendedCourses(newData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();

    }, []);
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
                        <DashboardRecommededCourse recommendedCourses={recommendedCourses} />
                    )}

                </div>
            </div>
        </div>
    );
}

export default AllCourses;
