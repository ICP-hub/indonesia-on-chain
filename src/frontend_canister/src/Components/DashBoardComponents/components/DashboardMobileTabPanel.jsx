import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DashboardOngoingCourseComponent from "./DashboardOngoingCourseComponent";
import DashboardRecommededCourse from "./DashboardRecommededCourse";
import { useTranslation } from "react-i18next";
const DashboardMobileTabPanel = () => {
  const { t } = useTranslation();
  return (
    <Tabs className="pb-8">
      <TabList className="flex gap-2 p-1 m-1 space-x-1 rounded-xl">
        <Tab className="w-full px-4 py-3 text-sm font-medium leading-5 text-center text-gray-600 bg-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60 react-tabs__tab--selected:bg-[#7B61FF] react-tabs__tab--selected:text-white">
        {t('DashboardComponents.MyCourses')}
        </Tab>
        <Tab className="w-full px-4 py-3 text-sm font-medium leading-5 text-center text-gray-600 bg-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60 react-tabs__tab--selected:bg-[#7B61FF] react-tabs__tab--selected:text-white">
        {t('DashboardComponents.Recommended')}
        </Tab>
      </TabList>

      <TabPanel>
        <div className="flex items-center justify-center w-full my-8">
          <DashboardOngoingCourseComponent />
        </div>
      </TabPanel>
      <TabPanel>
        <div className="flex items-center justify-center w-full my-8">
          <DashboardRecommededCourse />
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default DashboardMobileTabPanel;
