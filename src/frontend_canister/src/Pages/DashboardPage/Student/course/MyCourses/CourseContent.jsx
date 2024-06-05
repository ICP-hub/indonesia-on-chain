import React, { useEffect, useState } from 'react';
import CourseVideoContent from './CourseVideoContent';
import MobileSideBar from '../../../../../Components/DashBoardComponents/Student/MobileSidebar';
import { useAuth } from '../../../../../Components/utils/useAuthClient';
import { useParams } from "react-router-dom";
import Loader from '../../../../../Components/Loader/Loader';
import ArticleContent from './ArticleContent';
import VideoContent from './VideoContent';
import IntermediateTest from './IntermediateTest';

const CourseContent = () => {
    const { contentActor } = useAuth();
    const { id } = useParams();
    const [Loading, setLoading] = useState(false);
    const [videoIdList, setVideoIdList] = useState([]);
    const [watchedVideos, setWatchedVideos] = useState(new Set());
    const [VideoId, SetVideoId] = useState(null);
    const [ArticleId, SetArticleId] = useState(null);
    const [TestId, SetTestId] = useState(null);
    const [courseDetails, setCourseDetails] = useState();
    const [ContentType, setContentType] = useState()
    const [mobileDrawer, setMobileDrawer] = useState(false)
    const [clickCounter, setClickCounter] = useState(0);

    useEffect(() => {
        const AddVideoIds = async (videoDetails, details) => {
            setCourseDetails(details);
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
        const fetchCourseData = async () => {
            const details = await contentActor.getfullCourse(id);
            const videoDetails = details.videoidlist;
            const results = await AddVideoIds(videoDetails, details);
        }

        const HandleWatchedVideos = (result) => {
            let newVideoData = new Set();
            let CurrVid = result;
            let flag = true;
        
            while (flag) {
        
              let Vid = CurrVid[0][0];
              newVideoData.add(Vid);
              if (CurrVid[0][1].length > 0 && CurrVid[0][1] !== undefined) {
                CurrVid = CurrVid[0][1];
              } else {
                flag = false;
              }
            }
            setWatchedVideos(newVideoData);
            console.log(newVideoData,'getting watch result');
          }

        const getwatchedvideo = async () =>{
            const result = await contentActor.getwatchedvideo(id);
            HandleWatchedVideos(result);
            // console.log('getting watch result',result);
        }

        setLoading(true);
        fetchCourseData();
        getwatchedvideo();
        setLoading(false);
    }, []);


    const handlePrintId = (id) => {
        const [type, actualId] = id.split('#');
        if (type === 'video') {
            SetVideoId(id);
            setContentType("Video")
        } else if (type === 'article') {
            SetArticleId(id)
            setContentType("Article")
        } else {
            setContentType("Test")
            SetTestId(id)
        }
    };

    if (Loading) {
        return <Loader />
    }

    return (
        <div className="grid h-screen grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-8 sticky top-0 p-6 bg-[#EFF1FE]">
                {ContentType === "Video" ? (
                    <VideoContent
                        id={id}
                        VideoId={VideoId}
                        setWatchedVideos={setWatchedVideos}

                    />
                ) : ContentType === "Article" ? (
                    <ArticleContent
                        courseId={id}
                        ArticleId={ArticleId}
                        setWatchedVideos={setWatchedVideos} />
                ) : (
                    <IntermediateTest
                        courseId={id}
                        id={TestId}
                        setWatchedVideos={setWatchedVideos} />
                )
                }
            </div>
            <div className="w-full mt-6 md:col-span-4 md:pl-6 md:mt-0">
                <CourseVideoContent
                    courseDetails={courseDetails}
                    videoIdList={videoIdList}
                    watchedVideos={watchedVideos}
                    setWatchedVideos={setWatchedVideos}
                    courseId={id}
                    onPrintId={handlePrintId}
                />
            </div>
            <div className='sticky bottom-0 z-50 block md:hidden'>
                <MobileSideBar />
            </div>
        </div>
    );
}

export default CourseContent;
