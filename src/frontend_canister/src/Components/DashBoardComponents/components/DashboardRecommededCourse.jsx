import React from "react";
import RecommededCourseCard from "./RecommededCourseCard";
import mindImg from "../../../../assets/images/surr8091.png";

const DashboardRecommededCourse = ({ recommendedCourses }) => {
  console.log("Courses recieved", recommendedCourses);


  return (
    <div>
      <div className={`bg-white rounded-lg`}>
        <div className="flex flex-col gap-1 px-6 py-6 lg:px-10">
          {recommendedCourses.map((SingleCourseData, key) => {
            console.log("key-->",key)
            return (
              <RecommededCourseCard
                SingleCourseData={SingleCourseData}
                index={key}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardRecommededCourse;
