import React,{useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { MainLogo, dashSvg, coursesSvg, settingSvg, profileSvg, certSvg, logoutSvg } from "../../Components/utils/svgData";
import { logoutStart } from "../../Components/Reducers/InternetIdentityReducer";
import { Link } from 'react-router-dom'
import RecommendedCourses from '../../Components/StudentComponents/Courses';

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
                process.env.DFX_NETWORK === "ic" ?
                    '/' :
                    `/?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`;
        } catch (error) {
            setIsLoading(false);
        }
    };

    const color = "black"
    return (
        <div className="grid grid-cols-12 h-screen">
            <div className="col-span-2 bg-black text-white justify-start w-full">
                {/* Your side navbar code */}
                <div className="h-screen flex flex-col space-y-6 py-7 px-2">
                    <a href="#" className="text-white flex justify-center space-x-2 px-4">
                        {MainLogo}
                        <span className="text-xl font-bold">Indonesia On Chain</span>
                    </a>

                    <nav className="flex flex-col items-center w-full">
                        <div className="items-start ">
                            <Link to="/dashboard" className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-purple-500 ">
                                <div className="flex ">{dashSvg}</div>
                                <span className="ml-4">Dashboard</span>
                            </Link>
                            <Link to="/courses" className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-purple-500 ">
                                <div className="flex ">{coursesSvg}</div>
                                <span className="ml-4">My Courses</span>
                            </Link>
                            <Link to="/certificates" className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-purple-500 ">
                                <div className="flex ">{certSvg}</div>
                                <span className="ml-4">Certificates</span>
                            </Link>
                            <Link to="/profile" className="flex items-center py-2.5 px-5 rounded-lg transition duration-200 hover:bg-purple-500 ">
                                <div className="flex ">{profileSvg}</div>
                                <span className="ml-5">Profile</span>
                            </Link>
                            <Link to="/settings" className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-purple-500 ">
                                <div className="flex ">{settingSvg}</div>
                                <span className="ml-4">Settings</span>
                            </Link>
                        </div>
                    </nav>
                </div>

                <div>
                    {/* Your logout button */}
                    <button
                        className="flex items-center w-full px-4 py-2 mt-60 hover:bg-purple-500 rounded-lg"
                        onClick={() => { !isLoading && handleLogout() }}>
                        <div className="flex justify-center">{logoutSvg}</div>
                        <span className="ml-4">Log Out</span>
                    </button>
                </div>
            </div>
            <div className="col-span-10">
                <div className="h-screen w-full">
                    <RecommendedCourses />
                </div>
            </div>
            <div className={`${location.pathname === "/student-dashboard" ? "block" : "hidden"} hidden lg:block col-span-3 bg-gray-200 `}>
                {/* Third compartment */}
            </div>
        </div>

    );
}

export default StudentDashboardPage;