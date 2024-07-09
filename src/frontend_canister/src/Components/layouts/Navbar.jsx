import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { useAuth } from "../utils/useAuthClient";
import IndonesiaOnChain from "../../../assets/images/IndonesiaOnChain.png";
import Loader from "../Loader/Loader";
import Sidenavbar from "./Sidenavbar";
import LanguageButton from "./LanguageButton/LanguageButton";
import { useTranslation } from 'react-i18next';
import { logoutStart } from '../Reducers/InternetIdentityReducer';
const Navbar = ({ setClickConnectWallet }) => {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout, actor, authClient, contentActor } = useAuth();
  const UserRole = useSelector((state) => state.users.role);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [usertest, setusertest] = useState();
  const [loadingDashboard, setloadingDashboard] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const NavbarLinks = [
    {
      name: t('navbar.home'),
      path: "/#",
    },
    {
      
      name: t('navbar.features'),
      path: "/#features",
    },
    {
      
      name: t('navbar.about'),
      path: "/#about",
    },
  ];

  const DashboardLink = {
    name: t('navbar.dashboard'),
    path: usertest === "student" ? "/student-dashboard/main" : usertest === "educator" ? "/educator-dashboard/main" : "/signup-role",
  };

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

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
      <nav className={`flex items-center fixed top-0 left-0 w-full z-20 transition duration-300 ease-in-out backdrop-blur-md ${shadow ? "shadow-lg" : ""}`}>
        <div className="flex justify-between w-full">
          <div className="flex justify-center items-center mr-2 ml-6 md:ml-28">
            <img src={IndonesiaOnChain} alt="" className="h-3/5 left-0" />
          </div>
          <div className="flex md:hidden mr-6">
          <div className="flex justify-center items-center pr-3 z-20"> <LanguageButton/> </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
              
              {menuOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={`hidden md:flex flex-col md:flex-row items-center md:mr-16 space-y-4 md:space-y-0 md:space-x-8`}>
          <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            {NavbarLinks.map((link, index) => (
              <li key={index}  className="whitespace-nowrap">
                
                
                <HashLink
                    smooth
                    to={link.path}
                    className={`px-4 py-2 font-poppins font-normal text-base leading-7 whitespace-nowrap   ${link.path === window.location.pathname + window.location.hash ? "text-purple-600 " : ""}`}
                  >
                    {link.name}
                  </HashLink>
                 
              </li>
            ))}
             <li  className=""> <NavLink className="block px-4 py-2 font-poppins font-normal text-base leading-7 "><LanguageButton/> </NavLink></li>
            {isAuthenticated && (
              <li>
                {loadingDashboard ? (
                  <Loader />
                ) : (
                  <NavLink
                    to={process.env.DFX_NETWORK === "ic" ? DashboardLink?.path : `${DashboardLink?.path}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`}
                    className={({ isActive }) =>
                      `px-4 py-2 font-poppins font-normal text-base leading-7 ${isActive ? "text-purple-600 " : ""}`
                    }
                  >
                    {DashboardLink?.name}
                  </NavLink>
                )}
              </li>
            )}
            <li>
              {!isAuthenticated ? (
                <button
                  className="bg-[#3400B1] w-36 lg:px-7 lg:py-3 px-2 py-4 text-white rounded-full text-sm hover:bg-white hover:text-[#3400B1] border-2 border-[#3400B1] hover:scale-105 font-bold transition-all duration-500 ease-in-out"
                  onClick={() => setClickConnectWallet(true)}
                >
                 { t('navbar.getStarted')}
                </button>
              ) : (
                <button
                  className="px-6 py-3 bg-[#3400B1] text-white font-poppins text-base rounded-full hover:text-[#3400B1] hover:bg-white border-2 border-[#3400B1] hover:scale-105 font-normal transition-all duration-500 ease-in-out"
                  // onClick={logout}
                  // onClick={() => {
                  //   if (!isLoading) {
                  //     logout();
                  //   }
                  //   setMenuOpen(false);
                  // }}
                  onClick={() => { !isLoading && handleLogout() }}
                >
                  { t('navbar.logout')}
                </button>
              )}
            </li>
          </ul>
        </div>
        {menuOpen && (
          <div className={`absolute top-16 left-0 w-1/2 bg-white shadow-md md:hidden mt-[51px] h-screen transition-transform duration-500 ease-in-out transform ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <ul className="flex flex-col justify-center items-center space-y-4 p-4">
              {NavbarLinks.map((link, key) => (
                <li key={key} className="w-full">
                  <NavLink
                    to={link?.path}
                    className={({ isActive }) =>
                      `block px-4 py-2 font-poppins font-normal text-center leading-7 ${isActive ? "text-purple-600 " : ""}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {link?.name}
                  </NavLink>
                </li>
              ))}
                 
              {isAuthenticated && (
                <li className="w-full ">
                  {loadingDashboard ? (
                    <Loader />
                  ) : (
                    <NavLink
                      to={process.env.DFX_NETWORK === "ic" ? DashboardLink?.path : `${DashboardLink?.path}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-center font-poppins font-normal text-base leading-7 ${isActive ? "text-purple-600 " : ""}`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {DashboardLink?.name}
                    </NavLink>
                  )}
                </li>
              )}
            
              <li className="w-full flex  justify-center items-center">
                {!isAuthenticated ? (
                  <button
                    className="w-[144px] bg-[#3400B1] px-4 py-3 text-white rounded-full text-sm hover:bg-white hover:text-[#3400B1] border-2 border-[#3400B1] hover:scale-105 font-bold transition-all duration-500 ease-in-out"
                    onClick={() => {
                      setClickConnectWallet(true);
                      setMenuOpen(false);
                    }}
                  >
                   { t('navbar.getStarted')}
                  </button>
                ) : (
                  <button
                    className="w-full px-4 py-3 bg-[#3400B1] text-white font-poppins text-base rounded-full hover:text-[#3400B1] hover:bg-white border-2 border-[#3400B1] hover:scale-105 font-normal transition-all duration-500 ease-in-out"
                    // onClick={() => {
                    //   if (!isLoading) {
                    //     logout();
                    //   }
                    //   setMenuOpen(false);
                    // }}
                    onClick={() => { !isLoading && handleLogout() }}
                  >
                    { t('navbar.logout')}
                  </button>
                )}
              </li>
            </ul>
          </div>
        )}

      </nav>
    </>
  );
};

export default Navbar;