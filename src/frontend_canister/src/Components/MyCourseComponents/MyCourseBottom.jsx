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
  const [recommendedCourses, setRecommendedCourses] = useState([]);

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
        // console.log(number);

        const newData = [];
        for (let i = 0; i < number; i++) {

          let time = 0;
          let newCourse = user.leaf.keyvals;
          while (time < i) {
            newCourse = newCourse[0][1];
            time++;
          }
          newCourse = newCourse[0][0][1];
          newData.push(newCourse);
        }
        setRecommendedCourses(newData);
        setLoading(false);
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
