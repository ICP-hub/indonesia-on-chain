import React from "react";
import { BsGridFill } from "react-icons/bs";
import { PiCertificateFill } from "react-icons/pi";
import { MdSettings } from "react-icons/md";
import { FaUser, FaBookOpenReader, FaBookOpen } from "react-icons/fa6";
import { AiTwotoneExperiment } from "react-icons/ai";
import { useTranslation } from "react-i18next";

export const useSidebarAdmin = () => {
    const { t } = useTranslation();
  
    const sidebarItemsAdmin = [
    //   {
    //     id: 0,
    //     studentName: t("student.Dashboard"),
    //     educatorName: t("educator.Dashboard"),
    //     icon: <BsGridFill size={18} />,
    //     studentPath: "/student-dashboard/main",
    //     educatorPath: "/educator-dashboard/main",
    //   },
    //   {
    //     id: 1,
    //     studentName: t("student.MyCourses"),
    //     educatorName: t("educator.Courses"),
    //     icon: <FaBookOpenReader size={18} />,
    //     studentPath: "/student-dashboard/my-courses",
    //     educatorPath: "/educator-dashboard/my-courses",
    //   },
      {
        id: 2,
        studentName: t("student.AllCourses"),
        educatorName: t("educator.Enrollments"),
        icon: <FaBookOpen size={18} />,
        studentPath: "/student-dashboard/all-courses",
        educatorPath: "/educator-dashboard/enrollments",
      },
      {
        id: 3,
        studentName: t("student.Certificates"),
        educatorName: t("educator.Certificates"),
        icon: <PiCertificateFill size={20} />,
        studentPath: "/student-dashboard/my-certificates",
        educatorPath: "/educator-dashboard/certificates",
      },
      {
        id: 4,
        studentName: t("student.MyProfile"),
        educatorName: t("educator.MyProfile"),
        icon: <FaUser size={18} />,
        studentPath: "my-profile",
        educatorPath: "my-profile",
      },
       // this is for testing will be removed later
    // {
    //     id: 5,
    //     studentName: "Test",
    //     educatorName: "Test",
    //     icon: <AiTwotoneExperiment size={18} />,
    //     studentPath: "/student-dashboard/certification-test",
    //     educatorPath: "/educator-dashboard/certification-test",
    // }
    ];
  
    return sidebarItemsAdmin;
  };