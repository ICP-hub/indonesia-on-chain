import React from "react";
import { BsGridFill } from "react-icons/bs";
import { PiCertificateFill } from "react-icons/pi";
import { MdSettings } from "react-icons/md";
import { FaUser, FaBookOpenReader, FaBookOpen } from "react-icons/fa6";
import { AiTwotoneExperiment } from "react-icons/ai";

export const useSidebar = () => [
    {
        id: 0,
        studentName: "Dashboard",
        educatorName: "Dashboard",
        icon: <BsGridFill size={18} />,
        studentPath: "/student-dashboard/main",
        educatorPath: "/educator-dashboard/main",
    }, {
        id: 1,
        studentName: "My Courses",
        educatorName: "Courses",
        icon: <FaBookOpenReader size={18} />,
        studentPath: "/student-dashboard/my-courses",
        educatorPath: "/educator-dashboard/my-courses",
    }, {
        id: 2,
        studentName: "All Courses",
        educatorName: "Enrollments",
        icon: <FaBookOpen size={18} />,
        studentPath: "/student-dashboard/all-courses",
        educatorPath: "/educator-dashboard/enrollments"
    }, {
        id: 3,
        studentName: "Certificates",
        educatorName: "Certificates",
        icon: <PiCertificateFill size={20} />,
        studentPath: "/student-dashboard/my-certificates",
        educatorPath: "/educator-dashboard/certificates",

    }, {
        id: 4,
        studentName: "My Profile",
        educatorName: "My Profile",
        icon: <FaUser size={18} />,
        studentPath: "my-profile",
        educatorPath: "my-profile",
    },
    // this is for testing will be removed later
    {
        id: 5,
        studentName: "Test",
        educatorName: "Test",
        icon: <AiTwotoneExperiment size={18} />,
        studentPath: "/student-dashboard/certification-test",
        educatorPath: "/educator-dashboard/certification-test",
    }
];
