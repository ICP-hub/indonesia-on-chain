import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CiAlarmOn } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import "../../../assets/main.css";
import DashboardRecommededCourse from "../DashBoardComponents/components/DashboardRecommededCourse";
import MyCourseInProgressCard from "./MyCourseInProgressCard";
const MyCourseBottom = () => {
  return (
    <div className="flex justify-start items-center w-full">
      <div className="w-full flex justify-start items-center">
        <Tabs className="pb-8 w-full">
          <TabList className="w-full flex gap-5 p-1 m-1 space-x-1 rounded-xl border-b-2 newTabCss justify-start items-center">
            <Tab className="whitespace-nowrap bg-transparent p-3 cursor-pointer">
              In Progress(10)
            </Tab>
            <Tab className="whitespace-nowrap bg-transparent p-3 cursor-pointer">
              Completed(5)
            </Tab>
            <Tab className="whitespace-nowrap bg-transparen p-3 cursor-pointer">All(5)</Tab>
          </TabList>
          <div className="w-full my-5">
            <TabPanel>
              <div className="flex items-center justify-center w-full my-8">
                <MyCourseInProgressCard tabType={"Process"} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex items-center justify-center w-full my-8">
                <MyCourseInProgressCard tabType={"Completed"} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex items-center justify-center w-full my-8">
                <MyCourseInProgressCard tabType={"All"} />
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default MyCourseBottom;
