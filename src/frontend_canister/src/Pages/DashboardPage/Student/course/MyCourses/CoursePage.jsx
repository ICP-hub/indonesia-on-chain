import React, { useEffect, useState } from 'react';
import VideoComponent from '../../../../../Components/CourseComponents/VideoComponent';
import UpperSection from '../../../../../Components/CourseComponents/UpperSection';
import CourseSidebar from './CourseSidebar';
import Rating from './Rating';
import PublisherProfileCard from './PublisherCard';
import Ellipse from '../../../../../../assets/images/Ellipse.png';
import FeatureList from './Features';
import LearningObjectives from './LearningObjectives';
import SuggestedCourses from './SuggestedCourse';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllCourses from './AllCourses';
import Askaquestion from './Askaquestion';
import MobileSideBar from '../../../../../Components/DashBoardComponents/Student/MobileSidebar';
import VideoStack from '../../../../../Components/CourseComponents/VideoStack';
import { useAuth } from '../../../../../Components/utils/useAuthClient';
import { useParams } from "react-router-dom";
import Loader from '../../../../../Components/Loader/Loader';
import DrawerSidebar from "../../../../../Components/Sidebar/DrawerSidebar";
import SideBar from '../../../../../Components/Sidebar/SideBar';
function CoursePage() {
    const { contentActor } = useAuth();
    const { id } = useParams();
    const [Loading, setLoading] = useState(false);
    const [rating, setRating] = useState();
    const [duration, setDuration] = useState();
    const [professor, setProfessor] = useState();
    const [longDescription, setLongDescription] = useState();
    const [views, setViews] = useState();
    const [courseName, setCourseName] = useState();
    const [learningObjectives, setlearningObjectives] = useState([]);
    const [mobileDrawer, setMobileDrawer] = React.useState(false)
    const [clickCounter, setClickCounter] = React.useState(0);
    useEffect(() => {

        const setData = (details) => {
            // console.log(parseInt(details.rating));
            setRating(parseInt(details.rating));
            setDuration(parseInt(details.duration));
            setLongDescription(details.longdescription);
            setViews(parseInt(details.enrollmentcount));
            setProfessor(details.professorName);
            setCourseName(details.courseTitle);
            let newPoints = [];
            for (let i = 0; i < details.learningpoints[0].length - 1; i++) {
                newPoints.push(details.learningpoints[0][i]);
            }
            setlearningObjectives(newPoints);
            // console.log(newPoints);
            // console.log("LearningObjectives->", details.learningpoints[0][0]);
        }

        const fetchCourseData = async () => {
            const details = await contentActor.getfullCourse(id);
            // console.log("course details -->", details)
            setData(details);
        }
        toast.success('Course enrolled successfully');
        // console.log('contentActor---->', contentActor);

        setLoading(true);
        fetchCourseData();
        setLoading(false);
    }, []);

    return (


        <div className="grid h-screen grid-cols-1 md:grid-cols-12">

            <div className="md:col-span-10 sticky top-0 p-6 bg-[#EFF1FE]">
                <div className="p-8 md:flex md:space-x-6">
                    <div className=" md:w-8/12">
                        <div className="relative">
                            {/*<VideoComponent /> */}
                            <VideoStack />
                            {/* <Player/> */}
                        </div>

                        <div>



                            <div className="flex items-center justify-between px-4 py-6">
                                <div className="flex items-center space-x-4">
                                    <img src={Ellipse} alt="photo" className="w-16 h-16 rounded-full" />
                                    <div>
                                        <h2 className="text-xl font-bold">{courseName}</h2>
                                        <p className="text-gray-500">{professor}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="items-center px-4 py-3 ">
                                <h3 className='block text-xl font-bold'>Description</h3>
                                <p className='py-3 text-gray-700'>{longDescription}</p>

                            </div>
                            <div>
                                <FeatureList duration={duration} views={views} />
                            </div>
                            <div>
                                <LearningObjectives learningObjectives={learningObjectives} />
                            </div>
                            <div >

                                <Askaquestion />
                            </div>



                        </div>
                    </div>
                    <div className="w-full mt-6 md:w-4/12 md:pl-6 md:mt-0">
                        {!Loading ? (
                            <>
                                <CourseSidebar />
                                <Rating rating={rating} />
                                <PublisherProfileCard />
                                <SuggestedCourses />
                                <AllCourses />
                            </>
                        ) : (
                            <Loader />
                        )}


                    </div>

                </div>
            </div>
            <div className='sticky bottom-0 z-50 block md:hidden'>
                <MobileSideBar />
            </div>
        </div>

    );
}

export default CoursePage;
