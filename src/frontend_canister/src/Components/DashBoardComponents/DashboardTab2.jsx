import React, { useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import Calendar from "react-calendar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import StarIcon from "@mui/icons-material/Star";
const DashboardTab = () => {
  const [view, setView] = useState("default");
  const isXlScreen = useMediaQuery("(min-width: 1440px)");
  const [selectedComponent, setSelectedComponent] = useState("component1");
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };
  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };
  return (
    <div className="flex bg-[#EFF1FF]">
      <div className=" border border-black w-[100%] lg1:w-[72%]  flex flex-col md:flex">
        <div className="border border-#410ef8 md:flex justify-between px-10 md2:pt-[25px] dxs:pt-[35px]">
          {/* Mobile view */}
          <div className="md2:hidden">
            <div className="flex gap-[23px] pt-[5px] ">
              <div>
                <img src="Rectangle196.png" alt="" />
              </div>
              <button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2379 23.3503C18.8229 23.3503 23.3505 18.8227 23.3505 13.2376C23.3505 7.65258 18.8229 3.125 13.2379 3.125C7.65282 3.125 3.12524 7.65258 3.12524 13.2376C3.12524 18.8227 7.65282 23.3503 13.2379 23.3503Z"
                    stroke="#00227A"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.2703 20.7949L24.2348 24.7493"
                    stroke="#00227A"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.25 9C20.25 7.20979 19.5388 5.4929 18.273 4.22703C17.0071 2.96116 15.2902 2.25 13.5 2.25C11.7098 2.25 9.9929 2.96116 8.72703 4.22703C7.46116 5.4929 6.75 7.20979 6.75 9C6.75 16.875 3.375 19.125 3.375 19.125H23.625C23.625 19.125 20.25 16.875 20.25 9Z"
                    stroke="#00227A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.4462 23.625C15.2484 23.966 14.9645 24.249 14.623 24.4457C14.2814 24.6425 13.8941 24.746 13.5 24.746C13.1058 24.746 12.7185 24.6425 12.377 24.4457C12.0354 24.249 11.7515 23.966 11.5537 23.625"
                    stroke="#00227A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="md2:pt-10 md2:px-12 dxs:pt-6 dxs:px-2 md2:flex dxs:pl-6">
          <div
            className=" md:flex flex rounded bg-FFEAE7 md2:w-[669px] md2:h-[233px]  dxs:w-[360px] dxs:[h-153px]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #7B61FF, #7B61FF, #a797f9)",
            }}
          >
            <div className="flex flex-col pl-30">
              <p className="pl-[30px] text-[#ffffff] font-[Poppins] md2:text-[17px] pt-[30px] dxs:text-[12px]">
                April 30 Tuesday
              </p>

              <div className="md2:font-[800] dxs:font-[500] font-bold font-[Poppins] text-[#ffffff] md2:text-[29px] md2:pt-[50px] pb-[2px] dxs:pt-[25px] pl-[30px] dxs:text-[16px]">
                Welcome Back, Name!{" "}
              </div>
              <p className="pl-[30px] md2:font-[350] dxs:font-[150] font-[Poppins] text-[#ffffff] md2:text-[18px] pb-30px dxs:text-[9px] dxs:pt-[5px] ">
                You’ve finished 85% of your weekly goal
              </p>
            </div>
            <img
              className="md2:w-[289px] md2:h-[170px] pt-[35px] md2:pl-[10px] dxs:w-[130px] dxs:h-[110px] dxs:pl-[10px] "
              src="graduation-cap 1.png"
              alt=""
            />
          </div>
        </div>

        <div className="dxs:px-[5px] flex justify-between md2:pt-5 md2:px-12 md:flex dxs:pt-[10px] dxs:pl-6">
          <div
            className="flex rounded md2:w-[669px] md2:h-[175px] md2:pl-[30px] dxs:pl-[20px] dxs:w-[360px] dxs:h-[170px]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #4992FE, #5480FE, #90acf8)",
            }}
          >
            <div className="md2:flex flex-col md2:pl-[30px]">
              <p className="md2:font-[800] dxs:font-[500] font-bold font-[Poppins] text-[#ffffff] text-[27px] dxs:text-[17px]  pt-[25px] ">
                Follow & Join us on
              </p>
              <div className="justify-between md2:flex dxs:hidden">
                <div className="flex-col md2:flex">
                  <div className="md2:flex pt-[10px] pb-[2px]">
                    <img
                      src="link-square.png"
                      className="w-[14px] h-[15px] pt-[4px] mr-[3px]"
                      alt=""
                    />
                    <div className="font-[200] font-bold font-[Poppins] text-[#ffffff] text-[15px] dxl:text-5xl pl-[2px]">
                      Indonesia OnChain
                    </div>
                  </div>
                  <div className="flex pt-[10px] pb-[2px]">
                    <img
                      src="link-square.png"
                      className="w-[14px] h-[15px] pt-[4px] mr-[3px]"
                      alt=""
                    />
                    <div className="font-[200] font-bold font-[Poppins] md2:text-[#ffffff] md2:text-[15px]  dxs:text-[10px] dxl:text-5xl ">
                      Disruptives and DFinity X
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-[50px]">
                  <div className="flex pt-[10px] pb-[2px]">
                    <img
                      src="link-square.png"
                      className="w-[14px] h-[15px] pt-[4px] mr-[3px]"
                      alt=""
                    />
                    <div className="font-[200] font-bold font-[Poppins] text-[#ffffff] text-[15px]  dxl:text-5xl ">
                      Instagram
                    </div>
                  </div>
                  <div className="flex pt-[10px] pb-[2px]">
                    <img
                      src="link-square.png"
                      className="w-[14px] h-[15px] pt-[4px] mr-[3px]"
                      alt=""
                    />
                    <div className="font-[200] font-bold font-[Poppins] text-[#ffffff] text-[15px] dxl:text-5xl ">
                      Telegram
                    </div>
                  </div>
                </div>
              </div>
              {/* Mobile view */}
              <div className="flex flex-col md2:hidden">
                <div className="flex flex-col">
                  <div className="flex pt-[10px] pb-[2px]">
                    <img
                      src="link-square.png"
                      className="w-[13px] h-[13px] pt-[4px] mr-[3px]"
                      alt=""
                    />
                    <div className="font-[150] font-[Poppins] text-[#ffffff] text-[12px] dxl:text-5xl pl-[2px]">
                      Indonesia OnChain
                    </div>
                  </div>
                  <div className="flex pt-[10px] pb-[2px]">
                    <img
                      src="link-square.png"
                      className="w-[13px] h-[13px] pt-[4px] mr-[3px]"
                      alt=""
                    />
                    <div className="font-[150]  font-[Poppins] text-[#ffffff] text-[12px]   dxl:text-5xl ">
                      Disruptives and DFinity X
                    </div>
                  </div>
                  <div className="flex pt-[10px] pb-[2px]">
                    <img
                      src="link-square.png"
                      className="w-[13px] h-[13px] pt-[4px] mr-[3px]"
                      alt=""
                    />
                    <div className="font-[150]  font-[Poppins] text-[#ffffff] text-[12px]">
                      Telegram
                    </div>
                  </div>
                </div>

                <div className="flex pt-[10px] pb-[2px]">
                  <img
                    src="link-square.png"
                    className="w-[13px] h-[13px] pt-[4px] mr-[3px]"
                    alt=""
                  />
                  <div className="font-[150] font-[Poppins] text-[#ffffff] text-[12px]">
                    Instagram
                  </div>
                </div>
              </div>
            </div>
            <img
              className="md2:w-[275px] md2:h-[157px] md2:pt-[2px] md2:pl-[50px] dxs:pr-[25px]  dxs:w-[170px] dxs:h-[130px] dxs:pt-[32px]"
              src="addnewgroup2872689-24094091.png"
              alt=""
            />
          </div>
        </div>
        <div className="dxs:hidden md2:flex justify-between pr-[36px] pt-[25px] px-[3px]">
          <p className="font-[Segoe UI] font-[600] text-xl text-[#2D6BE4] px-9 pb-[21px]">
            Recommended Courses
          </p>
          <div className="pt-[8px] pr-10">
            <button
              onClick={() => setView("allCourses")}
              className="text-[#2D6BE4] text-[15px] leading-[20px] font-[Segoe UI] font-[400] "
            >
              See All
            </button>
          </div>
        </div>
        {/* Mobile View */}
        <div className="dxs:flex pr-[36px] pt-[25px] px-[20px] md2:hidden ">
          <button
            className={`font-[Segoe UI] font-[600] text-[15px] ${
              selectedComponent === "component1"
                ? "text-white bg-[#2D6BE4]"
                : "text-[#2D6BE4] border border-gray-400 hover:bg-[#2D6BE4] hover:text-white hover:border-[#2D6BE4]"
            } mr-2 px-2 border rounded-md transition-colors duration-300`}
            onClick={() => handleComponentChange("component1")}
          >
            Recommended
          </button>
          <button
            className={`font-[Segoe UI] font-[600] text-[15px] ${
              selectedComponent === "component2"
                ? "text-white bg-[#2D6BE4]"
                : "text-[#2D6BE4] border border-gray-400 hover:bg-[#2D6BE4] hover:text-white hover:border-[#2D6BE4]"
            } px-4 pl-[14px] border rounded-md transition-colors duration-300`}
            onClick={() => handleComponentChange("component2")}
          >
            My Courses
          </button>
        </div>

        <Tabs className="dxs:flex pr-[36px] pt-[25px] px-[20px] md2:hidden ">
          <TabList>
            <Tab>Recommended </Tab>
            <Tab>My Courses</Tab>
          </TabList>

          <TabPanel>
            <div className="flex flex-col py-3 px-5 bg-[#e6f1fd]">
              <div className="bg-[#ffffff] rounded-[20px]">
                <div className="py-2 pl-3">
                  <div className="flex justify-between pl-5 md2:pt-8 dxs:pt-4 md2:px-4 dxs:px-2">
                    <div className=" bg-[#F2F4FD] rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] px-5 dxs:w-[340px] dxs:h-[120px] md2:mr-5">
                      <div className="md2:pt-[20px] md2:ml-[20px]">
                        <img
                          className="md2:h-[170px] md2:w-[280px] md2:pt-[10px] md2:ml-[20px]"
                          src="surr8091.png"
                          alt=""
                        />
                      </div>
                      <div className="md2:pt-[30px] md2:pb-[20px] md2:ml-[70px]">
                        <p className="md2:text-[#8095DE] font-[Poppins] md2:pb-[8px]">
                          12 th May
                        </p>
                        <p className="md2:text-[22px] md2:pb-[8px] text-[#8095DE] md2:font-[600] font-[Poppins]">
                          BlockChain Course
                        </p>
                        <p className="md2:text-[#8095DE] md2:pb-[8px] md2:text-[14px] font-[Poppins]">
                          Uncover the essentials of blockchain technology in
                          this comprehensive course. Develop practical skills
                          and gain insights into the decentralized future.
                        </p>
                        <div className="flex">
                          <StarIcon className="text-yellow-500" />
                          <p className="md2:text-[#8095DE] font-bold font-[Poppins] md2:ml-[5px]">
                            4.8
                          </p>{" "}
                          <span
                            className="md2:ml-3 md2:text-[#8095DE] font-bold md2:h-6 md2:w-6 md2:pb-[8px]"
                            style={{ marginBottom: "8px" }}
                          >
                            .
                          </span>
                          <p className="md2:text-[#8095DE] md2:font-[400] font-[Poppins]">
                            Intermediated
                          </p>
                          <button className="bg-[#7F95DE] text-white  md2:font-[400] font-[Poppins] py-2 px-8 rounded md2:ml-[90px]">
                            Enroll
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-2 pl-3">
                  <div className="flex justify-between pl-5 md2:pt-8 dxs:pt-4 md2:px-4 dxs:px-2">
                    <div className=" bg-[#ECF8F6] rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] px-5 dxs:w-[340px] dxs:h-[120px] md2:mr-5">
                      <div className="md2:pt-[20px] md2:ml-[20px]">
                        <img
                          className="md2:h-[170px] md2:w-[280px] md2:pt-[10px] md2:ml-[20px]"
                          src="surr8091.png"
                          alt=""
                        />
                      </div>
                      <div className="md2:pt-[30px] md2:pb-[20px] md2:ml-[70px]">
                        <p className="md2:text-[#6FC8BB] font-[Poppins] md2:pb-[8px]">
                          12 th May
                        </p>
                        <p className="md2:text-[22px] md2:pb-[8px] text-[#6FC8BB] md2:font-[600] font-[Poppins]">
                          BlockChain Course
                        </p>
                        <p className="md2:text-[#6FC8BB] md2:pb-[8px] md2:text-[14px] font-[Poppins]">
                          Uncover the essentials of blockchain technology in
                          this comprehensive course. Develop practical skills
                          and gain insights into the decentralized future.
                        </p>
                        <div className="flex">
                          <StarIcon className="text-yellow-500" />
                          <p className="md2:text-[#6FC8BB] font-bold font-[Poppins] md2:ml-[5px]">
                            4.8
                          </p>{" "}
                          <span
                            className="md2:ml-3 md2:text-[#6FC8BB] font-bold md2:h-6 md2:w-6 md2:pb-[8px] md2:mr-[3px]"
                            style={{ marginBottom: "8px" }}
                          >
                            .
                          </span>
                          <p className="md2:text-[#6FC8BB] md2:font-[400] font-[Poppins]">
                            Intermediated
                          </p>
                          <button className="bg-[#6FC8BB] text-white  md2:font-[400] font-[Poppins] py-2 px-8 rounded md2:ml-[90px]">
                            Enroll
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-2 pl-3">
                  <div className="flex justify-between pl-5 md2:pt-8 dxs:pt-4 md2:px-4 dxs:px-2">
                    <div className=" bg-[#FBF5FB] rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] px-5 dxs:w-[340px] dxs:h-[120px] md2:mr-5">
                      <div className="md2:pt-[20px] md2:ml-[20px]">
                        <img
                          className="md2:h-[170px] md2:w-[280px] md2:pt-[10px] md2:ml-[20px]"
                          src="surr8091.png"
                          alt=""
                        />
                      </div>
                      <div className="md2:pt-[30px] md2:pb-[20px] md2:ml-[70px]">
                        <p className="md2:text-[#DA9ED4] font-[Poppins] md2:pb-[8px]">
                          12 th May
                        </p>
                        <p className="md2:text-[22px] md2:pb-[8px] text-[#DA9ED4] md2:font-[600] font-[Poppins]">
                          BlockChain Course
                        </p>
                        <p className="md2:text-[#DA9ED4] md2:pb-[8px] md2:text-[14px] font-[Poppins]">
                          Uncover the essentials of blockchain technology in
                          this comprehensive course. Develop practical skills
                          and gain insights into the decentralized future.
                        </p>
                        <div className="flex">
                          <StarIcon className="text-yellow-500" />
                          <p className="md2:text-[#DA9ED4] font-bold font-[Poppins] md2:ml-[5px]">
                            4.8
                          </p>{" "}
                          <span
                            className="md2:ml-3 md2:text-[#DA9ED4] font-bold md2:h-6 md2:w-6 md2:pb-[8px] md2:mr-[3px]"
                            style={{ marginBottom: "8px" }}
                          >
                            .
                          </span>
                          <p className="md2:text-[#DA9ED4] md2:font-[400] font-[Poppins]">
                            Intermediated
                          </p>
                          <button className="bg-[#DA9ED4] text-white  md2:font-[400] font-[Poppins] py-2 px-8 rounded md2:ml-[90px]">
                            Enroll
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-2 pl-3">
                  <div className="flex justify-between pl-5 md2:pt-8 dxs:pt-4 md2:px-4 dxs:px-2">
                    <div className=" bg-[#F2F4FD] rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] px-5 dxs:w-[340px] dxs:h-[120px] md2:mr-5">
                      <div className="md2:pt-[20px] md2:ml-[20px]">
                        <img
                          className="md2:h-[170px] md2:w-[280px] md2:pt-[10px] md2:ml-[20px]"
                          src="surr8091.png"
                          alt=""
                        />
                      </div>
                      <div className="md2:pt-[30px] md2:pb-[20px] md2:ml-[70px]">
                        <p className="md2:text-[#8095DE] font-[Poppins] md2:pb-[8px]">
                          12 th May
                        </p>
                        <p className="md2:text-[22px] md2:pb-[8px] text-[#8095DE] md2:font-[600] font-[Poppins]">
                          BlockChain Course
                        </p>
                        <p className="md2:text-[#8095DE] md2:pb-[8px] md2:text-[14px] font-[Poppins]">
                          Uncover the essentials of blockchain technology in
                          this comprehensive course. Develop practical skills
                          and gain insights into the decentralized future.
                        </p>
                        <div className="flex">
                          <StarIcon className="text-yellow-500" />
                          <p className="md2:text-[#8095DE] font-bold font-[Poppins] md2:ml-[5px]">
                            4.8
                          </p>{" "}
                          <span
                            className="md2:ml-3 md2:text-[#8095DE] font-bold md2:h-6 md2:w-6 md2:pb-[8px] md2:mr-[3px]"
                            style={{ marginBottom: "8px" }}
                          >
                            .
                          </span>
                          <p className="md2:text-[#8095DE] md2:font-[400] font-[Poppins]">
                            Intermediated
                          </p>
                          <button className="bg-[#8095DE] text-white  md2:font-[400] font-[Poppins] py-2 px-8 rounded md2:ml-[90px]">
                            Enroll
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex py-3 px-5 bg-[#e6f1fd]">
              <div className="bg-[#ffffff] rounded-[20px]">
                <div className="py-2 pl-3">
                  <div className="flex justify-between pl-5 md2:pt-8 dxs:pt-4 md2:px-4 dxs:px-2">
                    <div className=" bg-[#F2F4FD] rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] px-5 dxs:w-[340px] dxs:h-[120px] md2:mr-5">
                      <div className="md2:pt-[20px] md2:ml-[20px]">
                        <img
                          className="md2:h-[170px] md2:w-[280px] md2:pt-[10px] md2:ml-[20px]"
                          src="surr8091.png"
                          alt=""
                        />
                      </div>
                      <div className="md2:pt-30px md2:pb-20px md2:ml-70px dxs:ml-0">
                        <p className="md2:text-#8095DE font-Poppins md2:pb-8px dxs:text-sm">
                          12th May
                        </p>
                        <p className="md2:text-22px md2:pb-8px text-#8095DE md2:font-600 font-Poppins dxs:text-lg">
                          BlockChain Course
                        </p>
                        <p className="md2:text-#8095DE md2:pb-8px md2:text-14px font-Poppins dxs:text-sm">
                          Uncover the essentials of blockchain technology in
                          this comprehensive course. Develop practical skills
                          and gain insights into the decentralized future.
                        </p>
                        <div className="flex items-center">
                          <StarIcon className="text-yellow-500" />
                          <p className="md2:text-#8095DE font-bold font-Poppins md2:ml-5px dxs:text-sm">
                            4.8
                          </p>
                          <span className="md2:ml-3 md2:text-#8095DE font-bold md2:h-6 md2:w-6 md2:pb-8px dxs:hidden">
                            .
                          </span>
                          <p className="md2:text-#8095DE md2:font-400 font-Poppins dxs:text-sm">
                            Intermediated
                          </p>
                          <button className="bg-#7F95DE text-white md2:font-400 font-Poppins py-2 px-8 rounded md2:ml-90px dxs:ml-0 md2:mr-0 md2:mt-4 dxs:mt-2">
                            Enroll
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-2 pl-3">
                  <div className="flex justify-between pl-5 md2:pt-8 dxs:pt-4 md2:px-4 dxs:px-2">
                    <div className=" bg-[#ECF8F6] rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] px-5 dxs:w-[340px] dxs:h-[120px] md2:mr-5">
                      <div className="md2:pt-[20px] md2:ml-[20px]">
                        <img
                          className="md2:h-[170px] md2:w-[280px] md2:pt-[10px] md2:ml-[20px]"
                          src="surr8091.png"
                          alt=""
                        />
                      </div>
                      <div className="md2:pt-[30px] md2:pb-[20px] md2:ml-[70px]">
                        <p className="md2:text-[#6FC8BB] font-[Poppins] md2:pb-[8px]">
                          12 th May
                        </p>
                        <p className="md2:text-[22px] md2:pb-[8px] text-[#6FC8BB] md2:font-[600] font-[Poppins]">
                          BlockChain Course
                        </p>
                        <p className="md2:text-[#6FC8BB] md2:pb-[8px] md2:text-[14px] font-[Poppins]">
                          Uncover the essentials of blockchain technology in
                          this comprehensive course. Develop practical skills
                          and gain insights into the decentralized future.
                        </p>
                        <div className="flex">
                          <StarIcon className="text-yellow-500" />
                          <p className="md2:text-[#6FC8BB] font-bold font-[Poppins] md2:ml-[5px]">
                            4.8
                          </p>{" "}
                          <span
                            className="md2:ml-3 md2:text-[#6FC8BB] font-bold md2:h-6 md2:w-6 md2:pb-[8px] md2:mr-[3px]"
                            style={{ marginBottom: "8px" }}
                          >
                            .
                          </span>
                          <p className="md2:text-[#6FC8BB] md2:font-[400] font-[Poppins]">
                            Intermediated
                          </p>
                          <button className="bg-[#6FC8BB] text-white  md2:font-[400] font-[Poppins] py-2 px-8 rounded md2:ml-[90px]">
                            Enroll
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-2 pl-3">
                  <div className="flex justify-between pl-5 md2:pt-8 dxs:pt-4 md2:px-4 dxs:px-2">
                    <div className=" bg-[#FBF5FB] rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] px-5 dxs:w-[340px] dxs:h-[120px] md2:mr-5">
                      <div className="md2:pt-[20px] md2:ml-[20px]">
                        <img
                          className="md2:h-[170px] md2:w-[280px] md2:pt-[10px] md2:ml-[20px]"
                          src="surr8091.png"
                          alt=""
                        />
                      </div>
                      <div className="md2:pt-[30px] md2:pb-[20px] md2:ml-[70px]">
                        <p className="md2:text-[#DA9ED4] font-[Poppins] md2:pb-[8px]">
                          12 th May
                        </p>
                        <p className="md2:text-[22px] md2:pb-[8px] text-[#DA9ED4] md2:font-[600] font-[Poppins]">
                          BlockChain Course
                        </p>
                        <p className="md2:text-[#DA9ED4] md2:pb-[8px] md2:text-[14px] font-[Poppins]">
                          Uncover the essentials of blockchain technology in
                          this comprehensive course. Develop practical skills
                          and gain insights into the decentralized future.
                        </p>
                        <div className="flex">
                          <StarIcon className="text-yellow-500" />
                          <p className="md2:text-[#DA9ED4] font-bold font-[Poppins] md2:ml-[5px]">
                            4.8
                          </p>{" "}
                          <span
                            className="md2:ml-3 md2:text-[#DA9ED4] font-bold md2:h-6 md2:w-6 md2:pb-[8px] md2:mr-[3px]"
                            style={{ marginBottom: "8px" }}
                          >
                            .
                          </span>
                          <p className="md2:text-[#DA9ED4] md2:font-[400] font-[Poppins]">
                            Intermediated
                          </p>
                          <button className="bg-[#DA9ED4] text-white  md2:font-[400] font-[Poppins] py-2 px-8 rounded md2:ml-[90px]">
                            Enroll
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-2 pl-3">
                  <div className="flex justify-between pl-5 md2:pt-8 dxs:pt-4 md2:px-4 dxs:px-2">
                    <div className=" bg-[#F2F4FD] rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] px-5 dxs:w-[340px] dxs:h-[120px] md2:mr-5">
                      <div className="md2:pt-[20px] md2:ml-[20px]">
                        <img
                          className="md2:h-[170px] md2:w-[280px] md2:pt-[10px] md2:ml-[20px]"
                          src="surr8091.png"
                          alt=""
                        />
                      </div>
                      <div className="md2:pt-[30px] md2:pb-[20px] md2:ml-[70px]">
                        <p className="md2:text-[#8095DE] font-[Poppins] md2:pb-[8px]">
                          12 th May
                        </p>
                        <p className="md2:text-[22px] md2:pb-[8px] text-[#8095DE] md2:font-[600] font-[Poppins]">
                          BlockChain Course
                        </p>
                        <p className="md2:text-[#8095DE] md2:pb-[8px] md2:text-[14px] font-[Poppins]">
                          Uncover the essentials of blockchain technology in
                          this comprehensive course. Develop practical skills
                          and gain insights into the decentralized future.
                        </p>
                        <div className="flex">
                          <StarIcon className="text-yellow-500" />
                          <p className="md2:text-[#8095DE] font-bold font-[Poppins] md2:ml-[5px]">
                            4.8
                          </p>{" "}
                          <span
                            className="md2:ml-3 md2:text-[#8095DE] font-bold md2:h-6 md2:w-6 md2:pb-[8px] md2:mr-[3px]"
                            style={{ marginBottom: "8px" }}
                          >
                            .
                          </span>
                          <p className="md2:text-[#8095DE] md2:font-[400] font-[Poppins]">
                            Intermediated
                          </p>
                          <button className="bg-[#8095DE] text-white  md2:font-[400] font-[Poppins] py-2 px-8 rounded md2:ml-[90px]">
                            Enroll
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <div className="md2:pt-[25px] flex flex-col mr-2 md2:flex dxs:hidden md2:pb-[10px]">
        <div className="flex justify-center"></div>
        <p className="text-[#000000] text-[18px] font-[Poppins] font-[600] md2:flex  pt-[29px] ml-3 dxs:hidden">
          My Schedule
        </p>
        <Calendar
          className="p-2 bg-white border border-gray-300 rounded-md"
          onChange={onChange}
          value={date}
        />
        <p className="text-[#000000] text-[14px] font-[Poppins] font-[600] flex justify-center pt-[45px] pb-10">
          My OnGoing Courses
        </p>
        <div className="md2:pt-[10px] md2:pb-[10px]">
          <div className="flex flex-col md2:h-[228px] md2:w-[321px] bg-white">
            <div className="md2:bg-[#abb5ff] flex justify-center items-center rounded md2:px-5">
              <img
                className="md2:h-[121px] md2:w-[131px]"
                src="surr8091.png"
                alt="Image"
              />
            </div>

            <p className="text-[#000000] text-[14px] font-[Poppins] font-[600] pt-[5px] md2:px-3">
              Blockchain Course
            </p>
            <p className="text-[#939393] text-[12px] font-[Poppins] font-[300] pt-[5px] md2:px-3">
              Professor Name
            </p>
            <div className="pt-[5px] px-[5px]">
              <div className="bg-[#D4DDFF] h-2 w-full rounded-full">
                <div
                  className="bg-[#95A1F6] h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div className="text-[#a1a1a1] text-right pt-[5px]">
              <p className="mr-2">
                Completed: <span className="font-bold text-[#010101]">68%</span>
              </p>
            </div>
          </div>
        </div>
        <div className="md2:pt-[10px] md2:pb-[10px]">
          {" "}
          <div className="flex flex-col md2:h-[228px] md2:w-[321px] bg-white">
            <div className="md2:bg-[#C5EAF2] flex justify-center items-center rounded md2:px-5">
              <img
                className="md2:h-[121px] md2:w-[131px]"
                src="surr8091.png"
                alt="Image"
              />
            </div>

            <p className="text-[#000000] text-[14px] font-[Poppins] font-[600] pt-[5px] md2:px-3">
              Blockchain Course
            </p>
            <p className="text-[#939393] text-[12px] font-[Poppins] font-[300] pt-[5px] md2:px-3">
              Professor Name
            </p>
            <div className="pt-[5px] px-[5px]">
              <div className="bg-[#D1F7FF] h-2 w-full rounded-full">
                <div
                  className="bg-[#96DAE9] h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div className="text-[#a1a1a1] text-right pt-[5px]">
              <p className="mr-2">
                Completed: <span className="font-bold text-[#010101]">68%</span>
              </p>
            </div>
          </div>
        </div>
        <div className="md2:pt-[10px] md2:pb-[10px]">
          <div className="flex flex-col md2:h-[228px] md2:w-[321px] bg-white">
            <div className="md2:bg-[#FFE1CB] flex justify-center items-center rounded md2:px-5">
              <img
                className="md2:h-[121px] md2:w-[131px] dxs:[50px] dxs:[60px]"
                src="surr8091.png"
                alt="Image"
              />
            </div>

            <p className="text-[#000000] text-[14px] font-[Poppins] font-[600] pt-[5px] md2:px-3">
              Blockchain Course
            </p>
            <p className="text-[#939393] text-[12px] font-[Poppins] font-[300] pt-[5px] md2:px-3">
              Professor Name
            </p>
            <div className="pt-[5px] px-[5px]">
              <div className="bg-[#FFE4D0] h-2 w-full rounded-full">
                <div
                  className="bg-[#F9BB8F] h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div className="text-[#a1a1a1] text-right pt-[5px]">
              <p className="mr-2">
                Completed: <span className="font-bold text-[#010101]">68%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardTab;
