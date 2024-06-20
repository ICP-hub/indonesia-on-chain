import React from "react";
import RecommededCourseCard from "./RecommededCourseCard";
import mindImg from "../../../../assets/images/surr8091.png";
import NotAvailable from "../../notAvailable/NotAvailable";

const DashboardRecommededCourse = ({ recommendedCourses }) => {
  console.log("Courses recieved", recommendedCourses);

  return (
    <div>
      {recommendedCourses.length > 0 ? (
        <div className={`bg-white rounded-lg`}>
          <div className="flex flex-col gap-1 px-6 py-6 lg:px-10">
            {recommendedCourses.map((SingleCourseData, key) => {
              console.log("key-->", key);
              return (
                <RecommededCourseCard
                  key={key}
                  SingleCourseData={SingleCourseData}
                  index={key}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="text-center">
            <NotAvailable Type={"Notfound"} />
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default DashboardRecommededCourse;
