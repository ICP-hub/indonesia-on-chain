import React from "react";
import MyCoursesTop from "./MyCoursesTop";
import MyCourseBottom from "./MyCourseBottom";

const MyCourses = () => {
  return (
    <div className="pt-[40px] flex flex-col pb-[30px] dxs:px-[5px] md2:px-[55px] w-full">
      <MyCoursesTop />
      <MyCourseBottom></MyCourseBottom>
    </div>
  );
};

export default MyCourses;
