import React, { useEffect, useState } from 'react';
import Home from '../../Components/Home/Home';
import AboutSection from '../../Components/Home/AboutSection';
import AboutSection2 from '../../Components/Home/AboutSection2';
import AboutSection3 from '../../Components/Home/AboutSection3';
import AboutSection4 from '../../Components/Home/AboutSection4';
import AboutSection5 from '../../Components/Home/AboutSection5';
import AboutSection6 from '../../Components/Home/AboutSection6';
import AboutSection7 from '../../Components/Home/AboutSection7';
import Footer from '../../Components/Home/Footer';
import LoginSelect from '../../modals/LoginSelect';
const LandingPage = () => {
    const [ClickConnectWallet, setClickConnectWallet] = useState(false);
    return (
        <main >
            <div className='w-[100%]'>
                {ClickConnectWallet && <LoginSelect setClickConnectWallet={setClickConnectWallet} />}
                <Home setClickConnectWallet={setClickConnectWallet} />
            </div>
            <div>
                <div className='lg:mx-[130px]'>
                    <AboutSection />
                    <AboutSection2 setClickConnectWallet={setClickConnectWallet}/>
                    <AboutSection3 />
                    <AboutSection4 />
                    <AboutSection5 />
                    <AboutSection6 />
                    <AboutSection7 />
                </div>
                <Footer />
            </div>
        </main>
    );
}

export default LandingPage;
