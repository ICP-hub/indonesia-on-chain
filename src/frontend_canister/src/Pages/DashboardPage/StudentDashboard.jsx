import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DrawerSidebar from "../../Components/DashBoardComponents/Student/DrawerSidebar";
import SideBar from "../../Components/DashBoardComponents/Student/SideBar";
import CenterComponent from "../../Components/DashBoardComponents/Student/CenterComponent";
import Navbar from "../../Components/DashBoardComponents/Student/Navbar";
import UploadCourses from "../Student/courses/UploadCourses";
import MyCertificates from "../Student/certificates/MyCertificates";
import EducatorDashboard from "./EducatorDashboard";
import Enrollment from "../Educator/Enrollment/Enrollment";

const StudentDashboardPage = () => {
    const [mobileDrawer, setMobileDrawer] = useState(false)
    return (
        <div className="w-full h-screen bg-[#EFF1FF] flex">
            <div className="sticky top-0 hidden w-full h-full bg-white sm:w-1/12 lg:w-2/12 md:block">
                <SideBar />
            </div>

            <DrawerSidebar setMobileDrawer={setMobileDrawer} mobileDrawer={mobileDrawer} />

            <div className="w-full pb-8 overflow-auto sm:w-11/12 lg:w-10/12">
                <Navbar setMobileDrawer={setMobileDrawer} mobileDrawer={mobileDrawer} />
                <div className="w-full">
                    <Routes>
                        <Route path="/" element={<CenterComponent />} />
                        <Route path="/my-courses" element={<UploadCourses />} />
                        <Route path="/certificates" element={<MyCertificates />} />
                        <Route path="/enrollments" element={<Enrollment />} />
                        {/* <Route path="/educator-dashboard/*" element={<EducatorDashboard />} /> */}
                    </Routes>
                </div>
            </div>

        </div>
    )
}

export default StudentDashboardPage;
