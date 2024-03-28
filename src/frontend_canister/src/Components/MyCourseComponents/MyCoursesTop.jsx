import React from "react";
import { RxReload, RxCheckCircled, RxClock } from "react-icons/rx";
import { CiMedal } from "react-icons/ci";

const courseSections = [
  {
    id: "inProgress",
    bgColor: "#ECE9FB",
    icon: <RxReload className="w-5 h-5 text-purple-600" />,
    title: "In Progress",
    detail: "4 Courses",
  },
  {
    id: "completed",
    bgColor: "#E9F6EC",
    icon: <RxCheckCircled className="w-5 h-5 text-green-600" />,
    title: "Completed",
    detail: "18 Courses",
  },
  {
    id: "time",
    bgColor: "#FFF8EB",
    icon: <RxClock className="w-5 h-5 text-yellow-600" />,
    title: "Time",
    detail: "18h 30min",
  },
  {
    id: "certificates",
    bgColor: "#FFF0FB",
    icon: <CiMedal className="w-5 h-5 text-pink-600" />,
    title: "Certificates",
    detail: "11",
  },
];

const MyCoursesTop = () => {
  return (
    <div>
      {/* Normal view */}
      <div className="flex md:flex dxs:hidden justify-between rounded-lg w-full md2:px-[50px] bg-white h-[90px] pt-[15px] pb-[30px]">
        {courseSections.map((section, index) => (
          <React.Fragment key={section.id}>
            {index !== 0 && (
              <div className="border-l border-gray-300 h-[70px]"></div>
            )}
            <div className="flex gap-2">
              <div
                className="flex justify-center items-center w-12 h-12 rounded-full shadow-md"
                style={{ backgroundColor: section.bgColor }}
              >
                {React.cloneElement(section.icon, {
                  className: `${section.icon.props.className} w-5 h-5 rounded-full font-bold`,
                })}
              </div>
              <div className="flex flex-col">
                <p>{section.title}</p>
                <p className="font-bold text-black">{section.detail}</p>
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
            className="w-[47%] mb-3 h-[70px] bg-white rounded-lg"
          >
            <div className="flex gap-2 justify-center">
              <div
                className="flex mt-[10px] justify-center items-center w-10 h-10 rounded-full"
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
