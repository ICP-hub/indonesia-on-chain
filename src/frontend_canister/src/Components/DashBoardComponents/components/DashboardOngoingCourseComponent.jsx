import React, { useEffect, useState } from "react";
import DashboardOngoingCardComponents from "./DashboardOngoingCardComponents";
import mindImg from "../../../../assets/images/surr8091.png";
import Image from './../../Auth/Image';
import { useAuth } from "../../utils/useAuthClient";
import InProgressCardDetails from "../../MyCourseComponents/InProgressCardDetails";
import { useNavigate } from 'react-router-dom'



const DashboardOngoingCourseComponent = () => {

  const [fetchcourses, setFetchCourses] = useState([]);
  const { contentActor, actor } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOngoingCourseDetails = async () => {
      try {
        const ongoingcourseId = await actor.get_user_ongoingcourse();
        console.log(ongoingcourseId);
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
    fetchOngoingCourseDetails();

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
    <div className="flex flex-col items-center justify-center w-full gap-8">
      {fetchcourses.map((course, index) => (

        <div
          onClick={() => {
            // /course/:id
            navigate(
              process.env.DFX_NETWORK === "ic"
                ? `/student-dashboard/course/course-content/${course.courseId}`
                : `/student-dashboard/course/course-content/${course.courseId}?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`
            );
          }}
          className="cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <InProgressCardDetails
            cardData={{
              id: course.courseId,
              title: course.courseTitle,
              name: course.professorName,
              completed: 60,
              image: course.courseImg,
              ...colorMappings[index],
            }}
            key={index}
            tabType={"Process"}
          />
        </div>
      ))}
    </div>
  );
};

export default DashboardOngoingCourseComponent;