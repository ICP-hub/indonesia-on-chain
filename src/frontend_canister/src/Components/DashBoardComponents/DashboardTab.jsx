import React, { useState, useEffect } from "react";
import DashboardLeftTopPanel from "./components/DashboardLeftTopPanel";
import DashboardLeftTop2Panel from "./components/DashboardLeftTop2Panel";
import DashboardRecommededCourse from "./components/DashboardRecommededCourse";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DashboardOngoingCourseComponent from "./components/DashboardOngoingCourseComponent";
import DashboardMobileTabPanel from "./components/DashboardMobileTabPanel";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useAuth } from "../utils/useAuthClient";
import Loader from "../Loader/Loader";

const DashboardTab = () => {
  const dispatch = useDispatch();
  const [value, onChange] = useState(new Date());
  const { contentActor } = useAuth();
  const [Loading, setLoading] = useState(true);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

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
                {Loading ? (
                  <Loader />
                ) : (
                  <DashboardRecommededCourse recommendedCourses={recommendedCourses} />
                )}

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
