import React,{useState,useEffect} from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import {RxClock } from "react-icons/rx";
import { GoPerson } from "react-icons/go";

const InProgressCardDetails = ({ cardData,tabType }) => {
  const {
    title,
    name,
    completed,
    image,
    cardBackgroundColor,
    progressBarBaseColor,
    progressBarColor,
  } = cardData;

  const [tabTypeData,SetTabtypeData] = useState("All");

  useEffect(() => {
    if(tabType){
      SetTabtypeData(tabType);
    }else{
      SetTabtypeData("All");
    }
  }, [tabType]);


  console.log("cardData", tabType);
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full bg-white rounded-lg shadow-lg">
        <div className={`bg-[${cardBackgroundColor}] flex items-start justify-center rounded-lg p-3`}>
          <img src={image} alt="mind image" className="w-[125px] py-2 px-4" />
        </div>
        <div className="flex flex-col w-full gap-2 p-5">
          <div className="flex items-center justify-between">
          <small className="text-[14px] text-gray-500">Development</small>
          <div className="flex justify-center items-center">
            <RxClock className="flex justify-start text-gray-500" />
            <span className="mx-1 text-gray-500 text-[14px]">45 min</span>
          </div>
          </div>
          <h1 className="font-bold text-md">{title}</h1>
          <div className="flex justify-start items-center gap-1">
            <GoPerson className="text-sm text-gray-400" />
            <p className="text-sm text-gray-400">{name}</p>
          </div>
          {
            tabTypeData && (tabTypeData !== "All")?(
              <div className="my-2">
              <ProgressBar
                completed={completed}
                bgColor={progressBarColor}
                height={10}
                isLabelVisible={false}
                baseBgColor={progressBarBaseColor}
              />
              <p className="flex items-center justify-end mt-2 text-sm">
                <span className="flex text-gray-600">Completed:</span>
                <span className="mx-2 font-bold">{completed}%</span>
              </p>
            </div>
            ):(
              <button className={`my-2 w-full flex items-center justify-center p-2 bg-[${progressBarColor}] text-black rounded-md`}>Enroll</button>
            )
          }          
          
        </div>
      </div>
    </div>
  );
};

export default InProgressCardDetails;
