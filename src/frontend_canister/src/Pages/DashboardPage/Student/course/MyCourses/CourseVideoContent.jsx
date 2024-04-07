import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../../../../Components/utils/useAuthClient';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import Loader from '../../../../../Components/Loader/Loader';
import { GoCheckCircleFill } from "react-icons/go";
import data from '../../../../../../assets/cert-data.json'
import CertificateModal from '../../certificates/CertificateModal';
import Icon1 from '../../../../../../assets/images/cert.png';
import { Link } from "react-router-dom"


function CourseVideoContent({ videoIdList, setVideoName, setVideoBucket, setVideoProfile, setVideoDescription, setCurrVidId, watchedVideos, courseId }) {
    const { contentActor, actor } = useAuth();
    const [open, setOpen] = useState({
        open: false,
        isDownload: false,
        data: null
    });
    const [currentVideo, setCurrentVideo] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [certData, setCertData] = useState({});

    const HandleMint = async (id) => {

        const allVideoWatched = await contentActor.allvideowatched1(id);
        console.log("Video Watched OrNot?", allVideoWatched);

    }

    const handleClick = async (id, index) => {
        setLoading(true);

        try {
            setCurrentVideo(index);
            setCurrVidId(id);
            const videoDetail = await contentActor.getvideodetail(id);
            console.log("videoDetails", videoDetail)
            setVideoName(videoDetail.videoTitle)
            setVideoBucket(videoDetail.videobucket);
            setVideoProfile(videoDetail.videofile);
            setVideoDescription(videoDetail.videodescription);
            setLoading(false);
        } catch (e) {
            console.log(e)
            setLoading(false);
        } finally {
            setLoading(false);
        }

    }

    const firstVideoFetch = async () => {
        try {
            setLoading(true);
            const firstVideoId = String(videoIdList[0]);
            console.log("First Video Id", firstVideoId);
            const videoDetail = await contentActor.getvideodetail(firstVideoId);
            console.log("videoDetails", videoDetail)
            setVideoName(videoDetail.videoTitle)
            setVideoBucket(videoDetail.videobucket);
            setVideoProfile(videoDetail.videofile);
            setVideoDescription(videoDetail.videodescription);
            setLoading(false);
        } catch (e) {
            console.log(e)
            setLoading(false);
        } finally {
            setLoading(false);
        }

    }
    const initialVideoDetails = useRef(null);

    useEffect(() => {
        const fetch = async () => {
            const courseData = await contentActor.getfullCourse(courseId);
            const studentData = await actor.get_user_info();
            let newData = {
                CertificateName: courseData.courseTitle,
                IssueDate: new Date().toISOString(),
                IssuedBy: "Indonessia-On-Chain",
                id: "CertificateA",
                student: {
                    educatorName: courseData.professorName,
                    id: studentData.ok.user_id.toText(),
                    studentName: studentData.ok.userName.toString(),
                }
            }

            return newData;
        }
        const GetCertData = async () => {
            const newData = await fetch();
            setCertData(newData)
        }
        GetCertData();
        initialVideoDetails.current = firstVideoFetch();
        setVideoName(initialVideoDetails.current.videoTitle)
        setVideoBucket(initialVideoDetails.current.videobucket);
        setVideoProfile(initialVideoDetails.current.videofile);
        setVideoDescription(initialVideoDetails.current.videodescription);
    }, []);



    return (
        <div className="container mx-auto px-4 py-8 font-poppins rounded-xl">
            <div className="bg-white rounded-lg shadow-md px-8 py-6">
                <div className="flex flex-col space-y-4">
                    <div>
                        <h2 className="text-xl text-gray-700">Full Course</h2>
                        <h4 className="text-lg text-black-500 font-bold space-y-2">FREE</h4>
                        <h6 className="text-md text-black-500 mt-4">Course Includes:</h6>
                    </div>
                    <ul className="space-y-4">
                        {
                            videoIdList.map((video, index) => {
                                const LectureNo = index + 1;
                                return (
                                    <div>
                                        {Loading ? (
                                            <Loader />
                                        ) : (
                                            <div></div>
                                        )}
                                        <li key={index}
                                            className={`relative w-full flex items-center gap-2 py-4 p-2 border-l-4 hover:bg-[#f3f0ff] cursor-pointer ${currentVideo === index ? "border-l-[#7B61FF]" : "border-transparent"}`}
                                            onClick={() => handleClick(video, index)}>
                                            <FiEdit size={18} />
                                            <strong className='flex text-sm whitespace-nowrap'>Lecture {LectureNo}</strong>
                                            {watchedVideos.has(video) && (
                                                <span className='text-[#7B61FF] absolute top-1/2 -translate-y-1/2 right-0'>
                                                    <GoCheckCircleFill size={20} />
                                                </span>
                                            )}
                                        </li>
                                    </div>

                                );
                            })
                        }

                        <div>
                            {console.log("cert data", data)};
                            <Link onClick={() => {

                                console.log("Cert Data recvied", certData);
                                setOpen({
                                    open: true,
                                    isDownload: false,
                                    data: certData,
                                })
                            }}
                                className="bg-[#7B61FF] font-poppins rounded-lg text-white py-[13px] px-[26.5px] w-full
                                    ">Mint Your Certificate</Link>

                            <CertificateModal open={open} setOpen={setOpen} />
                        </div>
                    </ul>
                </div>

            </div >
        </div >
    );
}

export default CourseVideoContent;











