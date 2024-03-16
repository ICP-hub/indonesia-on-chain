import React from "react";
import RecommendedCourses from "../../StudentComponents/Courses";
import DashboardTab from "../DashboardTab";
import MyCourses from "../Desktop22";
const CenterComponent = () => {
  return (
    <div>
      <div className="h-screen w-full">
        <DashboardTab />
        {/* <MYCourses/> */}
      </div>
    </div>
  );
};

export default CenterComponent;
