import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { RxClock } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../utils/useAuthClient";
import Loader from "../Loader/Loader"; 
import { useTranslation } from 'react-i18next';

const InProgressCardDetails = ({ cardData = {}, tabType, setLoading }) => {
  const navigate = useNavigate();
  const { contentActor, actor } = useAuth();
  const { t } = useTranslation();

  const {
    title = '',
    name = '',
    completed = false,
    image = '',
    cardBackgroundColor = '#fff',
    progressBarBaseColor = '#ccc',
    progressBarColor = '#000',
    id = ''
  } = cardData || {};

  const [tabTypeData, setTabTypeData] = useState("All");
  const [loading, setLoadingState] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    if (tabType) {
      setTabTypeData(tabType);
    } else {
      setTabTypeData("All");
    }

    const fetchButtonStatus = async (courseId) => {
      try {
        setLoadingState(true);
        const status = await contentActor.isuserenrolled(courseId);
        setEnrolled(status);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingState(false);
      }
    };

    if (id) {
      fetchButtonStatus(id);
    }
  }, [tabType, id, contentActor]);

  const enrollInCourse = async (courseId) => {
    try {
      setLoadingState(true);
      const result = await contentActor.enrollbystudent(courseId);
      const result1 = await actor.updateOngoingCourse(courseId);
      setLoadingState(false);

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
      setLoadingState(false);
      navigate(
        process.env.DFX_NETWORK === "ic"
          ? `/student-dashboard/my-courses/course-content/${courseId}`
          : `/student-dashboard/my-courses/course-content/${courseId}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`
      );
    }
  };

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    } else {
      console.error("Navigation path is undefined or null");
    }
  };

  const getNavigationPath = (courseId) => {
    if (!courseId) {
      console.error("Course ID is null or undefined");
      return null;
    }
    return process.env.DFX_NETWORK === "ic"
      ? `/student-dashboard/my-courses/course-content/${courseId}`
      : `/student-dashboard/my-courses/course-content/${courseId}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`;
  };

  return (
    <div>
      {tabType ? (
        <div className="flex items-center justify-center w-full">
          <div className="w-full bg-white rounded-lg shadow-lg">
            <div className="flex items-start justify-center rounded-lg p-3" style={{ backgroundColor: cardBackgroundColor }}>
              <img src={image} alt="mind image" className="w-[125px] py-2 px-4" />
            </div>
            <div className="flex flex-col w-full gap-2 p-5">
              <div className="flex items-center justify-between">
                <small className="text-[14px] text-gray-500">{t('InProgressCardDetails.Development')}</small>
                <div className="flex justify-center items-center">
                  <RxClock className="flex justify-start text-gray-500" />
                  <span className="mx-1 text-gray-500 text-[14px]">{t('InProgressCardDetails.min')}</span>
                </div>
              </div>
              <h1 className="font-bold text-md">{title}</h1>
              <div className="flex justify-start items-center gap-1">
                <GoPerson className="text-sm text-gray-400" />
                <p className="text-sm text-gray-400">{name}</p>
              </div>
              {tabType === 'Complete' ? (
                <button className="my-2 w-full flex items-center justify-center p-2 text-black rounded-md"
                  style={{ backgroundColor: progressBarColor }}
                  onClick={() => {
                    handleNavigation(
                      process.env.DFX_NETWORK === "ic"
                        ? `/student-dashboard/my-courses/test/${id}`
                        : `/student-dashboard/my-courses/test/${id}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`
                    );
                  }}
                >{t('InProgressCardDetails.TakeTest')}</button>
              ) : (
                enrolled ? (
                  <button className="my-2 w-full flex items-center justify-center p-2 text-black rounded-md"
                    style={{ backgroundColor: progressBarColor }}
                    onClick={() => {
                      const path = getNavigationPath(id);
                      handleNavigation(path);
                    }}
                  >
                    {t('InProgressCardDetails.Content')}
                  </button>
                ) : (
                  <button className="my-2 w-full flex items-center justify-center p-2 text-black rounded-md"
                    style={{ backgroundColor: progressBarColor }}
                    onClick={() => {
                      setLoading(true);
                      enrollInCourse(id);
                      setLoading(false);
                    }}
                  >
                    {loading ? <Loader /> : "Enroll"}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default InProgressCardDetails;
