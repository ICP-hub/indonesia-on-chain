import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import IndonesiaOnChain from "../../../assets/Vectors/IndonesiaOnChain.png";
import {
  checkLoginOnStart,
  loginStart,
} from "../Reducers/InternetIdentityReducer";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.internet);
  const [isLoading, setIsLoading] = useState(false);
  const [shadow, setShadow] = useState(false);
  const NavbarLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Blog",
      path: "/blog",
    },
    {
      name: "About Us",
      path: "/about-us",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      dispatch(loginStart());
      setIsLoading(false);
      dispatch({ type: "CHECK_USER_PRESENT" });
      navigate(
        process.env.DFX_NETWORK === "ic"
          ? "/signup-role"
          : `/signup-role?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   dispatch(checkLoginOnStart());
  // }, [dispatch]);

  return (
    <>
      <nav
        className={`flex justify-between fixed top-0 left-0 w-full z-10 transition duration-300 ease-in-out backdrop-blur-md ${shadow ? "shadow-lg" : ""
          }`}
      >
        <div className="flex items-center justify-center mr-2 ml-28">
          <img src={IndonesiaOnChain} alt="" className="h-3/5" />
        </div>

        <div className="flex px-6">
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
                className="px-6 py-3 bg-[#3400B1] text-white font-poppins text-base rounded-full
                hover:bg-white hover:text-[#3400B1] border-2  border-[#3400B1] hover:scale-105 font-normal transition-all duration-500 ease-in-out"
                onClick={() => {
                  !isLoading ? handleLogin() : "";
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
