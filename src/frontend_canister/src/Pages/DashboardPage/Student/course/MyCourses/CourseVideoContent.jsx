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


function CourseVideoContent({ courseDetails, videoIdList, watchedVideos, courseId,onPrintId  }) {
    console.log(videoIdList,'videoIdList');
    const { contentActor, actor } = useAuth();
    const [open, setOpen] = useState({
        open: false,
        isDownload: false,
        data: null
    });
    const [currentVideo, setCurrentVideo] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [certData, setCertData] = useState({});


    useEffect(() => {
        console.log(videoIdList, 'video list logged');
        // Assuming videoIdList is directly an array
        if (videoIdList.length > 0) {
            handleClick(videoIdList[0],0);
        }
      }, [videoIdList]);


    const HandleMint = async (id) => {

        const allVideoWatched = await contentActor.allvideowatched1(id);
        // console.log("Video Watched OrNot?", allVideoWatched);

    }

    const handleClick = async (id, index) => {
        // setLoading(true)
        setCurrentVideo(index);
        onPrintId(id);
       
        // setLoading(false)
    }




    const fetch = async () => {
        const courseData = await contentActor.getfullCourse(courseId);
        const studentData = await actor.get_user_info();
        // console.log("student Data , mint function called:-",studentData);
        console.log("inside this function")
        let newData = {
            CertificateName: courseData.courseTitle,
            IssueDate: new Date().toISOString(),
            IssuedBy: "Indonessia-On-Chain",
            id: "CertificateA",
            student: {
                educatorName: courseData.professorName,
                id: studentData.ok.user_id.toString(),
                studentName: studentData.ok.name.toString(),
            }
        }
        return newData;
    }
    const GetCertData = async () => {
        const newData = await fetch();
        console.log("student Data ---->", newData);
        setCertData(newData)
    }

    useEffect(() => {


        console.log("Function call here")
        GetCertData();
        console.log("Function call here ended")

    }, []);

    // console.log("maindata",courseData);
    let lectureCount = 0;
    let testCount = 0;


    return (
        <div className="container w-full px-4 py-8 mx-auto font-poppins rounded-xl">
            <div className="px-8 py-6 bg-white rounded-lg shadow-md">
                <div className="flex-col space-y-4 ">
                    <div>
                        <h2 className="text-xl text-gray-700">{courseDetails?.courseTitle}</h2>
                        <h4 className="space-y-2 text-lg font-bold text-black-500">FREE</h4>
                        <h6 className="mt-4 text-md text-black-500">Course Includes:</h6>
                    </div>
                    <div className="overflow-y-scroll" style={{height:"70vh"}}>
                    <ul className="space-y-4">
                        {
                            
                            
                            videoIdList.map((video, index) => {
                                const isVideo = video.includes("video");
                                const itemLabel = isVideo ? "Lecture" : "Test";
                                const itemNumber = isVideo ? ++lectureCount : ++testCount;
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
                                            <strong className='flex text-sm whitespace-nowrap'>{itemLabel} {itemNumber}</strong>
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
                            {/* {console.log("cert data", data)}; */}
                            <Link onClick={() => {

                                // console.log("Cert Data recvied", certData);
                                setOpen({
                                    open: true,
                                    isDownload: false,
                                    data: certData,
                                })
                            }}
                                className="bg-[#7B61FF] font-poppins rounded-lg text-white py-[13px] px-[26.5px] w-full
                                    ">Mint Your Certificate</Link>

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











