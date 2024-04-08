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
const Home = () => {

    const dispatch = useDispatch();
    const { isAuthenticated,login,logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

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
            // console.log("login clicked",isAuthenticated);


            // console.log("------------Navbar Login clicked:------")
            // console.log("canisterId:->", process.env.BACKEND_CANISTER_CANISTER_ID);
            // console.log("contentCanisterId:->", process.env.BACKEND_CONTENT_CANISTER_CANISTER_ID);
            // console.log("authClient", auth);
            // console.log("actor", actor);
            // console.log("contentActor", contentActor);
            // const principal_id = authClient.getIdentity().getPrincipal().toString();
            // console.log(principal_id);
            // console.log("real authClient", authClient);
            // console.log("Is Authenticated:-", isAuthenticated);
            // console.log("------------Navbar Login  FINISH :------")

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <section className='w-full bg-[#E4E4FE] custom-radius'>
                <div className='h-[98vh]' style={{
                    backgroundImage: `url(${svgImages})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>

                    <div className='hidden lg:block md:block'>
                        <Navbar />
                    </div>
                    <div className='flex lg:hidden md:flex sm:flex'>
                        <NavbarMobile />
                    </div>
                    <div className='lg:flex lg:justify-evenly lg:items-center '>
                        <div className='block lg:w-[33%] w-full p-16 ' data-aos="fade-right" data-aos-delay='100'
                            data-aos-easing='ease-in-back'>
                            <div className='text-3xl text-[20px]  block md:text-[45px]  leading-[67px] '>
                                <span className='text-[#7B61FF] font-[700] font-poppins'>Learning  </span>
                                <span className='text-[#2F327D] font-[800] font-nunitoSans '>Blockchain is now much easier</span>

                            </div>
                            <p className='font-[400] text-[#464646] font-nunitoSans w-[75%]'>Indonesia on Chain is an interesting platform that will teach you in more an interactive way.</p>

                            <div className='mt-[43px] flex '>

                                {
                                    !isAuthenticated ? (
                                        <button className=" bg-[#3400B1] lg:px-[30px] lg:py-[13px] px-[10px] py-[0px] text-white lg:rounded-[80px] rounded-md text-sm
                                hover:bg-white hover:text-[#3400B1] border-2  border-[#3400B1] hover:scale-105 font-bold transition-all duration-500 ease-in-out"
                                            onClick={() => {
                                                !isLoading ? handleLogin() : ''
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
                                    <p className='font-poppins font-[400] pl-6'>Watch how it works</p>
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