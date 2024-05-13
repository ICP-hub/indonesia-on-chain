import React, { useEffect } from 'react';
import Home from '../../Components/Home/Home';
import AboutSection from '../../Components/Home/AboutSection';
import AboutSection2 from '../../Components/Home/AboutSection2';
import AboutSection3 from '../../Components/Home/AboutSection3';
import AboutSection4 from '../../Components/Home/AboutSection4';
import AboutSection5 from '../../Components/Home/AboutSection5';
import AboutSection6 from '../../Components/Home/AboutSection6';
import AboutSection7 from '../../Components/Home/AboutSection7';
import AboutSection8 from '../../Components/Home/AboutSection8';
import Footer from '../../Components/Home/Footer';
import { useAuth } from '../../Components/utils/useAuthClient';
const LandingPage = () => {
    return (
        <main >

            <div className='w-[100%]'>
                <Home />
            </div>

            <div
            // className='container px-12 py-4 mx-auto mt-24'
            >
                <div className='lg:mx-[130px]'>
                    <AboutSection />
                    <AboutSection2 />
                    <AboutSection3 />
                    <AboutSection4 />
                    <AboutSection5 />
                    <AboutSection6 />
                    <AboutSection7 />
                    {/* <AboutSection8 /> */}
                </div>

                <Footer />
            </div>
        </main>
    );
}

export default LandingPage;
