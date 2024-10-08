import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ukflag from "../FlagImage/uk.png";
import deflag from "../FlagImage/de.png";
import indonesia from "../FlagImage/indonesia2.png"
const LanguageButton = () => {
  const { i18n } = useTranslation();

  const options = [
    { value: "in", label: "Indonesia", flag: indonesia },
    { value: "en", label: "English", flag: ukflag },
  ];

  const [lang, setLang] = useState(localStorage.getItem("selectedLang") || "in");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (option) => {
    setLang(option.value);
    i18n.changeLanguage(option.value);
    localStorage.setItem("selectedLang", option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("selectedLang") || "in";
    i18n.changeLanguage(storedLang);
  },[])

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex items-center justify-center w-full gap-1 px-2 py-2 text-sm font-semibold text-gray-900 rounded-md shadow-sm bg-transperant ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        <img
          src={options.find(opt => opt.value === lang)?.flag}
          alt={lang}
          className="w-[25px] max-w-none pr-1"
        />
        {lang}
        {/* <i className="fa-solid fa-caret-down"></i> */}
      </button>

      {isOpen && (
        <div className="absolute right-0 w-auto mt-2 origin-top-right bg-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                className="flex items-center justify-start block w-auto px-2 py-2 text-sm text-gray-700 pr-7 hover:bg-gray-100"
                onClick={() => handleClick(option)}
              >
                <img
                  src={option.flag}
                  width="20"
                  alt={option.value}
                  className="mr-1"
                />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageButton;
