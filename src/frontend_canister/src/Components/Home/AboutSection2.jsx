
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
const AboutSection2 = ({ setClickConnectWallet }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isAuthenticated, login, logout, actor } = useAuth();
    const [isLoading, setIsLoading] = useState(false);



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
        <section id="about" className="about-section bg-white  w-full  ">

            <div id="AboutUs" className=" w-full flex flex-col mx-auto">
                <div className="mx-auto flex-col ">
                    <div className=" text-center  mb-8 lg:mb-0">
                        <h2 className="text-4xl font-[700] font-sans mb-4  px-1 py-0">

                            <span className='text-indigo-800 font-sans' >{t('about.section2.whatIs')}</span> <span className='text-purple-500 font-sans'>{t('about.section2.Chain')}
                            </span>
                        </h2>
                        <p className="text-gray-600 mb-8 font-[400] font-sans mx-auto  w-full px-4">
                            {t('about.section2.platformDescription')}
                        </p>
                    </div>

                    {/* flex items-center justify-center */}
                    <div className='flex flex-col  justify-center items-center lg:flex-row lg:justify-between gap-5  xl:flex-row xl:justify-evenly p-5'>
                        <div className=' relative md:top-8 md:right-0 md:bottom-0 '>
                            <img src={png1} alt="logo"
                                className='xl:mt-[0rem]'
                            />
                            <div className="absolute left-[30%]  top-[30%]  flex flex-col justify-end items-center">
                                <div className='text-start'>
                                    <p className='flex justify-center text-white text-2xl font-bold'>{t('about.section2.forEducators')}</p>
                                    <button className=" font-poppins mt-4 self-start px-7 py-4 bg-transparent text-white rounded-full font-semibold tracking-wide cursor-pointer border border-white transition duration-300">

                                        <span className='font-poppins w-full' onClick={handleComingSoonClick}>{t('about.section2.commingsoon')}</span>
                                    </button>
                                </div>
                            </div>

                        </div>




                        <div className=' relative md:top-8 md:right-0 md:bottom-0 '>
                            <img src={png2} alt="logo"
                                className=' xl:mt-[0rem]'
                            />
                            <div className="absolute left-[30%]  top-[30%]  flex flex-col justify-end items-center">

                                <p className='flex justify-center text-white text-2xl font-bold'>{t('about.section2.forStudents')}</p>
                                {!isAuthenticated ? (
                                    <button className=" font-poppins mt-4  px-7 py-4  text-white rounded-full font-semibold  cursor-pointer bg-[#7B61FF] ">

                                        <span className='font-poppins w-full' onClick={() => setClickConnectWallet(true)}>{t('about.section2.getStarted')}</span>

                                    </button>
                                ) : (
                                    <button className=" font-poppins mt-4  px-7 py-4  text-white rounded-full font-semibold  cursor-pointer bg-[#7B61FF] ">
                                        <Link to={process.env.DFX_NETWORK === "ic" ? DashboardLink?.path : `${DashboardLink?.path}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`}>
                                            <span className='font-poppins w-full' >{t('about.section2.getStarted')}</span>
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