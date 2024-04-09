import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CiAlarmOn } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import "../../../assets/main.css";
import DashboardRecommededCourse from "../DashBoardComponents/components/DashboardRecommededCourse";
import MyCourseInProgressCard from "./MyCourseInProgressCard";
import Loader from "../Loader/Loader";
import { useAuth } from "../utils/useAuthClient";
const MyCourseBottom = () => {
  const { contentActor } = useAuth();
  const [activeTab, setActiveTab] = useState(-1);
  const [Loading, setLoading] = useState(true);
  // const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [countcourse, setcountcourse] = useState([0]);

  const handleClick = (index) => {
    setActiveTab(index);
  };



  useEffect(() => {
    // dispatch({type:'CHECK_USER_PRESENT'});
    const fetchData = async () => {
      try {
        const user = await contentActor.getallCourse();
        // console.log("courses recived as from backend", user);
        const courses = user.leaf.keyvals[0][0].slice(1);
        let number = parseInt(user.leaf.size);
        const newData = [];
        setcountcourse(number);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);
  return (
    <div className="flex justify-start items-center w-full">
      <div className="w-full flex justify-start items-center">
        <Tabs className="pb-8 w-full">
          <TabList className="w-full flex lg:flex flex-wrap gap-5 p-1 m-1 space-x-1 rounded-xl border-b-2 newTabCss justify-start items-center md:grid md:grid-cols-2 sm:grid sm:grid-cols-2">
            <Tab className="whitespace-nowrap bg-transparent p-3 cursor-pointer">
              In Progress
            </Tab>
            <Tab className="whitespace-nowrap bg-transparent p-3 cursor-pointer">
              Completed
            </Tab>
            <Tab className="whitespace-nowrap bg-transparen p-3 cursor-pointer">All({countcourse})</Tab>
          </TabList>
          <div className="w-full my-5">
            <TabPanel>
              <div className="flex items-center justify-center w-full my-8">
                <MyCourseInProgressCard tabType={"Process"}  />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex items-center justify-center w-full my-8">
                <MyCourseInProgressCard tabType={"Complete"} />
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
