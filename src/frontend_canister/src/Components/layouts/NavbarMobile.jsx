import React from "react";
import IndonesiaOnChain from "../../../assets/images/IndonesiaOnChain.png";
import { useTranslation } from 'react-i18next';
const NavbarMobile = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-start items-center px-4 py-6">
        <img src={IndonesiaOnChain} alt="" className="h-2/3 w-2/3" />
      </div>
      <div className="flex justify-end items-center px-4 py-6">
        <button
          className="px-6 py-3 bg-[#3400B1] text-white font-poppins text-base rounded-full
                hover:bg-white hover:text-[#3400B1] border-2  border-[#3400B1] hover:scale-105 font-normal transition-all duration-500 ease-in-out">
          { t('navbar.getStarted')}
        </button>
      </div>
    </div>
  );
};

export default NavbarMobile;
