import React, { useState, useEffect } from "react";
import InProgressCardDetails from "./InProgressCardDetails";
import { useAuth } from "../utils/useAuthClient";
import { useNavigate } from 'react-router-dom';
import NotAvailable from "../notAvailable/NotAvailable";
import Loader from "../Loader/Loader";

const MyCourseInProgressCard = ({ tabType }) => {
  const navigate = useNavigate();
  const [fetchcourses, setFetchCourses] = useState([]);
  const { contentActor, actor } = useAuth();
  const [loading, setLoading] = useState(false);

  console.log("tabType:", tabType);

  useEffect(() => {
    const fetchOngoingCourseDetails = async () => {
      try {
        setLoading(true);
        setFetchCourses([]);
        const ongoingcourseId = await actor.get_user_ongoingcourse();
        console.log("Ongoing course IDs: ", ongoingcourseId);

        const coursedata = await Promise.all(
          ongoingcourseId.map(courseId => contentActor.getCourse(courseId))
        );

        console.log("Ongoing courses data: ", coursedata);
        setFetchCourses(coursedata);
      } catch (err) {
        console.error("Error fetching ongoing courses: ", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        setFetchCourses([]);
        const user = await contentActor.getallCourse();
        console.log("All courses data: ", user);

        const courses = user.leaf.keyvals.map(kv => kv[0].slice(1));
        const number = parseInt(user.leaf.size);

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
        console.error('Error fetching all courses: ', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    const fetchCompletedCourseDetails = async () => {
      setFetchCourses([]);
      try {
        const ongoingcourseId = await actor.get_user_completedcourse();
        const newData = [];
        let flag = true;

        for (let i = 0; i < ongoingcourseId.length; i++) {
          newData.push(ongoingcourseId[i]);
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

    // const fetchCompletedCourseDetails = async () => {
    //   try {
    //     setLoading(true);
    //     setFetchCourses([]);
    //     const completecourseId = await actor.get_user_completedcourse();
    //     console.log("Completed course IDs: ", completecourseId);

    //     const coursedata = await Promise.all(
    //       completecourseId.map(courseId => contentActor.getCourse(courseId))
    //     );

    //     console.log("Completed courses data: ", coursedata);
    //     setFetchCourses(coursedata);
    //   } catch (err) {
    //     console.error("Error fetching completed courses: ", err);
    //   } finally {
    //     setTimeout(() => {
    //       setLoading(false);
    //     }, 2000);
    //   }
    // };

    if (tabType === "Process") {
      fetchOngoingCourseDetails();
    } else if (tabType === "Complete") {
      fetchCompletedCourseDetails();
    } else {
      fetchData();
    }
  }, [tabType, actor, contentActor]);

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
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid items-center justify-center w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {fetchcourses.length > 0 ? (
            fetchcourses.map((course, index) => (
              <div
                key={course.courseId}
                onClick={() => {
                  if (tabType === "Process") {
                    navigate(
                      process.env.DFX_NETWORK === "ic"
                        ? `/student-dashboard/my-courses/course-content/${course.courseId}`
                        : `/student-dashboard/my-courses/course-content/${course.courseId}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`
                    );
                  }
                }}
                className="transition-transform duration-300 cursor-pointer hover:scale-105"
              >
                <InProgressCardDetails
                  cardData={{
                    id: course.courseId,
                    title: course.courseTitle,
                    name: course.professorName,
                    completed: 60, 
                    image: course.courseImg,
                    ...colorMappings[index % colorMappings.length],
                  }}
                  tabType={tabType}
                  setLoading={setLoading}
                />
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="text-center">
                <NotAvailable Type={tabType} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyCourseInProgressCard;
