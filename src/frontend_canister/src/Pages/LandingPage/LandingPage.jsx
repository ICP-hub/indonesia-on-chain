import React from 'react';
import { useState, useEffect } from 'react';
import { LandingPageMainSvg } from '../../Components/utils/svgData';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLoginOnStart, loginStart } from "../../Components/Reducers/InternetIdentityReducer";



const LandingPage = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.internet);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            dispatch(loginStart());
            setIsLoading(false);
            navigate(
                process.env.DFX_NETWORK === "ic"
                    ? '/signup'
                    : `/signup?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`);
        }
        catch (error) {
            console.error(error);
        }
    };

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         navigate(
    //             process.env.DFX_NETWORK === "ic"
    //                 ? '/signup'
    //                 : `/signup?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`);
    //     }
    // }, [isAuthenticated]);

    useEffect(() => {
        dispatch(checkLoginOnStart());
    }, [dispatch]);


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-10 transition duration-300 ease-in-out ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">

                    <div className="flex items-center">
                        <div className="h-8 mr-2">
                            {LandingPageMainSvg}
                        </div>
                        <span className="font-indigo-800 font-poppins font-[700]">Indonesia on Chain</span>
                    </div>
                    <div className="block">
                        <ul className="inline-flex items-center">
                            <li><a className="px-4 " href="#">Home</a></li>
                            <li><a className="px-4 " href="#">Blog</a></li>
                            <li><a className="px-4 " href="#">About Us</a></li>
                            <li>
                                <button className="px-6 py-2 bg-indigo-600 text-white  rounded-full"
                                    onClick={() => {
                                        !isLoading ? handleLogin() : ''
                                    }}
                                >
                                    Get Started
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default LandingPage;
