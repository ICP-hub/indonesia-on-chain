import React, { useEffect, useState } from 'react';
import VideoComponent from '../../../../../Components/CourseComponents/VideoComponent';
import UpperSection from '../../../../../Components/CourseComponents/UpperSection';
import CourseVideoContent from './CourseVideoContent';
import Ellipse from '../../../../../../assets/images/Ellipse.png';
import MobileSideBar from '../../../../../Components/DashBoardComponents/Student/MobileSidebar';
import VideoStack from '../../../../../Components/CourseComponents/VideoStack';
import { useAuth } from '../../../../../Components/utils/useAuthClient';
import { useParams } from "react-router-dom";
import Loader from '../../../../../Components/Loader/Loader';
import DrawerSidebar from "../../../../../Components/Sidebar/DrawerSidebar";
import SideBar from '../../../../../Components/Sidebar/SideBar';



const CourseContent = () => {
    const { contentActor } = useAuth();
    const { id } = useParams();
    const [Loading, setLoading] = useState(false);
    const [courseName, setCourseName] = useState();
    const [videoIdList, setVideoIdList] = useState([]);
    const [videoName, setVideoName] = useState();
    const [videoBucket, setVideoBucket] = useState();
    const [videoProfile, setVideoProfile] = useState();
    const [currVidId, setCurrVidId] = useState();
    const [watchedVideos, setWatchedVideos] = useState(new Set());
    const [videoDescription, setVideoDescription] = useState();
    const [mobileDrawer, setMobileDrawer] = useState(false)
    const [clickCounter, setClickCounter] = useState(0);

    const VideoStackWrapper = ({ videoBucket, videoProfile, currVidId, courseId, setWatchedVideos }) => {
        return <VideoStack key={videoBucket + videoProfile + currVidId} videoBucket={videoBucket} videoProfile={videoProfile} currVidId={currVidId} courseId={courseId} setWatchedVideos={setWatchedVideos} />;
    };

    useEffect(() => {

        const AddVideoIds = async (videoDetails) => {
            console.log("videoList ", videoDetails);
            let newVideoData = [];
            let CurrVid = videoDetails;
            let flag = true;

            while (flag) {

                let Vid = CurrVid[0][0];
                newVideoData.push(Vid);


                if (CurrVid[0][1].length > 0 && CurrVid[0][1] !== undefined) {
                    CurrVid = CurrVid[0][1];
                } else {
                    flag = false;
                }
            }
            newVideoData.reverse();
            setVideoIdList(newVideoData);
        }


        const setData = (details) => {
            console.log(parseInt(details.rating));
            setCourseName(details.courseTitle);
        }
        const fetchCourseData = async () => {
            const details = await contentActor.getfullCourse(id);
            const videoDetails = details.videoidlist;
            const results = await AddVideoIds(videoDetails);

            setData(details);
            console.log("video list details -->", videoDetails)
        }
        setLoading(true);
        fetchCourseData();
        setLoading(false);
    }, []);

    if (Loading) {
        return <Loader />
    }
    return (

        <div className="grid h-screen grid-cols-1 md:grid-cols-12">

            <div className="md:col-span-8 sticky top-0 p-6 bg-[#EFF1FE]">
                <div className="p-8 md:flex md:space-x-6">
                    <div className=" md:w-12/12">
                        <div className="relative">
                            {/*<VideoComponent /> */}
                            <VideoStackWrapper videoBucket={videoBucket} videoProfile={videoProfile} currVidId={currVidId} courseId={id} setWatchedVideos={setWatchedVideos} />
                            {/* <Player/> */}
                        </div>
                        <div>
                            <div className="flex items-center justify-between px-4 py-6">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <h2 className="text-3xl font-bold">{courseName}</h2>
                                        <h2 className="text-xl font-bold">{videoName}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="items-center px-4 py-3 ">
                                <h3 className='block text-xl font-bold'>Description</h3>
                                <p className='py-3 text-gray-700'>{videoDescription}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="w-full mt-6 md:col-span-4 md:pl-6 md:mt-0">
                <>
                    <CourseVideoContent videoIdList={videoIdList} setVideoName={setVideoName}
                        setVideoBucket={setVideoBucket} setVideoProfile={setVideoProfile} setVideoDescription={setVideoDescription} setCurrVidId={setCurrVidId} watchedVideos={watchedVideos} courseId={id} />
                </>
            </div>
            <div className='sticky bottom-0 z-50 block md:hidden'>
                <MobileSideBar />
            </div>
        </div>
    );
}

export default CourseContent
