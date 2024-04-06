import React, { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { useAuth } from "../../utils/useAuthClient";
import Loader from "../../Loader/Loader";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const RecommededCourseCard = ({ SingleCourseData, index }) => {
  const { contentActor, actor } = useAuth();
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  // F2F4FD
  useEffect(() => {
    if (SingleCourseData) {
      fetchButtonStatus(SingleCourseData.courseId);
    }

    const checkEnrollment = async () => {
      const result = await contentActor.isuserenrolled(SingleCourseData.courseId)
      console.log(result);
    }
    checkEnrollment();
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
          ? `/student-dashboard/my-courses/${courseId}`
          : `/student-dashboard/my-courses/${courseId}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`
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
          ? `/student-dashboard/my-courses/${courseId}`
          : `/student-dashboard/my-courses/${courseId}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`
      );
    }
  };

  const cardClassName = `my-4 flex flex-col sm:flex-col md:flex-col lg:flex-row items-center justify-center px-4 lg:px-8 py-5 rounded-lg shadow-lg w-full bg-violet-100`;
  const textClassName = `text-violet-600 w-full flex flex-col sm:w-full md:w-full lg:w-2/3 gap-1`;
  const buttonClassName = `px-8 py-2 font-bold text-white bg-violet-300 rounded hover:bg-violet-600 duration-300 ease-in-out shadow`;
  // console.log("card class", cardClassName);

  return SingleCourseData ? (
    <div className={cardClassName}>
      <div className={`flex items-start justify-center w-full sm:w-full md:w-full lg:w-1/3 lg:justify-start lg:items-start`}>
        <img src={SingleCourseData.courseImg} alt="card images" className="w-[60%] drop-shadow-lg object-contain" />
      </div>
      <div className={textClassName}>
        <div><p className="font-bold lightfont">{new Date(parseInt(SingleCourseData.upload_date) / 1000000).toLocaleDateString()}</p></div>
        <div><h1 className="text-xl font-bold">{SingleCourseData.courseTitle && SingleCourseData.courseTitle.length > 80 ? `${SingleCourseData.courseTitle.substring(0,80)}...`:SingleCourseData.courseTitle}</h1></div>
        <div><p className="text-md lightfont">{SingleCourseData.shortdescription && SingleCourseData.shortdescription.length > 80 ? `${SingleCourseData.shortdescription.substring(0, 150)}...` : SingleCourseData.shortdescription}</p></div>
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
              disabled={enrolled}
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
