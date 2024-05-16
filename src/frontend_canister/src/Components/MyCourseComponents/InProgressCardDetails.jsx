import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { RxClock } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../utils/useAuthClient";

const InProgressCardDetails = ({ cardData, tabType, setLoading }) => {
  const navigate = useNavigate();
  const { contentActor, actor } = useAuth();
  const {
    title,
    name,
    completed,
    image,
    cardBackgroundColor,
    progressBarBaseColor,
    progressBarColor,
    id,
  } = cardData;

  const [tabTypeData, SetTabtypeData] = useState("All");

  useEffect(() => {

    console.log("completed course test:->", tabType);
    if (tabType) {
      SetTabtypeData(tabType);
    } else {
      SetTabtypeData("All");
    }
  }, [tabType]);

  const enrollInCourse = async (courseId) => {
    try {
      const result = await contentActor.enrollbystudent(courseId);
      const result1 = await actor.updateOngoingCourse(courseId);

      if (result1.ok.active) {
        navigate(
          process.env.DFX_NETWORK === "ic"
            ? `/student-dashboard/my-courses/${courseId}`
            : `/student-dashboard/my-courses/${courseId}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`
        );
      }
    } catch (error) {
      const message = error.message;
      const startIndex = message.indexOf("trapped explicitly:");
      const errorMessageSubstring = message.substring(startIndex);
      const endIndex = errorMessageSubstring.indexOf(":");
      const finalErrorMessage = errorMessageSubstring.substring(endIndex + 1).trim();
      toast.error(finalErrorMessage);
    } finally {
      navigate(
        process.env.DFX_NETWORK === "ic"
          ? `/student-dashboard/my-courses/course-content/${courseId}`
          : `/student-dashboard/my-courses/course-content/${courseId}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`
      );
    }
  };


  console.log("cardData", tabType);
  return (
    <div>
      {tabType ? (
        <div className="flex items-center justify-center w-full">
          <div className="w-full bg-white rounded-lg shadow-lg">
            <div className={`bg-[${cardBackgroundColor}] flex items-start justify-center rounded-lg p-3`}>
              <img src={image} alt="mind image" className="w-[125px] py-2 px-4" />
            </div>
            <div className="flex flex-col w-full gap-2 p-5">
              <div className="flex items-center justify-between">
                <small className="text-[14px] text-gray-500">Development</small>
                <div className="flex justify-center items-center">
                  <RxClock className="flex justify-start text-gray-500" />
                  <span className="mx-1 text-gray-500 text-[14px]">45 min</span>
                </div>
              </div>
              <h1 className="font-bold text-md">{title}</h1>
              <div className="flex justify-start items-center gap-1">
                <GoPerson className="text-sm text-gray-400" />
                <p className="text-sm text-gray-400">{name}</p>
              </div>
              {
                 
                 tabType === 'Complete' ? (
                  <button className={`my-2 w-full flex items-center justify-center p-2 bg-[${progressBarColor}] text-black rounded-md`}
                    onClick={() => {
                      navigate(
                        process.env.DFX_NETWORK === "ic"
                          ? `/student-dashboard/my-courses/test/${id}`
                          : `/student-dashboard/my-courses/test/${id}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`
                      );
                    }}
                  >Take Test</button>
                ) : (
                  (
                    <button className={`my-2 w-full flex items-center justify-center p-2 bg-[${progressBarColor}] text-black rounded-md`}

                      onClick={() => {
                        setLoading(true);
                        enrollInCourse(id)
                        setLoading(false);
                      }}
                    >Enroll</button>
                  )
                )
              }

            </div>
          </div>
        </div >
      ) : (
        <div>

        </div>
      )}
    </div>
  );
};

export default InProgressCardDetails;
