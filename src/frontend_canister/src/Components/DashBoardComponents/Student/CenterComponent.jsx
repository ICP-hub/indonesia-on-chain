import React from "react";
import RecommendedCourses from "../../StudentComponents/Courses";
import DashboardTab from "../DashboardTab";
import MyCourses from "../Desktop22";
const CenterComponent = () => {
  return (
    <div className="w-full">
      <div className="w-full h-screen">
        <DashboardTab />
        {/* <MYCourses/> */}
      </div>
    </div>
  );
};

export default CenterComponent;
