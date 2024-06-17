import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ukflag from "../FlagImage/uk.png";
import deflag from "../FlagImage/de.png";
import indonesia from "../FlagImage/indonesia2.png"
const LanguageButton = () => {
  const { i18n } = useTranslation();

  const options = [
    { value: "en", label: "English", flag: ukflag },
    { value: "in", label: "Indonesia", flag: indonesia }
  ];

  const [lang, setLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (option) => {
    setLang(option.value);
    i18n.changeLanguage(option.value);
    setIsOpen(false);
  };

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
        className="inline-flex gap-1 justify-center items-center w-full rounded-md bg-white py-2 px-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        <img
          src={options.find(opt => opt.value === lang)?.flag}
          alt={lang}
          className="w-[25px] max-w-none "
        />
        {lang}
      </button>

      {isOpen && (
        <div className="absolute w-auto right-0 mt-2 origin-top-right rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                className="block w-auto flex justify-start items-center px-2 pr-7 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
