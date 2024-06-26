import React, { useState, useEffect } from 'react';
import MiddleDataCards from '../../../../Components/EducatorComponents/main/MiddleDataCards';
import EducatorWelcomeBox from '../../../../Components/EducatorComponents/main/EducatorWelcomeBox';
import TopDataCard from '../../../../Components/EducatorComponents/main/TopDataCard';
import { TbUsers } from "react-icons/tb";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi2";
import BarGraphAnalytics from '../../../../Components/EducatorComponents/main/BarGraphAnalytics';
import DonutChartAnalytics from '../../../../Components/EducatorComponents/main/DonutChartAnalytics';
import DashboardRecommededCourse from "../../../../Components/DashBoardComponents/components/DashboardRecommededCourse";
import { useAuth } from '../../../../Components/utils/useAuthClient';
import { Link } from 'react-router-dom';
import Loader from '../../../../Components/Loader/Loader';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const studentData = [
    { month: "January", shortName: "Jan", students: 50 },
    { month: "February", shortName: "Feb", students: 45 },
    { month: "March", shortName: "Mar", students: 55 },
    { month: "April", shortName: "Apr", students: 60 },
    { month: "May", shortName: "May", students: 65 },
    { month: "June", shortName: "Jun", students: 70 },
    { month: "July", shortName: "Jul", students: 75 },
    { month: "August", shortName: "Aug", students: 80 },
    { month: "September", shortName: "Sep", students: 85 },
    { month: "October", shortName: "Oct", students: 90 },
    { month: "November", shortName: "Nov", students: 95 },
    { month: "December", shortName: "Dec", students: 100 }
];

const courseData = [
    {
        title: "UX for business",
        value: 456
    },
    {
        title: "Social media for freelances",
        value: 123
    },
    {
        title: "Create you first ebook",
        value: 90
    }
];

const certificateIconColors = ['bg-[#FFD7D7]', 'bg-[#FFE8CD]', 'bg-[#DDD7FF]'];

