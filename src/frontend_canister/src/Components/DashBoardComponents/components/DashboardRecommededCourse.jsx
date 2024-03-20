import React from "react";
import RecommededCourseCard from "./RecommededCourseCard";
import mindImg from "../../../../assets/surr8091.png";

const CourseData = [
  {
    name: "Blockchain Course",
    description:
      "Exercitation officia cupidatat magna proident elit proident aute nostrud minim eu. Incididunt nulla enim laborum est amet ipsum elit aliquip sint aliqua do aliquip velit.",
    rating: "4.8",
    time: "12 May",
    image: mindImg,
    cardBackground: "bg-red-50",
    cardText: "text-red-400",
    level: "Beginner",
    hoverButtonColor: "hover:bg-red-500",
    buttonColor: "bg-red-400",
  },
  {
    name: "Blockchain Course",
    description:
      "Exercitation officia cupidatat magna proident elit proident aute nostrud minim eu. Incididunt nulla enim laborum est amet ipsum elit aliquip sint aliqua do aliquip velit.",
    rating: "4.8",
    time: "12 May",
    image: mindImg,
    cardBackground: "bg-green-50",
    cardText: "text-green-400",
    level: "Beginner",
    hoverButtonColor: "hover:bg-green-500",
    buttonColor: "bg-green-400",
  },
  {
    name: "Blockchain Course",
    description:
      "Exercitation officia cupidatat magna proident elit proident aute nostrud minim eu. Incididunt nulla enim laborum est amet ipsum elit aliquip sint aliqua do aliquip velit.",
    rating: "4.8",
    time: "12 May",
    image: mindImg,
    cardBackground: "bg-blue-50",
    cardText: "text-blue-400",
    level: "Beginner",
    hoverButtonColor: "hover:bg-blue-500",
    buttonColor: "bg-blue-400",
  },
  {
    name: "Blockchain Course",
    description:
      "Exercitation officia cupidatat magna proident elit proident aute nostrud minim eu. Incididunt nulla enim laborum est amet ipsum elit aliquip sint aliqua do aliquip velit.",
    rating: "4.8",
    time: "12 May",
    image: mindImg,
    cardBackground: "bg-purple-50",
    cardText: "text-purple-400",
    level: "Beginner",
    hoverButtonColor: "hover:bg-purple-500",
    buttonColor: "bg-purple-400",
  },
];

const DashboardRecommededCourse = () => {
  return (
    <div>
      <div className="bg-white rounded-lg">
        <div className="flex flex-col gap-1 px-10 py-6">
          {CourseData.map((SingleCourseData,key) => (
            <RecommededCourseCard SingleCourseData={SingleCourseData} key={key}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardRecommededCourse;
