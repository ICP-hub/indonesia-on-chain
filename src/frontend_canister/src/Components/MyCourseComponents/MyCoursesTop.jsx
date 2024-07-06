import React, { useEffect, useState } from "react";
import { RxReload, RxCheckCircled, RxClock } from "react-icons/rx";
import { CiMedal } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { useAuth } from "../utils/useAuthClient";
import { FaDatabase } from "react-icons/fa";

const MyCoursesTop = () => {
  const { t } = useTranslation();
  const [dashboardData, setDashboardData] = useState({});
  console.log("My dashboard data:", dashboardData);
  const { actor } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await actor.get_user_dashboard();
        console.log("dashboard data response", response)
        setDashboardData(response.ok || {});
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [actor]);

  const ongoingCourse = dashboardData?.ongoingCourse ? Number(dashboardData.ongoingCourse) : 0;
  const completedCourse = dashboardData?.completedCourse ? Number(dashboardData.completedCourse) : 0;
  
  const totalCourses = ongoingCourse + completedCourse;

  const courseSections = [
    {
      id: "inProgress",
      bgColor: "#ECE9FB",
      icon: <RxReload className="w-5 h-5 text-purple-600" />,
      title: t("MyCoursesTop.inProgress.title"),
      detail: dashboardData?.ongoingCourse ? Number(dashboardData.ongoingCourse) : 0,
    },
    {
      id: "completed",
      bgColor: "#E9F6EC",
      icon: <RxCheckCircled className="w-5 h-5 text-green-600" />,
      title: t("MyCoursesTop.completed.title"),
      detail: dashboardData?.completedCourse ? Number(dashboardData.completedCourse) : 0,
    },
    {
      id: "time",
      bgColor: "#FFF8EB",
      icon: <FaDatabase className="w-5 h-5 text-yellow-600"/>,
      title: t("MyCoursesTop.All.title"),
      detail: totalCourses,
    },
    {
      id: "certificates",
      bgColor: "#FFF0FB",
      icon: <CiMedal className="w-5 h-5 text-pink-600" />,
      title: t("MyCoursesTop.certificates.title"),
      detail: dashboardData?.userMintedCertificate ? Number(dashboardData.userMintedCertificate) : 0,
    },
  ];
  return (
    <div>
      {/* Normal view */}
      <div className="flex hidden  md:flex xs:hidden dxs:hidden md:block justify-between rounded-lg w-full md2:px-[50px] bg-white h-[90px] pt-[15px] pb-[30px]">
        {courseSections.map((section, index) => (
          <React.Fragment key={section.id}>
            {index !== 0 && (
              <div className="border-l border-gray-300 h-[70px]"></div>
            )}
            <div className="flex gap-2">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full shadow-md"
                style={{ backgroundColor: section.bgColor }}
              >
                {React.cloneElement(section.icon, {
                  className: `${section.icon.props.className} w-5 h-5 rounded-full font-bold`,
                })}
              </div>
              <div className="flex flex-col">
                <p>{section.title}</p>
                <p className="font-bold text-black"><p dangerouslySetInnerHTML={{ __html: section.detail }}></p></p>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* Mobile view */}
      <div className="md2:hidden lg:hidden md:hidden dxs:flex dxs:flex-wrap gap-2 justify-between rounded-lg w-full px-[10px] pt-[15px] pb-[30px]">
        {courseSections.map((section) => (
          <div
            key={section.id}
            className="  dxs:w-[47%] xs:w-[47%] sm:w-[47%]  md:w-[47%]  mb-3 h-[70px] bg-white rounded-lg"
          >
            <div className="flex justify-center gap-2">
              <div
                className="flex mt-[10px] justify-center items-center  w-10 h-10 rounded-full"
                style={{ backgroundColor: section.bgColor }}
              >
                {React.cloneElement(section.icon, {
                  className: `${section.icon.props.className} w-3 h-3`,
                })}
              </div>
              <div className="flex flex-col mt-[5px]">
                <p>{section.title}</p>
                <p className="font-bold text-black">{section.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCoursesTop;
