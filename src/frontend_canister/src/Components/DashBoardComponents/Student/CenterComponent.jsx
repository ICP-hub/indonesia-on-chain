import React from "react";
import RecommendedCourses from "../../StudentComponents/Courses";
import DashboardTab from "../DashboardTab";
import MyCourses from "../../MyCourses/Desktop22";
import Allcourses from "../../MyCourses/AllCourses";

const CenterComponent = () => {
  return (
    <div>
      <div className="h-screen w-full">
        {/* <DashboardTab /> */}
        {/* <MyCourses></MyCourses> */}
        <Allcourses></Allcourses>
      </div>
    </div>
  );
};

export default CenterComponent;
