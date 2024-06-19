import React, { useState, useEffect } from 'react';
import DashboardRecommededCourse from '../../../../Components/DashBoardComponents/components/DashboardRecommededCourse';
import Loader from '../../../../Components/Loader/Loader';
import { useAuth } from '../../../../Components/utils/useAuthClient';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const AllCourses = () => {
    const { t } = useTranslation();
    const [myCourses, setMyCourses] = useState([]);
    const [Loading, setLoading] = useState(false);
    const { actor, contentActor } = useAuth();
    const navigate = useNavigate();
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
                const myCourseFiltered = newData.filter(i => i.professorId === userInfo.user_id)
                console.log("user id as in state redux",userInfo.user_id);
                setMyCourses(myCourseFiltered);
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
                    <h2 className="text-2xl font-semibold">{t('EducatorCertificates.MyCourses')}</h2>
                    <h5 className="text-[#925FE2]">{t('EducatorCertificates.see all')}</h5>
                </div>
                <div className="w-full my-4">
                    {Loading ? (
                        <Loader />
                    ) : (
                        <div>
                            {myCourses.length > 0 ? (
                                <DashboardRecommededCourse recommendedCourses={myCourses} />

                            ) : (
                                <div className='m-4 text-center text-gray-800 font-bold'>
                                    <p>{t('EducatorCertificates.startuploading')}
                                    </p>
                                </div>
                            )}
                            <button
                                className='bg-[#7B61FF] font-poppins rounded-lg text-white py-[13px] px-[26.5px]'
                                onClick={() => {
                                    navigate(
                                        process.env.DFX_NETWORK === "ic"
                                            ? '/educator-dashboard/my-courses/upload-course'
                                            : `/educator-dashboard/my-courses/upload-course?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`);
                                }}
                            >{t('EducatorCertificates.AddCourse')}</button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default AllCourses;
