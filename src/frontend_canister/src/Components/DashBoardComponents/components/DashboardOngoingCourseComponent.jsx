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
        for(let i=0;i<ongoingcourseId.length;i++){
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
    <div className="flex flex-col justify-center w-full gap-8">
      {
        (fetchcourses.length > 0) ?(
      fetchcourses.map((course, index) => (
        <div
          onClick={() => {
            // /course/:id
            navigate(
              process.env.DFX_NETWORK === "ic"
                ? `/student-dashboard/my-courses/course-content/${course.courseId}`
                : `/student-dashboard/my-courses/course-content/${course.courseId}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`
            );
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
              ...colorMappings[index],
            }}
            key={index}
            tabType={"Process"}
          />
        </div>
      ))
    ):(
      <h4 className="my-4 font-semibold text-gray-500">Data not found</h4>
    )}
    </div>
  );
};

export default DashboardOngoingCourseComponent;