import React from 'react';
import VideoComponent from '../../../../../Components/CourseComponents/VideoComponent';
import UpperSection from '../../../../../Components/CourseComponents/UpperSection';
import CourseSidebar from './CourseSidebar';
import Rating from './Rating';
import PublisherProfileCard from './PublisherCard';
import Ellipse from '../../../../../../assets/images/Ellipse.png';
import FeatureList from './Features';
import LearningObjectives from './LearningObjectives';
import SuggestedCourses from './SuggestedCourse';
import AllCourses from './AllCourses';
import Askaquestion from './Askaquestion';
import MobileSideBar from '../../../../../Components/DashBoardComponents/Student/MobileSidebar';
import VideoStack from '../../../../../Components/CourseComponents/VideoStack';
function CoursePage() {
    return (
        <div className="grid h-screen grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-10 sticky top-0 p-6 bg-[#EFF1FE]">
                <div className="p-8 md:flex md:space-x-6">
                    <div className=" md:w-8/12">
                        <div className="relative">
                            {/* <VideoComponent /> */}
                            <VideoStack />
                            {/* <Player/> */}
                        </div>

                        <div>



                            <div className="flex items-center justify-between px-4 py-6">
                                <div className="flex items-center space-x-4">
                                    <img src={Ellipse} alt="photo" className="w-16 h-16 rounded-full" />
                                    <div>
                                        <h2 className="text-xl font-bold">Name</h2>
                                        <p className="text-gray-500">Publisher</p>
                                    </div>
                                </div>
                            </div>
                            <div className="items-center px-4 py-3 ">
                                <h3 className='block text-xl font-bold'>Description</h3>
                                <p className='py-3 text-gray-700'>Explore the fascinating world of blockchain with our comprehensive course. From the fundamentals of decentralized ledgers to smart contracts and cryptocurrency, this program equips you with the knowledge to navigate and leverage blockchain technology. Dive into hands-on exercises and real-world applications, gaining practical skills for a rapidly evolving industry. Whether you're a beginner or an enthusiast, unlock the potential of blockchain in this engaging learning experience.</p>

                            </div>
                            <div>
                                <FeatureList></FeatureList>
                            </div>
                            <div>
                                <LearningObjectives />
                            </div>
                            <div >

                                <Askaquestion />
                            </div>



                        </div>
                    </div>
                    <div className="w-full mt-6 md:w-4/12 md:pl-6 md:mt-0">
                        <CourseSidebar />
                        <Rating />
                        <PublisherProfileCard />
                        <SuggestedCourses />


                        <AllCourses />


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
