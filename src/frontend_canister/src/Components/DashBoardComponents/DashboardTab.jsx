import React, { useState } from "react";
import DashboardLeftTopPanel from "./components/DashboardLeftTopPanel";
import DashboardLeftTop2Panel from "./components/DashboardLeftTop2Panel";
import DashboardRecommededCourse from "./components/DashboardRecommededCourse";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DashboardOngoingCourseComponent from "./components/DashboardOngoingCourseComponent";
import DashboardMobileTabPanel from "./components/DashboardMobileTabPanel";

const DashboardTab = () => {
  const [value, onChange] = useState(new Date());
  return (
    <>
      <div className="relative justify-start hidden w-full lg:flex px-14">
        <div className="w-3/5">
          <div className="flex flex-col items-start justify-start gap-8">
            <DashboardLeftTopPanel />
            <DashboardLeftTop2Panel />
          </div>
          <div>
            <div className="flex flex-col items-start justify-start gap-2 my-4 mt-10">
              <div className="flex items-center justify-around w-full">
                <div className="flex justify-between w-full">
                  <h1 className="text-xl font-extrabold">
                    Recommended Courses
                  </h1>
                  <h4 className="text-sm font-extrabold text-[#925FE2] cursor-pointer">
                    See All
                  </h4>
                </div>
              </div>
              <div className="w-full my-4">
                <DashboardRecommededCourse />
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 px-14">
          <div className="flex flex-col items-start justify-start">
            <div className="flex">
              <h1 className="text-xl font-extrabold">My Schedule</h1>
            </div>
            <div className="my-4">
              <Calendar onChange={onChange} value={value} className="w-full" />
            </div>
          </div>
          <div>
            <div className="flex">
              <h1 className="my-2 text-xl font-extrabold">
                My Ongoing Courses
              </h1>
            </div>
            <div className="flex items-center justify-start my-4">
              <DashboardOngoingCourseComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="relative justify-start w-full px-4 lg:hidden">
        <div className="w-full">
          <div className="flex flex-col items-start justify-start gap-8">
            <DashboardLeftTopPanel />
            <DashboardLeftTop2Panel />
          </div>
          <div className="flex items-center justify-start">
            <h1 className="my-5 text-xl font-extrabold">Recommended Courses</h1>
          </div>
          <div>
            <DashboardMobileTabPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTab;
