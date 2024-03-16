import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LandingPageMainSvg } from '../utils/svgData';
import { checkLoginOnStart, loginStart } from '../Reducers/InternetIdentityReducer';
import IndonesiaOnChain from '../../../assets/Vectors/IndonesiaOnChain.png'
import { NavLink } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.internet);
  const [isLoading, setIsLoading] = useState(false);
  const { isUserPresent } = useSelector((state) => state.users)



  // const checkUser = () => {
  //   if (!isUserPresent) {
  //     navigate(
  //       process.env.DFX_NETWORK === "ic"
  //         ? '/signup-role'
  //         : `/signup-role?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`
  //     );
  //   }
  // }
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      dispatch(loginStart());
      setIsLoading(false);

      // const hello =await 
      dispatch({ type: 'CHECK_USER_PRESENT' })
      navigate(
        process.env.DFX_NETWORK === "ic"
          ? '/signup-role'
          : `/signup-role?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`
      );
      // console.log(hello);
      // checkUser();
    }
    catch (error) {
      console.error(error);
    }
  };


  // useEffect(() => {
  //     if (isAuthenticated) {
  //         navigate(
  //             process.env.DFX_NETWORK === "ic"
  //                 ? '/signup'
  //                 : `/signup?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`);
  //     }
  // }, [isAuthenticated]);

  useEffect(() => {
    dispatch(checkLoginOnStart());
  }, [dispatch]);

  return (
    <>
      <nav className='fixed  top-0 h-[150px] left-0 w-full z-10 transition duration-300 ease-in-out backdrop-blur-sm'>

        <div className="h-8 mr-2 ml-28 ">
          <img src={IndonesiaOnChain} alt="" className='mt-[2.5rem]' />
        </div>

        <div className="flex px-6 mx-auto justify-end -mt-8">
          <ul className="inline-flex items-center mr-16 space-x-8">
            {NavbarLinks.map((link, key) => (
              <li key={key}>
                <NavLink
                  to={link?.path}
                  className={({ isActive }) =>
                    `px-4 py-2 font-poppins font-normal text-base leading-7 ${isActive ? "text-purple-600 underline" : ""
                    }`
                  }
                >
                  {link?.name}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                className="px-6 py-3 bg-[#3400B1] text-white font-poppins text-base font-normal rounded-full"
                onClick={() => {
                  !isLoading ? handleLogin() : ''
                }}
              >
                Get Started
              </button>
            </li>
          </ul>
        </div>

      </nav>
    </>
  );
};

export default Navbar;