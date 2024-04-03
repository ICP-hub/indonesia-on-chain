import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Image1 from "../../../../assets/images/surr-8092.png";

const DashboardOngoingCardComponents = ({ cardData }) => {
  const {
    title,
    name,
    completed,
    image,
    cardBackgroundColor,
    progressBarBaseColor,
    progressBarColor,
  } = cardData;
  // console.log("cardData", cardData);
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full bg-white rounded-lg shadow-lg">
        <div className={`bg-[${cardBackgroundColor}] flex items-start justify-center rounded-lg p-3`}>
          <img src={Image1} alt="mind image" className="w-[125px] py-2 px-4" />
        </div>
        <div className="flex flex-col w-full gap-2 p-5">
          <h1 className="font-bold text-md">{title}</h1>
          <p className="text-sm text-gray-500">{name}</p>
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
        </div>
      </div>
    </div>
  );
};

export default DashboardOngoingCardComponents;
