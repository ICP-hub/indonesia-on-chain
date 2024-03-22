import React from "react";

const MyCoursesTop = () => {
  return (
    <div>
      {/* normal view */}
      <div className="flex md:flex dxs:hidden justify-between rounded-lg w-full md2:px-[50px] bg-white h-[90px] pt-[15px] pb-[30px]">
        <div className="flex gap-2">
          <div
            className="flex justify-center items-center w-12 h-12 rounded-full"
            style={{ backgroundColor: "#ECE9FB" }}
          >
            <img
              className="w-4 h-4 rounded-full"
              src="Reload.png"
              alt="Image"
            />
          </div>

          <div className="flex flex-col">
            <p text-grey>In Progress</p>
            <p className="font-bold text-black">4 Courses</p>
          </div>
        </div>
        <div className="border-l border-gray-300 h-[70px]"></div>
        <div className="flex gap-2">
          <div
            className="flex justify-center items-center w-12 h-12 rounded-full"
            style={{ backgroundColor: "#E9F6EC" }}
          >
            <img className="w-4 h-4 rounded-full" src="Done.png" alt="Image" />
          </div>
          <div className="flex flex-col">
            <p>Completed</p>
            <p className="font-bold text-black">18 Courses</p>
          </div>
        </div>
        <div className="border-l border-gray-300 h-[70px]"></div>
        <div className="flex gap-2">
          <div
            className="flex justify-center items-center w-12 h-12 rounded-full"
            style={{ backgroundColor: "#FFF8EB" }}
          >
            <img className="w-4 h-4 rounded-full" src="Time.png" alt="Image" />
          </div>
          <div className="flex flex-col">
            <p>Time</p>
            <p className="font-bold text-black">18h 30min</p>
          </div>
        </div>
        <div className="border-l border-gray-300 h-[70px]"></div>
        <div className="flex gap-2">
          <div
            className="flex justify-center items-center w-12 h-12 rounded-full"
            style={{ backgroundColor: "#FFF0FB" }}
          >
            <img
              className="w-4 h-4 rounded-full"
              src="Achievement.png"
              alt="Image"
            />
          </div>
          <div className="flex flex-col">
            <p>Certificates</p>
            <p className="font-bold text-black">11</p>
          </div>
        </div>
      </div>
      {/* mobile view */}
      <div className="md2:hidden lg:hidden md:hidden dxs:flex dxs:flex-wrap gap-2  justify-between rounded-lg w-full px-[10px]  pt-[15px] pb-[30px]">
        <div className="w-[47%] mb-3 h-[70px] bg-white rounded-lg ">
          <div className="flex gap-2 justify-center">
            <div
              className="flex mt-[10px] justify-center items-center w-10 h-10 rounded-full"
              style={{ backgroundColor: "#ECE9FB" }}
            >
              <img
                className="w-3 h-3 rounded-full"
                src="Reload.png"
                alt="Image"
              />
            </div>

            <div className="flex flex-col mt-[5px]">
              <p text-grey>In Progress</p>
              <p className="font-bold text-black">4 Courses</p>
            </div>
          </div>
        </div>

        <div className="w-[47%] mb-3 h-[70px] bg-white rounded-lg">
          <div className="flex gap-2 justify-center">
            <div
              className="mt-[10px] flex justify-center items-center w-10 h-10 rounded-full"
              style={{ backgroundColor: "#E9F6EC" }}
            >
              <img
                className="w-3 h-3 rounded-full"
                src="Done.png"
                alt="Image"
              />
            </div>
            <div className="flex flex-col mt-[5px]">
              <p>Completed</p>
              <p className="font-bold text-black">18 Courses</p>
            </div>
          </div>
        </div>

        <div className="w-[47%] mb-3 h-[70px] bg-white rounded-lg">
          <div className="flex gap-2 justify-center">
            <div
              className="mt-[10px] flex justify-center items-center w-10 h-10 rounded-full"
              style={{ backgroundColor: "#FFF8EB" }}
            >
              <img
                className="w-3 h-3 rounded-full"
                src="Time.png"
                alt="Image"
              />
            </div>
            <div className="flex flex-col mt-[5px]">
              <p>Time</p>
              <p className="font-bold text-black">18h 30min</p>
            </div>
          </div>
        </div>
        <div className="w-[47%] mb-3 h-[70px] bg-white rounded-lg">
          <div className="flex gap-2 justify-center">
            <div
              className="mt-[10px] flex justify-center items-center w-10 h-10 rounded-full"
              style={{ backgroundColor: "#FFF0FB" }}
            >
              <img
                className="w-3 h-3 rounded-full"
                src="Achievement.png"
                alt="Image"
              />
            </div>
            <div className="flex flex-col mt-[5px]">
              <p>Certificates</p>
              <p className="font-bold text-black">11</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesTop;
