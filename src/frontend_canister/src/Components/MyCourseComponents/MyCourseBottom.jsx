import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CiAlarmOn } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import "../../../assets/main.css";
import DashboardOngoingCourseComponent from "../DashBoardComponents/components/DashboardOngoingCourseComponent";
import DashboardRecommededCourse from "../DashBoardComponents/components/DashboardRecommededCourse";
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
        console.log("courses recived as from backend", user);
        const courses = user.leaf.keyvals[0][0].slice(1);
        let number = parseInt(user.leaf.size);
        console.log(number);

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
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center">
        <Tabs className="pb-8">
          <TabList className="flex gap-2 p-1 m-1 space-x-1 rounded-xl">
            <Tab className="w-full px-4 py-3 text-sm font-medium leading-5 text-center text-gray-600 bg-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60 react-tabs__tab--selected:bg-[#7B61FF] react-tabs__tab--selected:text-white">
              My Courses
            </Tab>
            <Tab className="w-full px-4 py-3 text-sm font-medium leading-5 text-center text-gray-600 bg-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60 react-tabs__tab--selected:bg-[#7B61FF] react-tabs__tab--selected:text-white">
              Recommended
            </Tab>
          </TabList>

          <TabPanel>
            <div className="flex items-center justify-center w-full my-8">
              <DashboardOngoingCourseComponent />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex items-center justify-center w-full my-8">
              {Loading ? (
                <Loader />
              ) : (
                <DashboardRecommededCourse recommendedCourses={recommendedCourses} />
              )}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MyCourseBottom;
