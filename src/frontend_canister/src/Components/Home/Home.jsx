import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../layouts/Navbar';
import { mainHomeSvg } from '../utils/svgData';
import PlayButton from '../../../assets/images/PlayButton.png';
import Header from '../../../assets/images/Header.png';
import AOS from 'aos'
import 'aos/dist/aos.css'
import NavbarMobile from '../layouts/NavbarMobile';
import svgImages from '../../../assets/images/mobilelandingbg.svg';
import { useAuth } from '../utils/useAuthClient';
import HelpVideo from '../../modals/HelpVideo';
const Home = ({ setClickConnectWallet }) => {

    const dispatch = useDispatch();
    const { isAuthenticated, login, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [HelpVideoOpen, setHelpVideoOpen] = useState(false);

    useEffect(() => {
        AOS.init();
        dispatch({ type: 'CHECK_USER_PRESENT' });
    })

    const handleLogin = async () => {
        try {

            setIsLoading(true);
            const auth = await login();
            setIsLoading(false);
            setloadingDashboard(true);

        } catch (error) {
            console.error(error);
        }
    };

    const HandleHelpVideClick = () => {
        setHelpVideoOpen(true)
    }
    return (
        <>
            <section className='w-full bg-[#E4E4FE] custom-radius h-screen'>
                {HelpVideoOpen && <HelpVideo setHelpVideoOpen={setHelpVideoOpen} />}
                <div className='' style={{
                    backgroundImage: `url(${svgImages})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>


                    <Navbar setClickConnectWallet={setClickConnectWallet} />

                    
                    <div className='lg:flex lg:justify-evenly lg:items-center pt-16 lg:pt-0'>
                        <div className='block lg:w-[33%] w-full p-16 ' data-aos="fade-right" data-aos-delay='100'
                            data-aos-easing='ease-in-back'>
                            <div className='text-3xl text-[20px]  block md:text-5xl  leading-loose '>
                                <span className='text-[#7B61FF] font-[700] font-poppins'>Learning  </span>
                                <span className='text-[#2F327D] font-[800] font-nunitoSans '>Blockchain is now much easier</span>

                            </div>
                            <p className='font-[400] text-[#464646] font-nunitoSans w-3/4 my-3'>Indonesia On-Chain is a pioneering platform in Indonesia dedicated to teaching Blockchain and Entrepreneurship through an interactive, engaging experience. Gain access to Ideathons, Hackathons, and receive certifications for your newly acquired skills.</p>

                            <div className='mt-[43px] flex '>

                                {
                                    !isAuthenticated ? (
                                        <button className=" px-6 py-3 bg-[#3400B1]  text-white font-poppins text-base rounded-full
                                        hover:text-[#3400B1] hover:bg-white border-2  border-[#3400B1] hover:scale-105 font-normal transition-all duration-500 ease-in-out"
                                            onClick={() => {
                                                setClickConnectWallet(true)
                                            }}
                                        >
                                            Get Started
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-[#3400B1] lg:px-[30px] lg:py-[13px] px-[10px] py-[0px] text-white lg:rounded-[80px] rounded-md text-sm
                                            hover:bg-white hover:text-[#3400B1] border-2  border-[#3400B1] hover:scale-105 font-bold transition-all duration-500 ease-in-out"
                                            onClick={() => {
                                                !isLoading ? logout() : "";
                                            }}
                                        >
                                            Logout
                                        </button>
                                    )
                                }


                                <div className='flex items-center px-8'>
                                    <img className='h-[53px] w-[53px] ' src={PlayButton} alt="" />
                                    <p className='font-poppins font-[400] pl-6 cursor-pointer'
                                        onClick={HandleHelpVideClick}>Watch how it works</p>

                                </div>

                            </div>
                        </div>



                        <div
                            className='hidden h-screen mt-[3rem] items-end overflow-hidden lg:block'
                            data-aos='fade-up'>

                            {mainHomeSvg}

                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}

export default Home;