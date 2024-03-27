import React from "react";
import mindImg from "../../../assets/images/surr8091.png";
import InProgressCardDetails from "./InProgressCardDetails";

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
  },
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
  },
];

console.log(ongoingCardComponentsData);

const MyCourseInProgressCard = ({tabType}) => {
  return (
    <div className="grid items-center justify-center w-full gap-8 grid-cols-3">
      {ongoingCardComponentsData.map((data, key) => (
        <InProgressCardDetails cardData={data} key={key} tabType={tabType} />
      ))}
    </div>
  );
};

export default MyCourseInProgressCard;
