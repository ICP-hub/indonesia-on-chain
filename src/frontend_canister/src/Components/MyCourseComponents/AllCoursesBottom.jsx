import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CiAlarmOn } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import "../../../assets/main.css";
const MyCourseBottom = () => {
  const [activeTab, setActiveTab] = useState(-1);

  const handleClick = (index) => {
    setActiveTab(index);
  };
  return (
    <div>
      {/* Mobile view */}
      <div className="md2:hidden px-[25px]">
        <p className="font-bold text-black text-[22px] pb-[22px]"> Courses</p>
        <Tabs className="flex flex-col pt-[35px] bg-white rounded-lg">
          <TabList className="flex px-[5px] pb-[30px] pt-[10px] gap-5">
            <Tab
              className={`px-3 text-grey ${
                activeTab === 0
                  ? "text-purple-500 pb-5 border-b-2 border-purple-500"
                  : ""
              }`}
              onClick={() => handleClick(0)}
            >
              In Progress
            </Tab>
            <Tab
              className={`px-3 text-grey ${
                activeTab === 1
                  ? "text-purple-500 pb-5 border-b-2 border-purple-500"
                  : ""
              }`}
              onClick={() => handleClick(1)}
            >
              Completed
            </Tab>
            <Tab
              className={`px-3 text-grey ${
                activeTab === 2
                  ? "text-purple-500 pb-5 border-b-2 border-purple-500"
                  : ""
              }`}
              onClick={() => handleClick(2)}
            >
              All
            </Tab>
          </TabList>
          <div className="border-b border-gray-300"></div>
          <TabPanel>
            <div className="flex flex-col gap-2 px-[15px] py-[10px]">
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#CBD1FF] flex justify-center items-center rounded">
                      <img
                        className="h-[121px] w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#D4DDFF] h-2 w-full rounded-full">
                        <div
                          className="bg-[#B1B7F1] h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">68%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#FFE1CB] flex justify-center items-center rounded">
                      <img
                        className="h-[121px] w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#FFE1CB] h-2 w-full rounded-full">
                        <div
                          className="bg-[#F9BB8F] h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">68%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="md2:bg-[#C5EAF2] flex justify-center items-center rounded">
                      <img
                        className="h-[121px] w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

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
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">68%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#CBD1FF] flex justify-center items-center rounded">
                      <img
                        className="h-[121px] w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#D4DDFF] h-2 w-full rounded-full">
                        <div
                          className="bg-[#B1B7F1] h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">68%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#FFE1CB] flex justify-center items-center rounded">
                      <img
                        className="h-[121px] w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#FFE1CB] h-2 w-full rounded-full">
                        <div
                          className="bg-[#F9BB8F] h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">68%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#C5EAF2] flex justify-center items-center rounded">
                      <img
                        className="h-[121px] w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

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
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">68%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-2 px-[15px]  py-[10px]">
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#CBD1FF] flex justify-center items-center rounded">
                      <img
                        className="h-[121px] w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#D4DDFF] h-2 w-full rounded-full">
                        <div
                          className="bg-[#B1B7F1] h-2 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">100%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#FFE1CB] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#FFE1CB] h-2 w-full rounded-full">
                        <div
                          className="bg-[#F9BB8F] h-2 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">100%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#C5EAF2] flex justify-center items-center rounded">
                      <img
                        className="h-[121px] w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#D1F7FF] h-2 w-full rounded-full">
                        <div
                          className="bg-[#96DAE9] h-2 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">100%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#CBD1FF] flex justify-center items-center rounded">
                      <img
                        className="h-[121px] w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#D4DDFF] h-2 w-full rounded-full">
                        <div
                          className="bg-[#B1B7F1] h-2 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">100%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#FFE1CB] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#FFE1CB] h-2 w-full rounded-full">
                        <div
                          className="bg-[#F9BB8F] h-2 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">100%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#C5EAF2] flex justify-center items-center rounded">
                      <img
                        className="h-[121px] w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#D1F7FF] h-2 w-full rounded-full">
                        <div
                          className="bg-[#96DAE9] h-2 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">100%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-2 px-[15px] py-[10px]">
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#CBD1FF] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <button className="bg-[#7F95DE] text-white  font-[400] font-[Poppins] py-2 px-8 m-3 rounded">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#FFE1CB] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <button className="bg-[#F9BB8F] text-white  font-[400] font-[Poppins] py-2 px-8 m-3 rounded">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#C5EAF2] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <button className="bg-[#96DAE9] text-white  font-[400] font-[Poppins] py-2 px-8 m-3 rounded">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#CBD1FF] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <button className="bg-[#7F95DE] text-white  font-[400] font-[Poppins] py-2 px-8 m-3 rounded">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#FFE1CB] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <button className="bg-[#F9BB8F] text-white  font-[400] font-[Poppins] py-2 px-8 m-3 rounded">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <div className="pt-[10px] pb-[10px] px-[10px]">
                  <div className="flex flex-col h-[278px] w-full bg-white shadow-lg">
                    <div className="bg-[#C5EAF2] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <button className="bg-[#96DAE9] text-white  font-[400] font-[Poppins] py-2 px-8 m-3 rounded">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
      {/* Normal */}
      <div className="dxs:hidden md2:flex w-full pt-[35px]">
        <Tabs className="md2:flex flex-col pt-[25px] bg-white rounded-lg">
          <TabList className="flex px-[40px] pb-[30px] pt-[10px] gap-5">
            <Tab
              className={`px-5 text-grey ${
                activeTab === 0
                  ? "text-purple-500 pb-5 border-b-2 border-purple-500"
                  : ""
              }`}
              onClick={() => handleClick(0)}
            >
              In Progress
            </Tab>
            <Tab
              className={`px-5 text-grey ${
                activeTab === 1
                  ? "text-purple-500 pb-5 border-b-2 border-purple-500"
                  : ""
              }`}
              onClick={() => handleClick(1)}
            >
              {" "}
              Completed{" "}
            </Tab>{" "}
            <Tab
              className={`px-5 text-grey ${
                activeTab === 2
                  ? "text-purple-500 pb-5 border-b-2 border-purple-500"
                  : ""
              }`}
              onClick={() => handleClick(2)}
            >
              {" "}
              All{" "}
            </Tab>{" "}
          </TabList>{" "}
          <div className="border-b border-gray-300"></div>{" "}
          <TabPanel>
            {" "}
            <div className="flex flex-wrap gap-3 px-[50px] ml-[20px] py-[10px]">
              {" "}
              <div className="w-[32%] mb-3">
                {" "}
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[300px] bg-white shadow-lg">
                    <div className="md2:bg-[#CBD1FF] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path{" "}
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>{" "}
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#D4DDFF] h-2 w-full rounded-full">
                        <div
                          className="bg-[#B1B7F1] h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">68%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[300px] bg-white shadow-lg">
                    <div className="md2:bg-[#FFE1CB] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#FFE1CB] h-2 w-full rounded-full">
                        <div
                          className="bg-[#F9BB8F] h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">68%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[300px] bg-white shadow-lg">
                    <div className="md2:bg-[#C5EAF2] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

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
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">68%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[300px] bg-white shadow-lg">
                    <div className="md2:bg-[#CBD1FF] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>
                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>
                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#D4DDFF] h-2 w-full rounded-full">
                        <div
                          className="bg-[#B1B7F1] h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">68%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[300px] bg-white shadow-lg">
                    <div className="md2:bg-[#FFE1CB] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#FFE1CB] h-2 w-full rounded-full">
                        <div
                          className="bg-[#F9BB8F] h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">68%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[300px] bg-white shadow-lg">
                    <div className="md2:bg-[#C5EAF2] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

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
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">68%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-wrap gap-3 px-[50px] ml-[10px] py-[10px]">
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[295px] bg-white shadow-lg">
                    <div className="md2:bg-[#CBD1FF] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#D4DDFF] h-2 w-full rounded-full">
                        <div
                          className="bg-[#B1B7F1] h-2 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">100%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[295px] bg-white shadow-lg">
                    <div className="md2:bg-[#FFE1CB] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#FFE1CB] h-2 w-full rounded-full">
                        <div
                          className="bg-[#F9BB8F] h-2 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">100%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[295px] bg-white shadow-lg">
                    <div className="md2:bg-[#C5EAF2] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#D1F7FF] h-2 w-full rounded-full">
                        <div
                          className="bg-[#96DAE9] h-2 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">100%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[295px] bg-white shadow-lg">
                    <div className="md2:bg-[#CBD1FF] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#D4DDFF] h-2 w-full rounded-full">
                        <div
                          className="bg-[#B1B7F1] h-2 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">100%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[268px] md2:w-[295px] bg-white shadow-lg">
                    <div className="md2:bg-[#FFE1CB] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[12px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#FFE1CB] h-2 w-full rounded-full">
                        <div
                          className="bg-[#F9BB8F] h-2 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">100%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[295px] bg-white shadow-lg">
                    <div className="md2:bg-[#C5EAF2] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <div className="pt-[5px] px-[5px]">
                      <div className="bg-[#D1F7FF] h-2 w-full rounded-full">
                        <div
                          className="bg-[#96DAE9] h-2 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-[#a1a1a1] text-right pt-[5px]">
                      <p className="mr-2">
                        Completed:{" "}
                        <span className="font-bold text-[#010101]">100%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-wrap gap-4 px-[40px] ml-[10px] py-[10px]">
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[300px] bg-white shadow-lg">
                    <div className="md2:bg-[#CBD1FF] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <button className="bg-[#7F95DE] text-white  font-[400] font-[Poppins] py-2 px-8 m-3 rounded">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[300px] bg-white shadow-lg">
                    <div className="md2:bg-[#FFE1CB] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <button className="bg-[#F9BB8F] text-white  font-[400] font-[Poppins] py-2 px-8 m-3 rounded">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[300px] bg-white shadow-lg">
                    <div className="md2:bg-[#C5EAF2] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <button className="bg-[#96DAE9] text-white  font-[400] font-[Poppins] py-2 px-8 m-3 rounded">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[300px] bg-white shadow-lg">
                    <div className="md2:bg-[#CBD1FF] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <button className="bg-[#7F95DE] text-white  font-[400] font-[Poppins] py-2 px-8 m-3 rounded">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[300px] bg-white shadow-lg">
                    <div className="md2:bg-[#FFE1CB] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <button className="bg-[#F9BB8F] text-white  font-[400] font-[Poppins] py-2 px-8 m-3 rounded">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[32%] mb-3">
                <div className="md2:pt-[10px] md2:pb-[10px] flex">
                  <div className="flex flex-col md2:h-[278px] md2:w-[300px] bg-white shadow-lg">
                    <div className="md2:bg-[#C5EAF2] flex justify-center items-center rounded">
                      <img
                        className="md2:h-[121px] md2:w-[131px]"
                        src="surr8091.png"
                        alt="Image"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#000000] text-[14px] font-[Poppins] pt-[5px] md2:px-3">
                        Development
                      </p>
                      <div className="flex">
                        <CiAlarmOn
                          style={{
                            fontSize: "20px",
                            marginleft: "5px",
                            margintop: "5px",
                          }}
                        ></CiAlarmOn>
                        <p>45 min</p>
                      </div>
                    </div>

                    <p className="text-[#000000] text-[11px] font-[Poppins] pt-[5px] md2:px-3">
                      Skill Path: A Design Database with Skill Path
                    </p>
                    <div className="flex ml-[5px] mt-[5px]">
                      <AiOutlineUser
                        style={{
                          fontSize: "20px",
                          marginleft: "5px",
                          margintop: "15px",
                        }}
                      />
                      <p className="text-[#939393] text-[13px] font-[Poppins] font-[400] pt-[5px] md2:px-1">
                        Professor Name
                      </p>
                    </div>

                    <button className="bg-[#96DAE9] text-white  font-[400] font-[Poppins] py-2 px-8 m-3 rounded">
                      Enroll{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MyCourseBottom;
