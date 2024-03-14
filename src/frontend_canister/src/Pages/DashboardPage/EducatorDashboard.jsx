import { Route, Routes } from "react-router-dom";
import EducatorNavbar from "../../Components/EducatorComponents/EducatorNavbar";
import EducatorSideBar from "../../Components/EducatorComponents/EducatorSidebar";
import UploadCourses from "../Educator/UploadCourses";
import { useState } from "react";
import DrawerSidebar from "../../Components/EducatorComponents/DrawerSidebar";
import EducatorCertificates from "../Educator/EducatorCertificates";

const EducatorDashboardPage = () => {
    const [mobileDrawer, setMobileDrawer] = useState(false)
    return (
        <div className="w-full h-screen bg-[#EFF1FF] flex">
            <div className="w-full sm:w-1/12 lg:w-2/12 bg-white h-full sticky top-0 hidden md:block">
                <EducatorSideBar />
            </div>

            <DrawerSidebar setMobileDrawer={setMobileDrawer} mobileDrawer={mobileDrawer} />

            <div className="w-full sm:w-11/12 lg:w-10/12 overflow-auto pb-8">
                <EducatorNavbar setMobileDrawer={setMobileDrawer} mobileDrawer={mobileDrawer} />
                <div className="w-full flex">
                    <Routes>
                        <Route path="/my-courses" element={<UploadCourses />} />
                        <Route path="/certificates" element={<EducatorCertificates />} />
                    </Routes>
                </div>
            </div>

        </div>
    )
}

export default EducatorDashboardPage;