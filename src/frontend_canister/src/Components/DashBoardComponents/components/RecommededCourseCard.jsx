import React from "react";
import { IoIosStar } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

const RecommededCourseCard = ({ SingleCourseData,cardBackground,cardText,hoverButtonColor,buttonColor }) => {
  const {
    courseImg,
    courseTitle,
    rating,
    shortdescription,
    upload_date

  } = SingleCourseData;

  function addOrdinalSuffix(day) {
    if (day > 3 && day < 21) return day + 'th';
    switch (day % 10) {
      case 1: return day + 'st';
      case 2: return day + 'nd';
      case 3: return day + 'rd';
      default: return day + 'th';
    }
  }

  const dateExtractFunction = (uploadDate) => {
    const date = new Date(Number(uploadDate));
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    const formattedDate = `${addOrdinalSuffix(day)} ${month}, ${year}`;
    return formattedDate;

  }
  return (
    <div
      className={`my-4 flex flex-col sm:flex-col md:flex-col lg:flex-row items-center justify-center px-4 lg:px-8 py-5 rounded-lg shadow-lg w-full ${cardBackground}`}
    >
      <div className="flex items-start justify-center w-full sm:w-full md:w-full lg:w-1/3 lg:justify-start lg:items-start">
        <img src={courseImg} alt="card images" className="w-[60%] drop-shadow-lg" />
      </div>
      <div
        className={`${cardText} w-full flex flex-col sm:w-full md:w-full lg:w-2/3 gap-1`}
      >
        <div>
          <p className="font-bold lightfont">{dateExtractFunction(upload_date)}</p>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{courseTitle}</h1>
        </div>
        <div>
          <p className="text-md lightfont">{shortdescription}</p>
        </div>
        <div className="flex items-center justify-between my-3">
          <div className="flex items-center justify-center space-x-1">
            <IoIosStar className="text-xl font-bold text-yellow-400" />
            <div className="flex items-center justify-center gap-2 font-bold lightfont">
              <p>{rating}</p>
              <p className="flex items-center justify-center gap-2">
                <GoDotFill className="text-[10px]" />
                {"Beginner"}
              </p>
            </div>
          </div>
          <div>
            <button
              type="button"
              className={`px-8 py-2 font-bold text-white ${buttonColor} rounded ${hoverButtonColor} duration-300 ease-in-out shadow`}
            >
              Enroll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommededCourseCard;
