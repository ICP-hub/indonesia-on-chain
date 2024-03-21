import React from "react";
import { BsGridFill } from "react-icons/bs";
import { PiCertificateFill } from "react-icons/pi";
import { MdSettings } from "react-icons/md";
import { FaUser, FaBookOpenReader, FaBookOpen } from "react-icons/fa6";
import { AiTwotoneExperiment } from "react-icons/ai";

export const useSidebar = () => [{
    id: 0,
    name: "Dashboard",
    icon: <BsGridFill size={18} />,
    path: "/?title=Student Dashboard",
}, {
    id: 1,
    name: "My Courses",
    icon: <FaBookOpenReader size={18} />,
    path: "/my_courses?title=My Courses",
}, {
    id: 2,
    name: "All Courses",
    icon: <FaBookOpen size={18} />,
    path: "/all_courses?title=All Courses",
}, {
    id: 3,
    name: "Certificates",
    icon: <PiCertificateFill size={20} />,
    path: "/my_certificates?title=Certificates",
}, {
    id: 4,
    name: "My Profile",
    icon: <FaUser size={18} />,
    path: "/my_profile?title=My Profile",
}, {
    id: 5,
    name: "Settings",
    icon: <MdSettings size={18} />,
    path: "/my_settings?title=Settings",
}, {
    id: 6,
    name: "Certification Test",
    icon: <AiTwotoneExperiment size={18} />,
    path: "/certification_test?title=Blockchain Course",
}]