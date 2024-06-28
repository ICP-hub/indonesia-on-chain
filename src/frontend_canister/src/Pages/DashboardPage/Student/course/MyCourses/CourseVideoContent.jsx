import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../Components/utils/useAuthClient";
import { FiEdit } from "react-icons/fi";
import Loader from "../../../../../Components/Loader/Loader";
import { GoCheckCircleFill } from "react-icons/go";
import CertificateModal from "../../certificates/CertificateModal";
import { Link } from "react-router-dom";
import { PiWarningCircleBold } from "react-icons/pi";
import { useTranslation } from "react-i18next";

function CourseVideoContent({
  courseDetails,
  videoIdList,
  watchedVideos,
  setWatchedVideos,
  courseId,
  onPrintId,
}) {
  const { contentActor, actor } = useAuth();
  const [open, setOpen] = useState({
    open: false,
    isDownload: false,
    data: null,
  });
  const [currentVideo, setCurrentVideo] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [certData, setCertData] = useState({});
  const [completedItems, setCompletedItems] = useState(new Set());
  const [notePointView, setNotePointView] = useState(false);
  const [showPercentage, setShowPercentage] = useState(0.0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (videoIdList.length > 0) {
      handleClick(videoIdList[0], 0);
    }
  }, [videoIdList]);

  const handleClick = async (id, index) => {
    setCurrentVideo(index);
    onPrintId(id);
  };

  function generateSerialNumber(prefix, totalLength) {
    const randomPartLength = totalLength - prefix.length;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomPart = "";

    for (let i = 0; i < randomPartLength; i++) {
      randomPart += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return prefix + randomPart;
  }

  const certificateNumber = generateSerialNumber("IOC-", 9);

  const fetch = async () => {
    const courseData = await contentActor.getfullCourse(courseId);
    const studentData = await actor.get_user_info();
    let newData = {
      CertificateName: courseData.courseTitle,
      IssueDate: new Date().toISOString(),
      IssuedBy: "Indonesia-On-Chain",
      id: certificateNumber.toString(),
      student: {
        educatorName: courseData.professorName,
        id: studentData.ok.user_id.toString(),
        studentName: studentData.ok.name.toString(),
      },
    };
    return newData;
  };

  const GetCertData = async () => {
    const newData = await fetch();
    setCertData(newData);
  };

  useEffect(() => {
    GetCertData();
  }, []);

  const handleComplete = (video) => {
    setWatchedVideos(new Set(watchedVideos).add(video));
    setCompletedItems(new Set(completedItems).add(video));
  };

  const isPreviousCompleted = (index) => {
    if (index === 0) return true;
    const previousVideo = videoIdList[index - 1];
    return watchedVideos.has(previousVideo);
  };

  const allItemsCompleted = () => {
    return videoIdList.every((video) => watchedVideos.has(video));
  };

  let lectureCount = 0;
  let testCount = 0;

  const showCertificate = () => {
    setOpen({
      open: true,
      isDownload: false,
      data: certData,
    });
  };

  const getData = async () => {
    const resultdata = await actor.get_user_marks();
    console.log(resultdata, 'resultData');
    if (resultdata && 'err' in resultdata && resultdata.err === 'No marks found') {
        SetNotePointView(false);
        showCertificate();
    } else if (resultdata && 'ok' in resultdata && 'obtained_marks' in resultdata.ok && 'total_marks' in resultdata.ok) {
        const totalPercentage = ((resultdata.ok.obtained_marks / resultdata.ok.total_marks) * 100).toFixed(2);
        SetShowPercentage(totalPercentage);
        if (totalPercentage >= 70.00) {
            SetNotePointView(false);
            showCertificate();
        } else {
            SetNotePointView(true);
        }
    } else {
        console.error("Unexpected data format:", resultdata);
    }
  };



  const checkMintAbility = () =>{
    setLoading(true);
    setIsProcessing(true); // Set processing state to true
    getData();
    setLoading(false);
    setIsProcessing(false); // Set processing state to false
  };

  return (
    <div className="container w-full px-4 py-8 mx-auto font-poppins rounded-xl fullscreenClass">
      <div className="px-8 py-6 bg-white rounded-lg shadow-md">
        <div className="flex-col space-y-4 ">
          <div>
            <h2 className="text-xl text-gray-700">
              {courseDetails?.courseTitle}
            </h2>
            <h4 className="space-y-2 text-lg font-bold text-black-500">
              {t("MyCourses.FREE")}
            </h4>
            <h6 className="mt-4 text-md text-black-500">
              {t("MyCourses.CourseIncludes")}
            </h6>
          </div>
          <div className="overflow-y-scroll" style={{ height: "70vh" }}>
            <ul className="space-y-4">
              {videoIdList.map((video, index) => {
                const isVideo = video.includes("video");
                const itemLabel = isVideo ? "Lecture" : "Test";
                const itemNumber = isVideo ? ++lectureCount : ++testCount;
                const disabled = !isPreviousCompleted(index);
                return (
                  <div key={index}>
                    {Loading && currentVideo === index ? <Loader /> : null}
                    <li
                      key={index}
                      className={`relative w-full flex items-center gap-2 py-4 p-2 border-l-4 hover:bg-[#f3f0ff] cursor-pointer ${
                        currentVideo === index
                          ? "border-l-[#7B61FF]"
                          : "border-transparent"
                      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => !disabled && handleClick(video, index)}
                    >
                      <FiEdit size={18} />
                      <strong className="flex text-sm whitespace-nowrap">
                        {itemLabel} {itemNumber}
                      </strong>
                      {watchedVideos.has(video) && (
                        <span className="text-[#7B61FF] absolute top-1/2 -translate-y-1/2 right-0">
                          <GoCheckCircleFill size={20} />
                        </span>
                      )}
                    </li>
                  </div>
                );
              })}
              {notePointView && (
                <div className="flex items-center justify-center">
                  <div className="text-red-500 text-[12px] flex">
                    <PiWarningCircleBold className="w-12 h-12 mx-1" />
                    <span>
                      Your score is <b>{showPercentage}%</b>, which is less than
                      the passing score of <b>70%</b>. You are not able to mint
                      the certificate. Please retry the test to earn the
                      certificate.
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center py-2 mx-2 text-center">
                <button
                  onClick={checkMintAbility}
                  disabled={!allItemsCompleted() || isProcessing}
                  className={`bg-[#7B61FF] font-poppins rounded-lg text-white py-[13px] px-[26.5px] w-full ${
                    !allItemsCompleted() || isProcessing
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isProcessing ?  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 mx-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg> : t("MyCourses.MintYourCertificate")}
                </button>

                <CertificateModal
                  open={open}
                  setOpen={setOpen}
                  courseId={courseId}
                  courseDetails={courseDetails}
                />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseVideoContent;
