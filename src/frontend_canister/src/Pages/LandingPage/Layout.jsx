import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Components/layouts/Navbar';
import Footer from '../../Components/Home/Footer';
import LoginSelect from '../../modals/LoginSelect';
import { useAuth } from '../../Components/utils/useAuthClient'; 
const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const [ClickConnectWallet, setClickConnectWallet] = useState(false);
    useEffect(() => {
       
        if (isAuthenticated) {
            setClickConnectWallet(false);
        }
    }, [isAuthenticated])
    return (
        <div className="layout">

            <Navbar setClickConnectWallet={setClickConnectWallet} />
            <main>
            {ClickConnectWallet && <LoginSelect setClickConnectWallet={setClickConnectWallet} />}
                <Outlet context={{ setClickConnectWallet }}/>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
