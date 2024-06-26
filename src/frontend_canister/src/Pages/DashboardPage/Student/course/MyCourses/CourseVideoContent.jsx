import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../../Components/utils/useAuthClient';
import { FiEdit } from "react-icons/fi";
import Loader from '../../../../../Components/Loader/Loader';
import { GoCheckCircleFill } from "react-icons/go";
import CertificateModal from '../../certificates/CertificateModal';
import { Link } from "react-router-dom";

import { useTranslation } from 'react-i18next';
function CourseVideoContent({ courseDetails, videoIdList, watchedVideos, setWatchedVideos, courseId, onPrintId }) {
    const { contentActor, actor } = useAuth();
    const [open, setOpen] = useState({
        open: false,
        isDownload: false,
        data: null
    });
    const [currentVideo, setCurrentVideo] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [certData, setCertData] = useState({});
    const [completedItems, setCompletedItems] = useState(new Set());
    const { t } = useTranslation('MyCourses');

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
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomPart = '';

        for (let i = 0; i < randomPartLength; i++) {
            randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return prefix + randomPart;
    }

    const certificateNumber = generateSerialNumber('IOC-', 9);

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
            }
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
        return videoIdList.every(video => watchedVideos.has(video));
    };

    let lectureCount = 0;
    let testCount = 0;

    return (
        <div className="container w-full px-4 py-8 mx-auto font-poppins rounded-xl fullscreenClass">
            <div className="px-8 py-6 bg-white rounded-lg shadow-md">
                <div className="flex-col space-y-4 ">
                    <div>
                        <h2 className="text-xl text-gray-700">{courseDetails?.courseTitle}</h2>
                        <h4 className="space-y-2 text-lg font-bold text-black-500">{t('FREE')}</h4>
                        <h6 className="mt-4 text-md text-black-500">{t('CourseIncludes')}</h6>
                    </div>
                    <div className="overflow-y-scroll" style={{ height: "70vh" }}>
                        <ul className="space-y-4">
                            {
                                videoIdList.map((video, index) => {
                                    const isVideo = video.includes("video");
                                    const itemLabel = isVideo ? "Lecture" : "Test";
                                    const itemNumber = isVideo ? ++lectureCount : ++testCount;
                                    const disabled = !isPreviousCompleted(index);
                                    return (
                                        <div key={index}>
                                            {Loading ? (
                                                <Loader />
                                            ) : (
                                                <div></div>
                                            )}
                                            <li key={index}
                                                className={`relative w-full flex items-center gap-2 py-4 p-2 border-l-4 hover:bg-[#f3f0ff] cursor-pointer ${currentVideo === index ? "border-l-[#7B61FF]" : "border-transparent"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                                                onClick={() => !disabled && handleClick(video, index)}>
                                                <FiEdit size={18} />
                                                <strong className='flex text-sm whitespace-nowrap'>{itemLabel} {itemNumber}</strong>
                                                {
                                                    watchedVideos.has(video) && (
                                                        <span className='text-[#7B61FF] absolute top-1/2 -translate-y-1/2 right-0'>
                                                            <GoCheckCircleFill size={20} />
                                                        </span>
                                                    )
                                                }
                                            </li>
                                        </div>
                                    );
                                })
                            }

                            <div className='flex items-center justify-center py-2 mx-2 text-center'>
                                <Link onClick={() => {
                                    setOpen({
                                        open: true,
                                        isDownload: false,
                                        data: certData,
                                    })
                                }}
                                    className={`bg-[#7B61FF] font-poppins rounded-lg text-white py-[13px] px-[26.5px] w-full ${!allItemsCompleted() ? "opacity-50 cursor-not-allowed" : ""}`}
                                    style={{ pointerEvents: allItemsCompleted() ? 'auto' : 'none' }}>
                                    Mint Your Certificate
                                </Link>

                                <CertificateModal open={open} setOpen={setOpen} courseId={courseId} courseDetails={courseDetails} />
                            </div>
                        </ul>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default CourseVideoContent;
