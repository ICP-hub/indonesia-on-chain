import React from "react";
import { Route, Routes } from "react-router-dom";
import DrawerSidebar from "../../../Components/Sidebar/DrawerSidebar";
import SideBar from "../../../Components/Sidebar/SideBar";
import Navbar from "../../../Components/Navbar/StudentNavbar";
import Certificates from "./certificates/EducatorCertificates";
import EducatorProfile from "./profile/EducatorProfile";
import Settings from "./settings/Settings";
import UploadCourse from "./Courses/UploadCourses";
import Enrollment from "./Enrollment/Enrollment";
import EducatorMain from "./main/EducatorMain";


// Pending: Code Splitting with Lazy & Suspense ⚠️⚠️

const EducatorDashboard = () => {
  const [mobileDrawer, setMobileDrawer] = React.useState(false)
  const [clickCounter, setClickCounter] = React.useState(0);
  return (
    <div className="w-full h-screen bg-[#EFF1FF] flex">
      <div className="sticky top-0 hidden w-full h-full bg-white sm:w-1/12 lg:w-2/12 md:block">
        <SideBar setClickCounter={setClickCounter} type="educator" />
      </div>

      <DrawerSidebar setMobileDrawer={setMobileDrawer} setClickCounter={setClickCounter} mobileDrawer={mobileDrawer} type="educator" />

      <div className="w-full pb-8 overflow-auto sm:w-11/12 lg:w-10/12">
        <Navbar setMobileDrawer={setMobileDrawer} mobileDrawer={mobileDrawer} clickCounter={clickCounter} />
        <div className="flex w-full">
          <Routes>
            <Route path="/main" element={<EducatorMain />} />
            {/* <Route path="/my_courses" element={<UploadCourses />} /> */}
            <Route path="/my-courses" element={<UploadCourse />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/my-profile" element={<EducatorProfile />} />
            <Route path="/my-settings" element={<Settings />} />
            <Route path="/enrollments" element={<Enrollment />} />
            {/* <Route path="/educator-dashboard/*" element={<EducatorDashboard />} /> */}
          </Routes>
        </div>
      </div>

    </div>
  )
}

export default EducatorDashboard;