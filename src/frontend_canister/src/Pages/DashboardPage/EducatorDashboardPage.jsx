import React from 'react';
import EducatorSideBar from '../../Components/DashBoardComponents/educator/SideBar';

const EducatorDashboardPage = () => {
    return (
        <>
            <div className="container h-screen bg-[#EFF1FF]">
                <div className="w-2/12 bg-white h-full">
                    <EducatorSideBar />
                </div>
                <div className="w-8/12"></div>
                <div className="w-2/12"></div>
            </div>
        </>
    )
}

export default EducatorDashboardPage;