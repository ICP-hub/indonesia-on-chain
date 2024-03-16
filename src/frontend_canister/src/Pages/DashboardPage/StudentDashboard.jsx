// import React, { useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
// import { logoutStart } from "../../Components/Reducers/InternetIdentityReducer";

// import StudentSideBar from '../../Components/DashBoardComponents/Student/SideBar';
// import CenterComponent from '../../Components/DashBoardComponents/Student/CenterComponent';
// const StudentDashboardPage = () => {
//     const dispatch = useDispatch();
//     const { actor } = useSelector((state) => state.actors);
//     const { t } = useTranslation();
//     const [isLoading, setIsLoading] = useState(false);

//     const handleLogout = async () => {
//         setIsLoading(true);
//         try {
//             dispatch(logoutStart());
//             setIsLoading(false);
//             window.location.href =
//                 process.env.DFX_NETWORK === "ic" ?
//                     '/' :
//                     `/?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`;
//         } catch (error) {
//             setIsLoading(false);
//         }
//     };

//     const color = "black"
//     return (
//         <div className="grid grid-cols-12 h-screen">
//             <div className="col-span-2 bg-white text-white justify-start w-full">
//                 <StudentSideBar />
//             </div>
//             <div className="col-span-10">
//                 <CenterComponent />
//             </div>
//             <div className={`${location.pathname === "/student-dashboard" ? "block" : "hidden"} hidden lg:block col-span-3 bg-gray-200 `}>

//             </div>
//         </div>

//     );
// }

// export default StudentDashboardPage;

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DrawerSidebar from "../../Components/DashBoardComponents/Student/DrawerSidebar";
import SideBar from "../../Components/DashBoardComponents/Student/SideBar";
import CenterComponent from "../../Components/DashBoardComponents/Student/CenterComponent";
import Navbar from "../../Components/DashBoardComponents/Student/Navbar";
import UploadCourses from "../Student/courses/UploadCourses";
import MyCertificates from "../Student/certificates/MyCertificates";

const StudentDashboardPage = () => {
    const [mobileDrawer, setMobileDrawer] = useState(false)
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
                    </Routes>
                </div>
            </div>

        </div>
    )
}

export default StudentDashboardPage;