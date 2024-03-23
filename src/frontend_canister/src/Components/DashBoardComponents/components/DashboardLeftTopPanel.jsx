import React from "react";
import graduationcap from "../../../../assets/images/graduation-cap 1.png";

const DashboardLeftTopPanel = () => {
  return (
    <div className="flex items-center justify-center w-full shadow rounded-xl dashboard_cap_gradient">
      <div className="flex flex-col-reverse items-center justify-between w-full p-4 lg:flex-row md:flex-col-reverse sm:flex-col-reverse">
        <div className="mx-auto my-4 text-white lg:mx-10 md:mx-4">
          <p className="flex items-start justify-start text-small text-[16px] lightfont">
            Aprail 30,Tuesday
          </p>
          <div className="my-8">
            <h1 className="my-2 text-3xl font-extrabold">Welcome Name !</h1>
            <h4 className="flex items-start justify-center text-small text-[18px] lightfont mt-2">
              You have finished 85% of your weekly goal !
            </h4>
          </div>
        </div>
        <div>
          <img
            src={graduationcap}
            className="w-[95%] drop-shadow-lg"
            alt="side images"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardLeftTopPanel;
