
import png1 from "../../../assets/images/Teacher.png"
import png2 from '../../../assets/images/Students.png'
import { useTranslation } from 'react-i18next';
import { useAuth } from '../utils/useAuthClient';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';
const AboutSection2 = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isAuthenticated, login, logout, actor } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { setClickConnectWallet } = useOutletContext();


    const [usertest, setusertest] = useState(null);

    useEffect(() => {
        AOS.init();
        dispatch({ type: 'CHECK_USER_PRESENT' });

        // Fetch user role
        const fetchUserRole = async () => {
            if (isAuthenticated) {
                const user_data = await actor.get_user_info();
                if (user_data.ok.role !== undefined) {
                    setusertest(user_data.ok.role);
                }
            }
        };
        fetchUserRole();
    }, [dispatch, isAuthenticated, actor]);



    const handleComingSoonClick = () => {
        toast.info(t('about.section2.commingsoon'), {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const DashboardLink = {
        name: t('navbar.dashboard'),
        path: usertest === "student" ? "/student-dashboard/main" : usertest === "educator" ? "/educator-dashboard/main" : "/signup-role",
    };
    return (
        <section id="about" className="w-full bg-white about-section ">
            <div id="AboutUs" className="flex flex-col w-full mx-auto ">
                <div className="flex-col mx-auto ">
                    <div className="mb-8 text-center lg:mb-0">
                        <h2 className="text-4xl font-[700] font-sans mb-4  px-1 py-0">

                            <span className='font-sans text-indigo-800' >{t('about.section2.whatIs')}</span> <span className='font-sans text-purple-500'>{t('about.section2.Chain')}
                            </span>
                        </h2>
                        <p className="text-gray-600 mb-8 font-[400] font-sans mx-auto  w-full px-4">
                            {t('about.section2.platformDescription')}
                        </p>
                    </div>

                    {/* flex items-center justify-center */}
                    <div className='flex flex-col items-center justify-center gap-5 p-5 lg:flex-row lg:justify-between xl:flex-row xl:justify-evenly'>
                        <div className='relative flex items-center justify-center md:top-8 md:right-0 md:bottom-0'>
                            <img src={png1} alt="logo"
                                className='xl:mt-[0rem]'
                            />
                            <div className="absolute flex flex-col items-center justify-end">
                                <div className='text-center'>
                                    <p className='flex justify-center text-2xl font-bold text-white'>{t('about.section2.forEducators')}</p>
                                    {!isAuthenticated ? (
                                    <button className=" font-poppins mt-4  px-7 py-4  text-white rounded-full font-semibold  cursor-pointer bg-[#7B61FF] ">

                                        <span className='w-full font-poppins' onClick={() => setClickConnectWallet(true)}>{t('about.section2.getStarted')}</span>

                                    </button>
                                ) : (
                                    <button className=" font-poppins mt-4  px-7 py-4  text-white rounded-full font-semibold  cursor-pointer bg-[#7B61FF] ">
                                        <Link to={process.env.DFX_NETWORK === "ic" ? DashboardLink?.path : `${DashboardLink?.path}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`}>
                                            <span className='w-full font-poppins' >{t('about.section2.getStarted')}</span>
                                        </Link>
                                    </button>
                                )}
                                </div>
                            </div>

                        </div>




                        <div className='relative flex items-center justify-center md:top-8 md:right-0 md:bottom-0'>
                            <img src={png2} alt="logo"
                                className=' xl:mt-[0rem]'
                            />
                            <div className="absolute flex flex-col items-center justify-end">

                                <p className='flex justify-center text-2xl font-bold text-white'>{t('about.section2.forStudents')}</p>
                                {!isAuthenticated ? (
                                    <button className=" font-poppins mt-4  px-7 py-4  text-white rounded-full font-semibold  cursor-pointer bg-[#7B61FF] ">

                                        <span className='w-full font-poppins' onClick={() => setClickConnectWallet(true)}>{t('about.section2.getStarted')}</span>

                                    </button>
                                ) : (
                                    <button className=" font-poppins mt-4  px-7 py-4  text-white rounded-full font-semibold  cursor-pointer bg-[#7B61FF] ">
                                        <Link to={process.env.DFX_NETWORK === "ic" ? DashboardLink?.path : `${DashboardLink?.path}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`}>
                                            <span className='w-full font-poppins' >{t('about.section2.getStarted')}</span>
                                        </Link>
                                    </button>
                                )}
                            </div>

                        </div>


                    </div>

                </div>
            </div>
            <ToastContainer />
        </section>
    );
}


export default AboutSection2