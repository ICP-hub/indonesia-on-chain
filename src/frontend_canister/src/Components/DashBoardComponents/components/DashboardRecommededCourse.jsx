import React from "react";
import RecommededCourseCard from "./RecommededCourseCard";
import mindImg from "../../../../assets/images/surr8091.png";

// const CourseData = [
//   {
//     name: "Blockchain Course",
//     description:
//       "Exercitation officia cupidatat magna proident elit proident aute nostrud minim eu. Incididunt nulla enim laborum est amet ipsum elit aliquip sint aliqua do aliquip velit.",
//     rating: "4.8",
//     time: "12 May",
//     image: mindImg,
//     // below is required
//     cardBackground: "bg-red-50",
//     cardText: "text-red-400",
//     level: "Beginner",
//     hoverButtonColor: "hover:bg-red-500",
//     buttonColor: "bg-red-400",
//   }
// ];

const DashboardRecommededCourse = ({ recommendedCourses }) => {
  console.log("Courses recieved", recommendedCourses);
  const colors = ['red', 'purple', 'violet', 'green', 'blue', 'indigo'];

  return (
    <div>
      <div className="bg-white rounded-lg">
        <div className="flex flex-col gap-1 px-6 py-6 lg:px-10">
          {recommendedCourses.map((SingleCourseData, key) => {
            let colorIndex = Math.floor(Math.random() * 6);
            let color = colors[colorIndex];
            let cardBackground = `bg-${color}-50`;
            let cardText = `text-${color}-400`;
            let hoverButtonColor = `hover:bg-${color}-500`;
            let buttonColor = `bg-${color}-400`;
            return (
              <RecommededCourseCard SingleCourseData={SingleCourseData} key={key} 
              cardBackground={cardBackground} cardText={cardText} hoverButtonColor={hoverButtonColor} buttonColor={buttonColor}/>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardRecommededCourse;
