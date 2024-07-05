import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../Components/utils/useAuthClient";
import { FiEdit } from "react-icons/fi";
import Loader from "../../../../../Components/Loader/Loader";
import { GoCheckCircleFill } from "react-icons/go";
import CertificateModal from "../../certificates/CertificateModal";
import { Link } from "react-router-dom";
import { PiWarningCircleBold } from "react-icons/pi";
import IntermediateTest from './IntermediateTest'; // Import IntermediateTest component
import { useTranslation } from "react-i18next";

function CourseVideoContent({
  courseDetails,
  videoIdList,
  watchedVideos,
  setWatchedVideos,
  courseId,
  onPrintId,
  SetIndexShow,
  indexShow
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
  const [notePointView, SetNotePointView] = useState(false);
  const [showPercenatge, SetShowPercentage] = useState(0.0);
  const [processing, setProcessing] = useState(false); // State for processing state
  const { t } = useTranslation();

  useEffect(() => {
    if (videoIdList.length > 0) {
      handleClick(videoIdList[0], 0);
    }
  }, [videoIdList]);

  useEffect(()=>{
    setCurrentVideo(indexShow);
    console.log(indexShow,'indexsjpw')
  })

  const handleClick = async (id, index) => {
    setCurrentVideo(index);
    SetIndexShow(index);
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
      IssuedBy: "Indonessia-On-Chain",
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

  const showCertificate = () => {
    setOpen({
      open: true,
      isDownload: false,
      data: certData,
    });
  };

  const getData = async () => {
    const resultdata = await actor.get_user_marks();
    const totalPercentage = (
      (resultdata.ok.obtained_marks / resultdata.ok.total_marks) *
      100
    ).toFixed(2);
    SetShowPercentage(totalPercentage);
    if (totalPercentage >= 70.0) {
      SetNotePointView(false);
      showCertificate();
    } else {
      SetNotePointView(true);
    }
  };

  const checkMintAbility = async () => {
    setProcessing(true); // Show processing state
    try {
      await getData();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setProcessing(false); // Hide processing state
      setOpen({
        open: true,
        isDownload: false,
        data: certData,
      });
    }
  };

  const handleNextVideo = () => {
    if (currentVideo !== null && currentVideo < videoIdList.length - 1) {
      handleClick(videoIdList[currentVideo + 1], currentVideo + 1);
    }
  };

  // Get CourseId Only
  const [testTitles, setTestTitles] = useState([]);
  const [videoTitles, setVideoTitles] = useState([]);

  // Video lecture
  let lectureCount = 0;
  let testCount = 0;

    const fetchId = async () => {
      try {
        const courseData = await contentActor.getfullCourse(courseId);
        const courseIdOnly = courseData.courseId;
    
        const videoIdList = await contentActor.getfullCourseVideoIds(courseIdOnly);
    
        // Separate test IDs and video IDs
        const testIds = [];
        const videoIds = [];
    
        const extractIds = (arr) => {
          arr.forEach(item => {
            if (typeof item === 'string') {
              if (item.startsWith('test#')) {
                testIds.push(item);
              } else if (item.startsWith('video#')) {
                videoIds.push(item);
              }
            } else if (Array.isArray(item)) {
              extractIds(item);
            }
          });
        };
    
        extractIds(videoIdList);
    
        // Fetch and set test titles
        const fetchedTestTitles = [];
        for (const testId of testIds) {
          const questionList = await contentActor.getquestionlistbytestid(testId);
          fetchedTestTitles.push(questionList.testTitle);
        }
        setTestTitles(fetchedTestTitles.reverse());
    
        // Fetch and set video titles
        const fetchedVideoTitles = [];
        for (const videoId of videoIds) {
          try {
            const videoDetailTitle = await contentActor.getvideodetailTitile(videoId);
            if (videoDetailTitle) {
              fetchedVideoTitles.push(videoDetailTitle);
            } else {
              console.log(`Video detail not found for ${videoId}`);
            }
          } catch (error) {
            console.error(`Error fetching video detail for ${videoId}:`, error);
          }
        }
        setVideoTitles(fetchedVideoTitles.reverse());
    
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

  useEffect(() => {
    fetchId();
  }, []);

  return (
    <div className="container w-full px-4 py-8 mx-auto font-poppins rounded-xl fullscreenClass">
      <div className="px-8 py-6 bg-white rounded-lg shadow-md">
        <div className="flex-col space-y-4">
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
                const itemLabel = isVideo
                  ? videoTitles[lectureCount]
                  : testTitles[testCount];
                const itemNumber = isVideo ? ++lectureCount : ++testCount;
                const disabled = !isPreviousCompleted(index);
                return (
                  <div key={index}>
                    {Loading ? <Loader /> : <div></div>}
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
                      <strong className="flex text-sm whitespace-wrap">
                        {itemLabel}
                        {/* {itemNumber} */}
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
                      Your score is <b>{showPercenatge}%</b>, which is less
                      than the passing score of <b>70%</b>. You are not able to
                      mint the certificate. Please retry the test to earn the
                      certificate.
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center py-2 mx-2 text-center">
                {processing ? (
                  <Loader /> // Show loader while processing
                ) : (
                  <Link
                    onClick={checkMintAbility}
                    className={`bg-[#7B61FF] font-poppins rounded-lg text-white py-[13px] px-[26.5px] w-full ${
                      !allItemsCompleted()
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    style={{
                      pointerEvents: allItemsCompleted() ? "auto" : "none",
                      display: !processing ? "block" : "none",
                    }}
                  >
                    {t("MyCourses.MintYourCertificate")}
                  </Link>
                )}

                <CertificateModal
                  open={open}
                  setOpen={setOpen}
                  courseId={courseId}
                  courseDetails={courseDetails}
                />
              </div>
              <div className="flex items-center justify-center py-2 mx-2 text-center">
                {currentVideo !== null &&
                  currentVideo < videoIdList.length - 1 && (
                    <button
                      onClick={handleNextVideo}
                      className="bg-[#7B61FF] font-poppins rounded-lg text-white py-[13px] px-[26.5px] w-full"
                    >
                      {t("MyCourses.NextVideo")}
                    </button>
                  )}
              </div>
            </ul>
          </div>
        </div>
      </div>
      {currentVideo !== null && videoIdList[currentVideo].includes("test#") && (
        <IntermediateTest
          courseId={courseId}
          id={videoIdList[currentVideo]}
          setWatchedVideos={setWatchedVideos}
          handleNextVideo={handleNextVideo} 
        />
      )}
    </div>
  );
}

export default CourseVideoContent;
