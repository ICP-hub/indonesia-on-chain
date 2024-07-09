import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import Navbar from '../layouts/Navbar';
import { mainHomeSvg } from '../utils/svgData';
import PlayButton from '../../../assets/images/PlayButton.png';
import Header from '../../../assets/images/Header.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavbarMobile from '../layouts/NavbarMobile';
import svgImages from '../../../assets/images/mobilelandingbg.svg';
import { useAuth } from '../utils/useAuthClient';
import HelpVideo from '../../modals/HelpVideo';
import { logoutStart } from '../Reducers/InternetIdentityReducer';
import { useOutletContext } from 'react-router-dom';
const Home = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, login, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [HelpVideoOpen, setHelpVideoOpen] = useState(false);
    const { t } = useTranslation();
    const { setClickConnectWallet } = useOutletContext();
    useEffect(() => {
        AOS.init();
        dispatch({ type: 'CHECK_USER_PRESENT' });
    }, [dispatch]);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            await login();
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleHelpVideoClick = () => {
        setHelpVideoOpen(true);
    };

    
    const handleLogout = async () => {
        setIsLoading(true);
    
        try {
            dispatch(logoutStart());
            setIsLoading(false);
            window.location.href =
                process.env.DFX_NETWORK === "ic" ?
                    '/' :
                    `/?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`;
        } catch (error) {
            setIsLoading(false);
        }
    };
    return (
        <>
            <section id='/' className='w-full bg-[#E4E4FE] custom-radius md:min-h-full pb-8'>
                {HelpVideoOpen && <HelpVideo setHelpVideoOpen={setHelpVideoOpen} />}
                <div
                    className='bg-cover bg-center'
                    style={{
                        backgroundImage: `url(${svgImages})`,
                    }}
                >
                    {/* <Navbar setClickConnectWallet={setClickConnectWallet} /> */}
                    <div className='flex flex-col lg:flex-row lg:justify-evenly lg:items-center pt-20'>
                        <div
                            className='flex flex-col lg:w-1/2 w-full p-6 lg:p-16'
                            data-aos='fade-right'
                            data-aos-delay='100'
                            data-aos-easing='ease-in-back'
                        >
                            <div className='text-2xl md:text-3xl lg:text-5xl leading-loose'>
                                <span className='text-[#7B61FF] font-bold '>{t('home.learning')} </span>
                                <span className='text-[#2F327D] font-extrabold block pt-2'>
                                    {t('home.blockchainIntro')}
                                </span>
                            </div>
                            <p className='font-normal text-[#464646] mt-3 w-full'>
                                {t('home.platformIntro')}
                            </p>
                            <div className='mt-10 flex flex-row gap-2 sm:flex-row'>
                                {!isAuthenticated ? (
                                    <button
                                        className='px-6 py-3 bg-[#3400B1] text-white font-medium rounded-full hover:text-[#3400B1] hover:bg-white border-2 border-[#3400B1] hover:scale-105 transition-all duration-500 ease-in-out mb-4 sm:mb-0 sm:mr-4'
                                        onClick={() => setClickConnectWallet(true)}
                                    >
                                        {t('home.getStarted')}
                                    </button>
                                ) : (
                                    <button
                                        className='px-6 py-3 bg-[#3400B1] text-white font-medium rounded-full hover:text-[#3400B1] hover:bg-white border-2 border-[#3400B1] hover:scale-105 transition-all duration-500 ease-in-out mb-4 sm:mb-0 sm:mr-4'
                                        // onClick={() => {
                                        //     if (!isLoading) logout();
                                        // }}
                                        onClick={() => { !isLoading && handleLogout() }}
                                    >
                                        {t('home.logout')}
                                    </button>
                                )}
                                <div className='flex items-center cursor-pointer' onClick={handleHelpVideoClick}>
                                    <img className='' 
                                    h-12 
                                    w-12
                                    src=
                                    {PlayButton} alt={t('home.watchHowItWorks')} />   {/* //  */}
                                    <p className='ml-3 text-base font-normal'>{t('home.watchHowItWorks')}</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className='hidden md:block lg:flex-1 lg:justify-end items-center lg:mt-0'
                            data-aos='fade-up'
                        >
                             {mainHomeSvg}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
