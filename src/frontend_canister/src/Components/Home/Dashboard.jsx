import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import icp from "../../../assets/icp.png";
import Loader from "../utils/Loader";
import { logoutStart } from "../Reducers/InternetIdentityReducer";


const Dashboard = () => {
    const dispatch = useDispatch();
    const { actor } = useSelector((state) => state.actors);
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("")
    const [message, setMessage] = useState("");

    // Function to handle login
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


    const handleMakeCall = async () => {
        if (actor) {
            if (!name || !name.trim() || name.trim() === "") {
                alert("Enter Name");
            }
            setIsLoading(true);
            await actor.greet(name).then((greeting) => {
                setMessage(greeting);
                setName("")
                setIsLoading(false);
            });
        } else {
            alert("Actor Not Bind, do Logout & Login Again !!");
        }
    }

    return (
        <>
            {isLoading ? <Loader /> :
                <div className="flex flex-col items-center justify-center w-full bg-[#f1f1f1]" style={{ height: `calc(100vh - 93px)` }}>
                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl p-4 sm:p-6 md:p-10 lg:p-10 xl:p-12 2xl:p-14 bg-white rounded-xl shadow-lg flex flex-col gap-4">
                        <h2 className="text-center text-2xl sm:text-3xl font-bold text-blue-900 underline decoration-2 underline-offset-4">{t("dashboard.heading")}</h2>
                        <p className="text-justify text-md sm:text-lg md:text-lg text-gray-600 lg:my-3 md:my-2 sm:my-1 max-h-32 overflow-y-auto px-4">{t("dashboard.welcomeText")}</p>
                        <div className="w-full flex flex-col justify-center gap-2 p-4 items-center">
                            <div className="w-4/5 ">
                                <input
                                    type='text'
                                    className={`w-full p-2 rounded-md mt-1  border-2 border-blue-600`}
                                    placeholder="Enter your name..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex">
                                <button onClick={handleMakeCall} className="flex gap-2 justify-center items-center py-1 px-4 border-2 rounded-xl cursor-pointer border-blue-900 hover:bg-blue-900 hover:text-white duration-300 ease-in-out">Call Backend Canister</button>
                            </div>

                            <h1>{message}</h1>
                        </div>

                        <div className="flex mt-4 w-full justify-center">
                            <button className="flex gap-2 justify-center items-center py-1 px-4 border-2  rounded-xl cursor-pointer border-blue-900 hover:bg-blue-900 hover:text-white duration-300 ease-in-out"
                                onClick={() => { !isLoading ? handleLogout() : '' }} >
                                <img src={icp} alt="logo" className="w-10 h-10" />
                                <span className="text-md lg:text-lg md:text-lg font-semibold">
                                    {isLoading ? t("dashboard.loading") : t("dashboard.logout")}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>}
        </>
    );
};

export default Dashboard;
