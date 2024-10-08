import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
    const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("selectedLang") || "in");
  }, [i18n]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex items-center justify-center h-screen max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="max-w-screen-sm mx-auto text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-[#3400B1] dark:text-primary-500">
            {t("notFound.title")}
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            {t("notFound.subtitle")}
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            {t("notFound.description")}
          </p>
          <button
            className="inline-flex text-white bg-[#3400B1] border-2 hover:border-[#3400B1] hover:bg-white hover:text-[#3400B1] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4 cursor-pointer"
            onClick={() => navigate("/")}
          >
            {t("notFound.backToHomepage")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
