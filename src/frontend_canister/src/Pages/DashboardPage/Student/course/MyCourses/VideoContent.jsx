import React, { useEffect, useState } from 'react'
import VideoStack from '../../../../../Components/CourseComponents/VideoStack';
import { useAuth } from '../../../../../Components/utils/useAuthClient';
import Loader from '../../../../../Components/Loader/Loader';
const VideoContent = ({
    id,
    setWatchedVideos,
    VideoId,

}) => {



    const [courseName, setCourseName] = useState();
    const [videoName, setVideoName] = useState();
    const [videoBucket, setVideoBucket] = useState();
    const [videoProfile, setVideoProfile] = useState();
    const [currVidId, setCurrVidId] = useState();
    const [videoDescription, setVideoDescription] = useState();
    const { contentActor } = useAuth()
    const [Loading, setLoading] = useState(false);
    const handleClick = async (VideoId) => {

        try {
            setLoading(true);
            const videoDetail = await contentActor.getvideodetail(VideoId);
            console.log("videoDetails", videoDetail)
            setCurrVidId(VideoId)
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
    useEffect(() => {

        console.log("-------------------------------------------function Called Again ------------------------------------------------------")
        console.log("video ID received: " + VideoId)


        handleClick(VideoId)

    }, [VideoId])

    const VideoStackWrapper = ({ videoBucket, videoProfile, currVidId, courseId, setWatchedVideos }) => {
        return <VideoStack key={videoBucket + videoProfile + currVidId} videoBucket={videoBucket} videoProfile={videoProfile} currVidId={currVidId} courseId={courseId} setWatchedVideos={setWatchedVideos} />;
    };
    if (Loading) {
        return <Loader />
    }

    return (
        <div className="p-8 md:flex md:space-x-6">
            <div className=" md:w-12/12">
                <div className="relative">
                    <VideoStackWrapper videoBucket={videoBucket} videoProfile={videoProfile} currVidId={currVidId} courseId={id} setWatchedVideos={setWatchedVideos} />
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
                        
                        <p className='py-3 text-gray-700'><p dangerouslySetInnerHTML={{ __html: videoDescription }} /></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoContent
