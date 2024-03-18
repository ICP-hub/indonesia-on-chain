import React from 'react'

const MyCourses = () => {
  return (
    <div className="flex bg-[#e6f1fd]">
      <div className=" w-[100%] lg1:w-[72%]  flex flex-col md:flex">
        <div className="md:flex justify-between px-14 md2:pt-[25px] dxs:pt-[35px]">
          <p className=" md:flex md2:font-[600] font-[Segoe UI] md2:text-4xl text-[#000000] dxs:hidden">
            My Courses
          </p>
          <div className="dxs:hidden md2:flex gap-[23px] pt-[5px] ">
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
        <div className="md2:pt-10 md2:px-12 dxs:pt-6 dxs:px-4 md2:flex dxs:pl-6">
          <div
            className=" md:flex flex rounded-[20px] bg-[#FFEAE7]  w-[669px] h-[233px] md2:w-[669px] md2:h-[233px] dxs:w-[360px] dxs:h-[153px]"
            style={{
              backgroundImage: 'url("Rectangle2.png")',
              backgroundSize: "cover",
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

        <div className="dxs:pt-[6px] dxs:px-[5px] flex justify-between md2:pt-5 md2:px-12 md:flex dxs:pt-[10px] dxs:pl-6">
          <div
            className="flex rounded-[20px] bg-[#F3E7FF] md2:w-[669px] md2:h-[175px] md2:pl-[30px] dxs:pl-[20px]  dxs:w-[360px] dxs:h-[170px]"
            style={{
              backgroundImage: 'url("Rectangle197.png")',
              backgroundSize: "cover",
            }}
          >
            <div className="md2:flex flex-col md2:pl-[30px]">
              <p className="md2:font-[800] dxs:font-[500] font-bold font-[Poppins] text-[#ffffff] text-[27px] dxs:text-[17px]  pt-[25px] ">
                Follow & Join us on
              </p>
              <div className="md2:flex dxs:hidden justify-between">
                <div className="md2:flex flex-col">
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
        <div className="dxs:hidden md2:flex justify-between pr-[36px] pt-[25px] px-[5px]">
          <p className="font-[Segoe UI] font-[600] text-xl text-[#2D6BE4] px-9 pb-[21px]">
            Recommended Courses
          </p>
          <div className="pt-[8px] pr-10">
            <button
              onClick={() => setView("allScholarshipApplications")}
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
        {selectedComponent === "component1" && (
          <div className="flex flex-col py-3 px-5 bg-[#e6f1fd]">
            <div className="bg-[#ffffff] rounded-[20px]">
              <div className="py-2 pl-3">
                <div className="md2:pt-8 dxs:pt-4 md2:px-3 dxs:px-2 pl-5">
                  <div
                    className="flex rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] pl-10 dxs:w-[340px] dxs:h-[120px]"
                    style={{
                      backgroundImage: 'url("Frame5066.png")',
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
              </div>
              <div className="py-2 pl-3">
                <div className="md2:pt-8 dxs:pt-4 md2:px-3 dxs:px-2 pl-5">
                  <div
                    className="flex rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] pl-10 dxs:w-[340px] dxs:h-[120px]"
                    style={{
                      backgroundImage: 'url("Frame5067.png")',
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
              </div>
              <div className="py-2 pl-3">
                <div className="md2:pt-8 dxs:pt-4  md2:px-3 dxs:px-2 pl-5">
                  <div
                    className="flex rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] dxs:w-[340px] dxs:h-[120px]"
                    style={{
                      backgroundImage: 'url("Frame5068.png")',
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
              </div>
              <div className="py-1 pl-3">
                <div className="md2:pt-8 dxs:pt-4 md2:px-3 dxs:px-2 pl-5">
                  <div
                    className="flex rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] dxs:w-[340px] dxs:h-[120px] "
                    style={{
                      backgroundImage: 'url("Frame5069.png")',
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <div className="flex flex-col py-3 px-5 bg-[#e6f1fd]">
          <div className="bg-[#ffffff] rounded-[20px]">
            <div className="py-2 pl-3">
              <div className="md2:pt-8 dxs:pt-4 md2:px-3 dxs:px-2 pl-5">
                <div
                  className="flex rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] pl-10 dxs:w-[340px] dxs:h-[120px]"
                  style={{
                    backgroundImage: 'url("Frame5066.png")',
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
            </div>
            <div className="py-2 pl-3">
              <div className="md2:pt-8 dxs:pt-4 md2:px-3 dxs:px-2 pl-5">
                <div
                  className="flex rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] pl-10 dxs:w-[340px] dxs:h-[120px]"
                  style={{
                    backgroundImage: 'url("Frame5067.png")',
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
            </div>
            <div className="py-2 pl-3">
              <div className="md2:pt-8 dxs:pt-4  md2:px-3 dxs:px-2 pl-5">
                <div
                  className="flex rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] dxs:w-[340px] dxs:h-[120px]"
                  style={{
                    backgroundImage: 'url("Frame5068.png")',
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
            </div>
            <div className="py-1 pl-3">
              <div className="md2:pt-8 dxs:pt-4 md2:px-3 dxs:px-2 pl-5">
                <div
                  className="flex rounded-[20px]  md2:flex md2:w-[649px] md2:h-[233px] dxs:w-[340px] dxs:h-[120px] "
                  style={{
                    backgroundImage: 'url("Frame5069.png")',
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div> */}
        {/* Mobile view ongoing courses */}
        {selectedComponent === "component2" && (
          <div className="md2:hidden dxs:flex flex-col px-5">
            <img
              className="w-84 h-108 dxs:w-84 dxs:h-96 dxs:pt-[18px]"
              src="Frame5028.png"
              alt=""
            />
            <img
              className="dxs:w-84 dxs:h-108 w-84 h-96 dxs:pt-[18px]"
              src="Frame5070.png"
              alt=""
            />
            <img
              className="dxs:w-84 dxs:h-108 w-84 h-96 dxs:pt-[18px]"
              src="Frame5071.png"
              alt=""
            />
          </div>
        )}

        {/* Mobile view ongoing courses */}
        {/* <div className="md2:hidden dxs:flex flex-col">
          <img
            className="w-84 h-118 dxs:w-94 dxs:h-96 dxs:pt-[18px]"
            src="Frame5028.png"
            alt=""
          />
          <img
            className="dxs:w-84 dxs:h-118 w-94 h-96 dxs:pt-[18px]"
            src="Frame5070.png"
            alt=""
          />
          <img
            className="dxs:w-84 dxs:h-118 w-94 h-96 dxs:pt-[18px]"
            src="Frame5071.png"
            alt=""
          />
        </div> */}
      </div>
      <div className="pt-[25px] flex flex-col mr-5 md2:flex dxs:hidden">
        <div className="flex justify-center">
          <div className="pr-[12px]">
            <p className="font-[600] font-[Segoe UI] text-[18px] dxs:text-[12px] text-[#00227A] leading-[27px] flex flex-row-reverse">
              Name
            </p>
            <p className="font-[400] font-[Segoe UI] text-[18px]  dxs:text-[12px]  text-[#8CA3C3] leading-[27px]">
              123456789
            </p>
          </div>
          <img
            className="w-[67px] h-[55px] pl-[12px]"
            src="student.jpg"
            alt=""
          />
        </div>
        <p className="text-[#000000] text-[18px] font-[Poppins] font-[600] md2:flex  pt-[29px] ml-3 dxs:hidden">
          My Schedule
        </p>
        <img
          className="w-[377px] h-[210px] pt-[35px] md2:flex dxs:hidden"
          src="Calendar.png"
        ></img>
        <p className="text-[#000000] text-[14px] font-[Poppins] font-[600] flex justify-center pt-[45px]">
          My OnGoing Courses
        </p>
        <img className="w-321 h-208 pt-[18px]" src="Frame5028.png"></img>
        <img className="w-321 h-208 pt-[18px]" src="Frame5070.png"></img>
        <img className="w-321 h-208 pt-[18px]" src="Frame5071.png"></img>
      </div>
    </div>
  );
}

export default MyCourses