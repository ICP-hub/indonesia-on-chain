import React, { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { useAuth } from "../../utils/useAuthClient";
import Loader from "../../Loader/Loader";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const RecommededCourseCard = ({ SingleCourseData }) => {
  const { contentActor, actor } = useAuth();
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    if (SingleCourseData) {
      fetchButtonStatus(SingleCourseData.courseId);
    }
  }, [SingleCourseData]);

  const fetchButtonStatus = async (courseId) => {
    try {
      setLoading(true);
      const status = await contentActor.isuserenrolled(courseId);
      setEnrolled(status);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId) => {
    try {
      setLoading(true);
      const result = await contentActor.enrollbystudent(courseId);
      const result1 = await actor.updateOngoingCourse(courseId);
      setLoading(false);
      navigate(
        process.env.DFX_NETWORK === "ic"
          ? `/student-dashboard/course/${courseId}`
          : `/student-dashboard/course/${courseId}?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`
      );
    } catch (error) {
      const message = error.message;
      const startIndex = message.indexOf("trapped explicitly:");
      const errorMessageSubstring = message.substring(startIndex);
      const endIndex = errorMessageSubstring.indexOf(":");
      const finalErrorMessage = errorMessageSubstring.substring(endIndex + 1).trim();
      toast.error(finalErrorMessage);
    } finally {
      setLoading(false);
      navigate(
        process.env.DFX_NETWORK === "ic"
          ? `/student-dashboard/course/${courseId}`
          : `/student-dashboard/course/${courseId}?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`
      );
    }
  };

  const dateExtractFunction = (uploadDate) => {
    const date = new Date(Number(uploadDate));
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    const formattedDate = `${addOrdinalSuffix(day)} ${month}, ${year}`;
    return formattedDate;
  };

  const addOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return day + 'th';
    switch (day % 10) {
      case 1: return day + 'st';
      case 2: return day + 'nd';
      case 3: return day + 'rd';
      default: return day + 'th';
    }
  };

  const colors = ['red', 'purple', 'violet', 'green', 'blue', 'indigo', `yellow`];
  const colorIndex = Math.floor(Math.random() * colors.length);
  const color = colors[colorIndex];

  const cardClassName = `my-4 flex flex-col sm:flex-col md:flex-col lg:flex-row items-center justify-center px-4 lg:px-8 py-5 rounded-lg shadow-lg w-full bg-${color}-500`;
  const textClassName = `text-${color}-400 w-full flex flex-col sm:w-full md:w-full lg:w-2/3 gap-1`;
  const buttonClassName = `px-8 py-2 font-bold text-white bg-${color}-400 rounded hover:bg-${color}-500 duration-300 ease-in-out shadow`;
  console.log("card class", cardClassName);

  return SingleCourseData ? (
    <div className={cardClassName}>
      <div className={`flex items-start justify-center w-full sm:w-full md:w-full lg:w-1/3 lg:justify-start lg:items-start`}>
        <img src={SingleCourseData.courseImg} alt="card images" className="w-[60%] drop-shadow-lg" />
      </div>
      <div className={textClassName}>
        <div><p className="font-bold lightfont">{dateExtractFunction(SingleCourseData.upload_date)}</p></div>
        <div><h1 className="text-2xl font-bold">{SingleCourseData.courseTitle}</h1></div>
        <div><p className="text-md lightfont">{SingleCourseData.shortdescription}</p></div>
        <div className="flex items-center justify-between my-3">
          <div className="flex items-center justify-center space-x-1">
            <IoIosStar className="text-xl font-bold text-yellow-400" />
            <div className="flex items-center justify-center gap-2 font-bold lightfont">
              <p>{SingleCourseData.rating}</p>
              <p className="flex items-center justify-center gap-2"><GoDotFill className="text-[10px]" />{"Beginner"}</p>
            </div>
          </div>
          <div>
            <button
              type="button"
              className={buttonClassName}
              onClick={() => enrollInCourse(SingleCourseData.courseId)}>
              {Loading ? <Loader /> : enrolled ? "Already Enrolled" : "Enroll Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default RecommededCourseCard;
