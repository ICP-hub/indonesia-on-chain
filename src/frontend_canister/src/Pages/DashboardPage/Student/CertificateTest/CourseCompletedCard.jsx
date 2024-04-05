import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../Components/utils/useAuthClient';
import Loader from '../../../../Components/Loader/Loader';
import InProgressCardDetails from '../../../../Components/MyCourseComponents/InProgressCardDetails';
import NotAvailable from '../../../../Components/notAvailable/NotAvailable';
const CourseCompletedCard = () => {
    const [fetchcourses, setFetchCourses] = useState([]);
    const { contentActor, actor } = useAuth();
    const [Loading, setLoading] = useState(false);
    const [FetchCoursesData, setFetchCoursesData] = useState(false);


    useEffect(() => {
        const fetchCompletedCourseDetails = async () => {
            console.log("inside useEffect ------")
            try {
                const ongoingcourseId = await actor.get_user_completedcourse();
                console.log("completed courses->", ongoingcourseId);
                const newData = [];
                let currid = ongoingcourseId;
                let flag = true;

                while (flag) {

                    if (currid[0][0] === undefined) {
                        flag = false;
                        break;
                    }
                    let courseid = currid[0][0];
                    newData.push(courseid);
                    if (currid[0][1].length > 0 && currid[0][1] !== undefined) {
                        currid = currid[0][1];
                    } else {
                        flag = false;
                    }
                }
                console.log(newData);
                const coursedata = [];
                for (let courseId of newData) {
                    const course = await contentActor.getCourse(courseId);
                    coursedata.push(course);
                }

                console.log(coursedata);
                setFetchCourses(coursedata);

            } catch (err) {
                console.log(err);
            }
        };

        setLoading(true);
        fetchCompletedCourseDetails();
        setLoading(false);
        if (fetchcourses.length > 0) {
            console.log("eargehy")
            setFetchCoursesData(true);
        }
        console.log("fetched complete courses", fetchcourses.length);

    }, [])


    let cardBackgroundColor = 'green'
    let progressBarBaseColor = 'green'
    let progressBarColor = 'green'
    return (
        <div>
            {Loading ? (
                <Loader />
            ) : FetchCoursesData ? (
                <div className="grid grid-cols-1 items-center justify-center w-full gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {fetchcourses.map((course, index) => (

                        <div
                            className="cursor-pointer transition-transform duration-300 hover:scale-105"
                            key={index}
                        >
                            <InProgressCardDetails
                                cardData={{
                                    id: course.courseId,
                                    title: course.courseTitle,
                                    name: course.professorName,
                                    completed: 100,
                                    image: course.courseImg,
                                    cardBackgroundColor: cardBackgroundColor,
                                    progressBarBaseColor: progressBarBaseColor,
                                    progressBarColor: progressBarColor

                                }}
                                key={index}
                                tabType="Completed"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <NotAvailable Type={"Complete"} />
                </div>
            )}
        </div>
    )
}

export default CourseCompletedCard
