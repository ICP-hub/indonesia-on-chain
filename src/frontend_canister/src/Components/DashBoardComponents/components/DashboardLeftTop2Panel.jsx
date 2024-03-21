import React from "react";
import groupImages from "../../../../assets/Images/addnewgroup2872689-24094091.png";
import { FiExternalLink } from "react-icons/fi";

const DashboardLeftTop2Panel = () => {
  return (
    <div className="flex items-center justify-center w-full shadow rounded-xl dashboard_cap_gradient2">
      <div className="flex flex-col-reverse items-center justify-between w-full p-4 lg:flex-row md:flex-col-reverse sm:flex-col-reverse">
        <div className="mx-auto my-4 text-white lg:mx-10 md:mx-4">
          <div className="mb-2">
            <h1 className="my-4 text-2xl font-extrabold">
              Follow & Join us on
            </h1>
            <div className="flex flex-col items-start justify-center gap-2 sm:text-[14px] md:text-[16px] lg:text-[18px]">
              <div className="flex items-start justify-center gap-6 socia-panel-1 lightfont">
                <div className="flex items-center justify-center font-[300]">
                  <p className="flex items-center justify-center gap-1 p-0 m-0">
                    <FiExternalLink />
                    Indonesia on Chain
                  </p>
                </div>
                <div className="flex items-center justify-center font-[300]">
                  <p className="flex items-center justify-center gap-1 p-0 m-0">
                    <FiExternalLink />
                    Instagram
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-center gap-6 socia-panel-2 lightfont">
                <div className="flex items-center justify-center font-[300]">
                  <p className="flex items-center justify-center gap-1 p-0 m-0">
                    <FiExternalLink />
                    Disruptives and DFinity X
                  </p>
                </div>
                <div className="flex items-center justify-center font-[300]">
                  <p className="flex items-center justify-center gap-1 p-0 m-0">
                    <FiExternalLink />
                    Telegram
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            src={groupImages}
            className="w-[95%] drop-shadow-lg"
            alt="side images"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardLeftTop2Panel;
