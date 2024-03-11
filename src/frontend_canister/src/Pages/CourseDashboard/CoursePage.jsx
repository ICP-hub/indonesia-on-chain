import React from 'react'
import StudentSideBar from '../../Components/DashBoardComponents/Student/SideBar';

function CoursePage() {
    return (
        <div className="grid grid-cols-12 h-screen">
            <div className="col-span-2 bg-white text-white justify-start w-full">
                <StudentSideBar />
            </div>
            <div className="col-span-10">
                {/* <CenterComponent /> */}
            </div>
            <div className={`${location.pathname === "/student-dashboard" ? "block" : "hidden"} hidden lg:block col-span-3 bg-gray-200 `}>

            </div>
        </div>
    )
}


export default CoursePage;