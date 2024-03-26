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
        studentPath: "/student-dashboard?title=Student%20Dashboard",
        educatorPath: "/student-dashboard?title=Educator%20Dashboard",
    }, {
        id: 1,
        studentName: "My Courses",
        educatorName: "Courses",
        icon: <FaBookOpenReader size={18} />,
        studentPath: "my-courses?title=My%20Courses",
        educatorPath: "my-courses?title=Courses",
    }, {
        id: 2,
        studentName: "All Courses",
        educatorName: "Enrollments",
        icon: <FaBookOpen size={18} />,
        studentPath: "all-courses?title=All%20Courses",
        educatorPath: "enrollments?title=Enrollments"
    }, {
        id: 3,
        studentName: "Certificates",
        educatorName: "Certificates",
        icon: <PiCertificateFill size={20} />,
        studentPath: "my-certificates?title=Certificates",
        educatorPath: "certificates?title=Certificates",

    }, {
        id: 4,
        studentName: "My Profile",
        educatorName: "My Profile",
        icon: <FaUser size={18} />,
        studentPath: "my-profile?title=My%20Profile",
        educatorPath: "my-profile?title=My%20Profile",
    }, {
        id: 5,
        studentName: "Settings",
        educatorName: "Settings",
        icon: <MdSettings size={18} />,
        studentPath: "my-settings?title=Settings",
        educatorPath: "my-settings?title=Settings",
    },
    // this is for testing will be removed later
    {
        id: 6,
        studentName: "Certification%20Test",
        educatorName: "Certification%20Test",
        icon: <AiTwotoneExperiment size={18} />,
        studentPath: "certification-test?title=Blockchain Course",
        educatorPath: "certification-test?title=Blockchain Course",
    }
];
