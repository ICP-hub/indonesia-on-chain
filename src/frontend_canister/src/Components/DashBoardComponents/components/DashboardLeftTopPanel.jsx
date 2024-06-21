import React from "react";
import graduationcap from "../../../../assets/images/graduation-cap 1.png";
import { useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
const DashboardLeftTopPanel = () => {
  const { t } = useTranslation();
  const {name}  = useSelector((state) => state.users)
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


  const getDate = () => {
    const today = new Date();
    const monthName = months[today.getMonth()];
    const dayOfMonth = today.getDate();
    const dayOfWeek = days[today.getDay()];

    const formattedDate = `${monthName} ${dayOfMonth},${dayOfWeek}`;
    return formattedDate;
  }
  return (
    <div className="flex items-center justify-center w-full shadow rounded-xl dashboard_cap_gradient">
      <div className="flex flex-col-reverse items-center justify-between w-full p-4 lg:flex-row md:flex-col-reverse sm:flex-col-reverse">
        <div className="mx-auto my-4 text-white lg:mx-10 md:mx-4">
          <p className="flex items-start justify-start text-small text-[16px] lightfont">
            {getDate()}
          </p>
          <div className="my-8">
            <h1 className="my-2 text-3xl font-extrabold">{t('DashboardComponents.Welcome')} {name} !</h1>
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
