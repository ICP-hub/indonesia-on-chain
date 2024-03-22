import React from "react";
import { Route, Routes } from "react-router-dom";
import DrawerSidebar from "../../../Components/Sidebar/DrawerSidebar";
import SideBar from "../../../Components/Sidebar/StudentSideBar";
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

const StudentDashboard = () => {
    const [mobileDrawer, setMobileDrawer] = React.useState(false)
    const [clickCounter, setClickCounter] = React.useState(0);
    return (
        <div className="w-full h-screen bg-[#EFF1FF] flex">
            <div className="sticky top-0 hidden w-full h-full bg-white sm:w-1/12 lg:w-2/12 md:block">
                <SideBar setClickCounter={setClickCounter} />
            </div>

            <DrawerSidebar setMobileDrawer={setMobileDrawer} mobileDrawer={mobileDrawer} />

            <div className="w-full pb-8 overflow-auto sm:w-11/12 lg:w-10/12">
                <Navbar setMobileDrawer={setMobileDrawer} mobileDrawer={mobileDrawer} clickCounter={clickCounter} />
                <div className="flex w-full">
                    <Routes>
                        <Route path="/" element={<CenterComponent />} />
                        {/* <Route path="/my_courses" element={<UploadCourses />} /> */}
                        <Route path="/my_courses" element={<CoursePage />} />
                        <Route path="/my_certificates" element={<MyCertificates />} />
                        <Route path="/my_profile" element={<StudentProfile />} />
                        <Route path="/my_settings" element={<Settings />} />
                        <Route path="/all_courses" element={<AllCourses />} />
                        <Route path="/certification_test" element={<CertificationTest />} />
                        {/* <Route path="/educator-dashboard/*" element={<EducatorDashboard />} /> */}
                    </Routes>
                </div>
            </div>

        </div>
    )
}

export default StudentDashboard;