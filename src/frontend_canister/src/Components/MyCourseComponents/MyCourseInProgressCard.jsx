import React, { useState, useEffect } from "react";
import mindImg from "../../../assets/images/surr8091.png";
import InProgressCardDetails from "./InProgressCardDetails";
import { useAuth } from "../utils/useAuthClient";
import { useNavigate } from 'react-router-dom';


const MyCourseInProgressCard = ({ tabType }) => {
  const navigate = useNavigate();
  const [fetchcourses, setFetchCourses] = useState([]);
  const { contentActor, actor } = useAuth();

  console.log("tabtype", tabType);

  useEffect(() => {

    console.log("tabtype", tabType);

    const fetchCompletedCourseDetails = async () => {
      try {
        const ongoingcourseId = await actor.get_user_completedcourse();

        const newData = [];
        let currid = ongoingcourseId;
        let flag = true;

        while (flag) {
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

    const fetchOngoingCourseDetails = async () => {
      try {
        const ongoingcourseId = await actor.get_user_ongoingcourse();

        const newData = [];
        let currid = ongoingcourseId;
        let flag = true;

        while (flag) {
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

    if (tabType === "Process") {
      fetchOngoingCourseDetails();
    } else if (tabType === "Completed") {
      fetchCompletedCourseDetails();
    } else {
      fetchData();
    }

  }, [tabType]);


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
    <div className="grid grid-cols-1 items-center justify-center w-full gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {fetchcourses.map((course, index) => (

        <div
          onClick={() => {
            // /course/:id
            if (tabType === "Process") {
              navigate(
                process.env.DFX_NETWORK === "ic"
                  ? `/student-dashboard/course/course-content/${course.courseId}`
                  : `/student-dashboard/course/course-content/${course.courseId}?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`
              );
            } else {
              navigate(
                process.env.DFX_NETWORK === "ic"
                  ? `/student-dashboard/course/${course.courseId}`
                  : `/student-dashboard/course/${course.courseId}?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`
              );
            }

          }}
          className="cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <InProgressCardDetails
            cardData={{
              title: course.courseTitle,
              name: course.professorName,
              completed: 60, // You may need to adjust this value
              image: course.courseImg,
              ...colorMappings[index], // Apply color mapping
            }}
            key={index}
            tabType={tabType}
          />
        </div>
      ))}
    </div>
  );
};

export default MyCourseInProgressCard;
