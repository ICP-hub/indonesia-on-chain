import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { logoutStart } from "../../Components/Reducers/InternetIdentityReducer";

import StudentSideBar from "../../Components/DashBoardComponents/Student/SideBar";
import CenterComponent from "../../Components/DashBoardComponents/Student/CenterComponent";
const StudentDashboardPage = () => {
  const dispatch = useDispatch();
  const { actor } = useSelector((state) => state.actors);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      dispatch(logoutStart());
      setIsLoading(false);
      window.location.href =
        process.env.DFX_NETWORK === "ic"
          ? "/"
          : `/?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`;
    } catch (error) {
      setIsLoading(false);
    }
  };

  const color = "black";
  return (
    <div className="md2:grid md2:grid-cols-12 md2:h-screen">
      <div className="col-span-2 bg-white text-white justify-start w-full hidden md:flex ">
        <StudentSideBar />
      </div>
      <div className="col-span-10">
        <CenterComponent />
      </div>
      <div
        className={`${location.pathname === "/student-dashboard" ? "block" : "hidden"} hidden lg:block col-span-3 bg-gray-200 `}
      ></div>
    </div>
  );
};

export default StudentDashboardPage;