const EducatorMain = () => {
    const { t } = useTranslation('EducatorMain');
    const [myCourses, setMyCourses] = useState([]);
    const [myFullCourses, setMyFullCourses] = useState([]);
    const [courseStats, setCourseStats] = useState([]);
    const [courses, setCourses] = useState([]);
    const { userInfo, userInfoError } = useSelector(state => state.users);
    const { actor, contentActor } = useAuth();
    const [Loading, setLoading] = useState(true);

    const [topCardData, setTopCardData] = useState({
        0: {
            title: t('TotalStudents'),
            value: 0,
            fixedValue: null,
            subValue: 0,
            icon: <TbUsers size={40} />
        }, 1: {
            title: t('AvgRatings'),
            value: 0,
            fixedValue: 5,
            subValue: 0,
            icon: <IoAnalyticsOutline size={40} />
        }
    });

    const [middleCardData, setMiddleCardData] = useState({
        0: {
            title: t('TotalCourses'),
            count: 0
        }, 1: {
            title: t('PendingCourses'),
            count: 0
        }, 2: {
            title: "Total Enrollments",
            count: 0
        }, 3: {
            title: t('PendingEnrollments'),
            count: 0
        }, 4: {
            title: t('CertificateIssues'),
            count: 0
        }
    });

    const fetchCourses = async () => {
        try {
            const allCourseIdsResponse = await contentActor.getallCourse(); 
            console.log("Fetch all course IDs response: ", allCourseIdsResponse);

            const allCourseIds = allCourseIdsResponse.leaf.keyvals
                .filter(item => item[0] && item[0][1])
                .map((keyval) => keyval[0][1]);

            console.log("Extracted course IDs: ", allCourseIds);

            if (Array.isArray(allCourseIds)) {
                const coursesData = await Promise.all(
                    allCourseIds.map(async (value) => {
                        try {
                            const courseStats = await contentActor.getCourseEnrollmentAndCertificateStats(value.courseId);
                            console.log(`Course ID: ${value.courseId}, Stats: `, courseStats);
                            return {
                                ...courseStats,
                                id: value.courseId
                            };
                        } catch (error) {
                            console.error(`Error fetching stats for course ID: `, error);
                            return null;
                        }
                    })
                );

                const filteredCoursesData = coursesData.filter(course => course !== null);

                console.log("Mapped courses data: ", filteredCoursesData);
                setCourseStats(filteredCoursesData); 

                // Update topCardData and middleCardData
                const totalStudents = filteredCoursesData.reduce((acc, curr) => acc + Number(curr.total_students), 0);
                const totalCertificates = filteredCoursesData.reduce((acc, curr) => acc + Number(curr.total_certificates), 0);
                const totalCourses = filteredCoursesData.length;

                setTopCardData(prevData => ({
                    ...prevData,
                    0: {
                        ...prevData[0],
                        value: totalStudents
                    }
                }));

                setMiddleCardData(prevData => ({
                    ...prevData,
                    0: {
                        ...prevData[0],
                        count: totalCourses
                    },
                    4: {
                        ...prevData[4],
                        count: totalCertificates
                    }
                }));

            } else {
                console.error("Expected an array of course IDs, but got: ", allCourseIds);
            }
        } catch (error) {
            console.error("Error occurred while fetching courses:", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [actor, contentActor]);

    const handleFlattenList = (data) => {
        return data.reduce((acc, val) => {
            return acc.concat(Array.isArray(val) ? handleFlattenList(val) : val.toText());
        }, []);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await contentActor.getallCourse();
                console.log(user);
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

                const myCourseFiltered = newData.filter(i => i.professorId === userInfo.user_id);
                console.log("user id as in state redux", userInfo.user_id);
                setMyCourses(myCourseFiltered);
                setMiddleCardData(prevData => ({
                    ...prevData,
                    0: {
                        ...prevData[0],
                        count: myCourseFiltered.length
                    }
                }));
                setTopCardData(prevData => ({
                    ...prevData,
                    1: {
                        ...prevData[1],
                        value: myCourseFiltered.reduce((acc, curr) => acc + parseInt(curr.rating.toString()), 0) / myCourseFiltered.length
                    }
                }));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchAllCourseDetails = async () => {
            if (myCourses.length > 0) {
                try {
                    const fullCourseDetails = await Promise.all(myCourses.map(async (singleCourse) => {
                        const data = await contentActor.getfullCourse(singleCourse.courseId);
                        return data;
                    }));

                    const filterResult = fullCourseDetails.filter(i => i !== null || i !== undefined);

                    setMyFullCourses(filterResult);
                    setMiddleCardData(prevData => ({
                        ...prevData,
                        2: {
                            ...prevData[2],
                            count: filterResult.reduce((acc, curr) => acc + parseInt(curr.enrollmentcount.toString()), 0)
                        }
                    }));

                    // calculating total students
                    const uniqueIds = new Set();

                    filterResult.forEach((item) => {
                        const mergeIds = handleFlattenList(item.enrollmentuserId);
                        mergeIds.forEach((id) => {
                            if (id !== null) {
                                uniqueIds.add(id);
                            }
                        });
                    });

                    setTopCardData(prevData => ({
                        ...prevData,
                        0: {
                            ...prevData[0],
                            value: uniqueIds.size
                        }
                    }));

                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchAllCourseDetails();
    }, [myCourses]);

    return (
        <div className="w-full px-6 lg:px-14 mt-5">
            {/* Welcome & Side data cards */}
            <div className="w-full flex-col md:flex-row flex gap-6">
                <div className="w-full md:w-8/12 rounded-xl dashboard_cap_gradient shadow">
                    <EducatorWelcomeBox setLoading={setLoading} data={
                        { newStudentCount: topCardData[0].value }
                    } />
                </div>
                <div className="w-full md:w-4/12 flex-col flex gap-4">
                    {
                        topCardData && Object.values(topCardData).length > 0 && Object.values(topCardData).map((item, index) => (
                            <TopDataCard key={index} data={item} />
                        ))
                    }
                </div>
            </div>

            {/* Middle Cards */}
            <div className='w-full flex items-center mt-8 gap-4 overflow-auto'>
                {
                    middleCardData && Object.values(middleCardData).length > 0 && Object.values(middleCardData).map((item, index) => {
                        return (
                            <MiddleDataCards key={index} data={item} />
                        )
                    })
                }
            </div>

            {/* Bar graph */}
            <div className="w-full p-4 bg-white mt-8 relative rounded-xl">
                <div className="w-full">
                    <h1 className='text-xl font-semibold'>{t('Analytics')}</h1>
                </div>
                <div className="w-full flex flex-wrap md:flex-nowrap mt-4 items-center">
                    <div className="w-full md:w-1/2 flex justify-start items-center gap-1">
                        <h2>{t('TotalStudents')}</h2>
                        <span className='text-lg font-semibold'>{topCardData[0].value}</span>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-end gap-3">
                        <button type='button' className='outline-none bg-[#EAEAEA] text-[#7B61FF] hover:text-[#EAEAEA]  hover:bg-[#7B61FF] p-2 md:px-3 rounded-md text-sm'>{t('Day')}</button>
                        <button type='button' className='outline-none bg-[#EAEAEA] text-[#7B61FF] hover:text-[#EAEAEA]  hover:bg-[#7B61FF] p-2 md:px-3 rounded-md text-sm'>{t('Month')}</button>
                        <button type='button' className='outline-none bg-[#EAEAEA] text-[#7B61FF] hover:text-[#EAEAEA]  hover:bg-[#7B61FF] p-2 md:px-3 rounded-md text-sm'>{t('Year')}</button>
                    </div>
                </div>
                <div className="w-full h-[300px] xl:h-[400px] overflow-x-auto overflow-y-hidden xl:overflow-hidden">
                    <BarGraphAnalytics data={studentData} />
                </div>

            </div>
            {/* Donut chart & upcoming Courses */}
            <div className="w-full mt-8 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-6/12 lg:w-7/12 xl:w-8/12 p-4 bg-white rounded-xl">
                    <div className="w-full">
                        <h1 className='text-xl font-semibold'>{t('TopCourses')}</h1>
                    </div>
                    <div className="w-full flex flex-col xl:flex-row items-center">
                        <div className="flex-1">
                            <DonutChartAnalytics data={courseData} />
                        </div>
                        <div className="flex-1 p-4">
                            <div className="w-full">
                                <h1 className='text-lg font-semibold text-end border-b'>{t('Enrollment')}</h1>
                                {
                                    courseData.map((item, index) => (
                                        <div key={index} className="w-full flex justify-between items-center p-2">
                                            <span className='flex items-center gap-1'><span className='w-2 h-2 bg-[#7B61FF] rounded-full'></span>{item.title}</span>
                                            <span>{item.value}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-5/12 xl:w-4/12 p-4 bg-white rounded-xl">
                    <h1 className='text-xl font-semibold'>{t('NextCourseReleases')}</h1>
                    <div className="w-full flex flex-col gap-3 mt-3">
                        {[1, 2].map((item, index) => <div key={index} className="w-full flex">
                            <div className="flex">
                                <div className='bg-[#7B61FF] p-2 rounded-md flex flex-col text-white justify-center items-center w-[80px] h-[80px]'>
                                    <span className='text-lg text-gray-300'>June</span>
                                    <span className='text-4xl font-bold'>21</span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-start px-3">
                                <h1 className='font-medium md:text-sm xl:text-base'>{"Getting pro with hashtsdvsvsags?".slice(0, 20)}</h1>
                                <p className='text-gray-600 text-sm'>{"Social media for freelances".slice(0, 20)}</p>
                                <p className='text-gray-600 text-sm'>08:00 PM</p>
                            </div>

                        </div>)}
                    </div>
                    <Link to={'/upcoming_courses'} className='flex p-2 text-[#925FE2]'>{t('SeeAll')}</Link>
                </div>
            </div>

            {/* My courses & certificates */}
            <div className="w-full mt-8 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-7/12 xl:w-8/12">
                    <div className="w-full flex justify-between items-center">
                        <h1 className='text-xl font-semibold'>{t('MyCourses')}</h1>
                        <Link to={'/'}>{t('SeeAll')}</Link>
                    </div>
                    <div className="w-full bg-white p-4 rounded-xl mt-4">
                        {Loading ? (
                            <Loader />
                        ) : (
                            <DashboardRecommededCourse recommendedCourses={myCourses} />
                        )}
                    </div>
                </div>
                <div className="w-full md:w-5/12 xl:w-4/12">
                    <div className="w-full flex justify-between items-center">
                        <h1 className='text-xl font-semibold'>{t('Certificates')}</h1>
                        <Link to={'/'}>{t('SeeAll')}</Link>
                    </div>
                    <div className="w-full mt-4">
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) =>
                                <div key={index} className="w-full mb-4 flex items-center justify-between bg-white p-3 rounded-md">
                                    <div className="w-10/12 flex items-center gap-2">
                                        <span className={`block p-2 ${certificateIconColors[index % 3]} rounded-md`}>
                                            <FaBook size={24} />
                                        </span>
                                        <div className="flex flex-col">
                                            <h1 className='font-semibold'>{t('BlockchainCourse')}</h1>
                                            <span className='text-sm'>Suraj Aswal</span>
                                        </div>
                                    </div>

                                    <div className="w-2/12 flex justify-end">
                                        <button>
                                            <HiOutlineChevronRight size={22} />
                                        </button>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducatorMain;
