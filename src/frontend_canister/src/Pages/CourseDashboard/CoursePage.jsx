import React from 'react';
import StudentSideBar from '../../Components/DashBoardComponents/Student/SideBar';
import VideoComponent from '../../Components/CourseComponents/VideoComponent';
import UpperSection from '../../Components/CourseComponents/UpperSection';
import CourseSidebar from './CourseSidebar';
import Rating from './Rating';
import PublisherProfileCard from './PublisherCard';
import Ellipse from '../../../assets/Ellipse.png';
import FeatureList from './Features';
import LearningObjectives from './LearningObjectives';
import SuggestedCourses from './SuggestedCourse';
import AllCourses from './AllCourses';
import Askaquestion from './Askaquestion';
import MobileSideBar from '../../Components/DashBoardComponents/Student/MobileSidebar';
import VideoStack from '../../Components/CourseComponents/VideoStack';
import Sidebar from '../../Components/DashBoardComponents/Student/SideBar';

function CoursePage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 h-screen">
            <div className="md:col-span-2 bg-white border-r border-gray-200 p-4 md:block hidden">
                <Sidebar />
               
            </div>
            <div className="md:col-span-10 p-6 bg-[#EFF1FE]">
                <UpperSection />
                <div className="md:flex md:space-x-6 p-8">
                    <div className=" md:w-8/12">
                        <div className="relative">
                            {/* <VideoComponent /> */}
                            <VideoStack/>
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
                            <div className=" items-center py-3 px-4">
                                <h3 className='text-xl font-bold block'>Description</h3>
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
                    <div className="w-full md:w-4/12 md:pl-6 mt-6 md:mt-0">
                        <CourseSidebar />
                        <Rating />
                        <PublisherProfileCard />
                        <SuggestedCourses />


                        <AllCourses />


                    </div>

                    <div className='block md:hidden'>
        <MobileSideBar />
      </div>
                </div>
            </div>
        </div>
    );
}

export default CoursePage;
