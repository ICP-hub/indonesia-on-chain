import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DrawerSidebar from "../../Components/DashBoardComponents/Student/DrawerSidebar";
import SideBar from "../../Components/DashBoardComponents/Student/SideBar";
import CenterComponent from "../../Components/DashBoardComponents/Student/CenterComponent";
import Navbar from "../../Components/DashBoardComponents/Student/Navbar";
import UploadCourses from "../Student/courses/UploadCourses";
import MyCertificates from "../Student/certificates/MyCertificates";
import EducatorDashboard from "./EducatorDashboard";
import Enrollment from "../Educator/Enrollment/Enrollment";
import { useDispatch } from 'react-redux';

// const selectActor = (currState) => currState.actors.actor;

const StudentDashboardPage = () => {
    const dispatch = useDispatch();
    const [mobileDrawer, setMobileDrawer] = useState(false);
    const fetchData = () => {

        console.log("here");
        try {
            dispatch({ type: 'get_all_course' })
           
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData(); // Call the function
    }, []);
    return (
        <div className="w-full h-screen bg-[#EFF1FF] flex">
            <div className="w-full sm:w-1/12 lg:w-2/12 bg-white h-full sticky top-0 hidden md:block">
                <SideBar />
            </div>

            <DrawerSidebar setMobileDrawer={setMobileDrawer} mobileDrawer={mobileDrawer} />

            <div className="w-full sm:w-11/12 lg:w-10/12 overflow-auto pb-8">
                <Navbar setMobileDrawer={setMobileDrawer} mobileDrawer={mobileDrawer} />
                <div className="w-full flex">
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