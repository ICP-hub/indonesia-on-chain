import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/useAuthClient";
import IndonesiaLogo from "../../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const Sidenavbar = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, login, logout, actor, authClient, contentActor } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDashboard, setloadingDashboard] = useState(false);
  const [clickConnectWallet, setClickConnectWallet] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const result = await actor.is_user_exist();
      if (result.ok) {
        const user_data = await actor.get_user_info();
        if (user_data.ok.role !== undefined) setusertest(user_data.ok.role);
        const Data = {
          emailId: user_data.ok.email,
          userName: user_data.ok.userName,
          name: user_data.ok.name,
          phone: user_data.ok.phone,
          role: user_data.ok.role,
        };
        dispatch({ type: 'STORE_USER_DATA', payload: Data });
      }
    };
   
    if (isAuthenticated) {
      fetch();
    }
  }, [isAuthenticated]);

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

  const NavbarLinks = [
    {
      name: t('Sidenavbar.Home'),
      path: "/",
    },
    {
      name: t('Sidenavbar.Features'),
      path: "/features",
    },
    {
      name: t('Sidenavbar.Courses'),
      path: "/courses",
    },
  ];

  return (
    <>
      <div className="relative flex flex-col h-full px-2 space-y-6 py-7 lg:px-3">

        <div className='flex flex-row items-center justify-center'>
          <Link className="w-20 h-10 space-x-2 text-white md:w-auto md:h-20 lg:px-4">
            <img src={IndonesiaLogo} alt="Logo" className='object-contain w-full h-full' />
          </Link>
        </div>

        <nav className="flex flex-col items-start justify-start w-full h-full">
          <div className='w-full'>
            <ul className="flex flex-col items-start space-y-4 p-4 bg-white h-full lg:bg-transparent lg:h-auto">
              {NavbarLinks.map((link, key) => (
                <li key={key} className="w-full">
                  <NavLink
                    to={link?.path}
                    className={({ isActive }) =>
                      `block px-4 py-2 font-poppins font-normal text-base leading-7 ${isActive ? "text-purple-600 underline" : ""}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {link?.name}
                  </NavLink>
                </li>
              ))}
              <li className="w-full">
                {!isAuthenticated ? (
                  <button
                    className="w-full bg-[#3400B1] px-4 py-3 text-white rounded-full text-sm hover:bg-white hover:text-[#3400B1] border-2 border-[#3400B1] hover:scale-105 font-bold transition-all duration-500 ease-in-out"
                    onClick={() => {
                      setClickConnectWallet(true);
                      setMenuOpen(false);
                    }}
                  >
                    { t('Sidenavbar.getStarted')}
                  </button>
                ) : (
                  <button
                    className="w-full px-4 py-3 bg-[#3400B1] text-white font-poppins text-base rounded-full hover:text-[#3400B1] hover:bg-white border-2 border-[#3400B1] hover:scale-105 font-normal transition-all duration-500 ease-in-out"
                    onClick={() => {
                      if (!isLoading) {
                        logout();
                      }
                      setMenuOpen(false);
                    }}
                  >
                    { t('Sidenavbar.Logout')}
                  </button>
                )}
              </li>
            </ul>
          </div>
        </nav>

      </div>
    </>
  );
};

export default Sidenavbar;
