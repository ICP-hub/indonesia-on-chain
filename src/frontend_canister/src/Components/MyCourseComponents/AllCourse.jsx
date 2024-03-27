import React from "react";
import MyCoursesTop from "./MyCoursesTop";
import AllCoursesBottom from "./AllCoursesBottom";

const Allcourse = () => {
  return (
    <div className="pt-[50px] flex flex-col pb-[30px] px-[35px] w-full">
      <div className="px-[20px]">
        <MyCoursesTop />
      </div>
      <AllCoursesBottom></AllCoursesBottom>
    </div>
  );
};

export default Allcourse;