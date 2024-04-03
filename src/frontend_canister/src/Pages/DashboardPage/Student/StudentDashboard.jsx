import React from "react";
import { Route, Routes } from "react-router-dom";
import DrawerSidebar from "../../../Components/Sidebar/DrawerSidebar";
import SideBar from "../../../Components/Sidebar/SideBar";
import CenterComponent from "../../../Components/DashBoardComponents/Student/CenterComponent";
import Navbar from "../../../Components/Navbar/StudentNavbar";
// import UploadCourses from "../Educator/Courses/UploadCourses";
import MyCertificates from "./certificates/MyCertificates";
// import Enrollment from "../../Educator/Enrollment/Enrollment";
import StudentProfile from "./profile/StudentProfile";
import Settings from "./settings/Settings";
import CoursePage from "./course/MyCourses/CoursePage";
import AllCourses from "./course/MyCourses/AllCourses";
import CertificationTest from "../../DashboardPage/Student/CertificateTest/CertificationTest";
import AllCoursesMain from "../../../Components/MyCourseComponents/AllCoursesMain";
import CourseContent from "./course/MyCourses/CourseContent";
import EditProfile from "./profile/EditProfile";
import CompletedCourses from "./CertificateTest/CompletedCourses";
// Pending: Code Splitting with Lazy & Suspense ⚠️⚠️

const StudentDashboard = () => {
    const [mobileDrawer, setMobileDrawer] = React.useState(false)
    const [clickCounter, setClickCounter] = React.useState(0);
    return (
        <div className="w-full h-screen bg-[#EFF1FF] flex">
            <div className="sticky top-0 hidden w-full h-full bg-white sm:w-1/12 lg:w-2/12 md:block">
                <SideBar setClickCounter={setClickCounter} type="student" />
            </div>

            <DrawerSidebar setMobileDrawer={setMobileDrawer} setClickCounter={setClickCounter} mobileDrawer={mobileDrawer} type="student" />

            <div className="w-full pb-8 overflow-auto sm:w-11/12 lg:w-10/12">
                <Navbar setMobileDrawer={setMobileDrawer} mobileDrawer={mobileDrawer} clickCounter={clickCounter} />
                <div className="flex w-full">
                    <Routes>
                        <Route path="/main" element={<CenterComponent />} />
                        {/* <Route path="/my_courses" element={<UploadCourses />} /> */}
                        <Route path="/course/course-content/:id" element={<CourseContent />} />
                        <Route path="/course/:id" element={<CoursePage />} />
                        <Route path="/my-courses" element={<AllCoursesMain />} />
                        <Route path="/my-certificates" element={<MyCertificates />} />
                        <Route path="/my-profile" element={<StudentProfile />} />
                        <Route path="/my-profile/edit-profile" element={<EditProfile />} />
                        <Route path="/my-settings" element={<Settings />} />
                        <Route path="/all-courses" element={<AllCourses />} />
                        <Route path="/certification-test" element={<CompletedCourses />} />
                        <Route path="/course/test/:id" element={<CertificationTest />} />
                        {/* <Route path="/educator-dashboard/*" element={<EducatorDashboard />} /> */}
                    </Routes>
                </div>
            </div>

        </div>
    )
}

export default StudentDashboard;