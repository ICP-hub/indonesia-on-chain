import React from "react";
import DashboardOngoingCardComponents from "./DashboardOngoingCardComponents";
import mindImg from "../../../../assets/Images/surr8091.png";
import Image from './../../Auth/Image';

const ongoingCardComponentsData = [
  {
    title: "Blockchain Course",
    name: "Professor Name",
    completed: 60,
    image: mindImg,
    cardBackgroundColor: "#D4DDFF",
    progressBarBaseColor: "#D4DDFF",
    progressBarColor: "#95A1F6",
  },
  {
    title: "Blockchain Course",
    name: "Professor Name",
    completed: 60,
    image: mindImg,
    cardBackgroundColor: "#FFE4D0",
    progressBarBaseColor: "#FFE4D0",
    progressBarColor: "#F9BB8F",
  },
  {
    title: "Blockchain Course",
    name: "Professor Name",
    completed: 60,
    image: mindImg,
    cardBackgroundColor: "#D1F7FF",
    progressBarBaseColor: "#D1F7FF",
    progressBarColor: "#96DAE9",
  }
];

console.log(ongoingCardComponentsData);

const DashboardOngoingCourseComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-8">
      {ongoingCardComponentsData.map((data,key) => (
        <DashboardOngoingCardComponents cardData={data} key={key} />
      ))}
    </div>
  );
};

export default DashboardOngoingCourseComponent;
