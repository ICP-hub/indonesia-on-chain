import React from "react";
import { IoIosStar } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

const RecommededCourseCard = ({ SingleCourseData }) => {
  const {
    cardBackground,
    cardText,
    name,
    description,
    rating,
    time,
    image,
    level,
    hoverButtonColor,
    buttonColor,
  } = SingleCourseData;
  return (
    <div
      className={`my-4 flex items-center justify-center px-8 py-5 rounded-lg shadow-lg w-full ${cardBackground}`}
    >
      <div className="w-1/3">
        <img src={image} alt="card images" className="w-[60%] drop-shadow-lg" />
      </div>
      <div className={`${cardText} flex flex-col w-2/3 gap-1`}>
        <div>
          <p className="font-bold lightfont">{time}</p>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
        </div>
        <div>
          <p className="text-md lightfont">{description}</p>
        </div>
        <div className="flex items-center justify-between my-3">
          <div className="flex items-center justify-center space-x-1">
            <IoIosStar className="text-xl font-bold text-yellow-400" />
            <div className="flex items-center justify-center gap-2 font-bold lightfont">
              <p>{rating}</p>
              <p className="flex items-center justify-center gap-2">
                <GoDotFill className="text-[10px]" />
                {level}
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
