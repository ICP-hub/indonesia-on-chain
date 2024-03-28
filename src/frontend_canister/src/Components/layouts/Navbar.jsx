import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../utils/useAuthClient";
import IndonesiaOnChain from "../../../assets/Vectors/IndonesiaOnChain.png";
import Loader from "../Loader/Loader";


const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout, actor, authClient, contentActor } = useAuth();
  const UserRole = useSelector((state) => state.users.role);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [usertest, setusertest] = useState();
  const [loadingDashboard, setloadingDashboard] = useState(false);
  const NavbarLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Features",
      path: "/features",
    },
    {
      name: "Courses",
      path: "/courses",
    },

  ];

  const DashboardLink = {
    name: "Dashboard",
    path: usertest === "student" ? "/student-dashboard" : usertest === "educator" ? "/educator-dashboard" : "/signup-role",
  }

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
        // console.log("navbar user_data recieved->", user_data);
        setusertest(user_data.ok.role);
        // console.log("testing",usertest);
        const Data = {
          emailId: user_data.ok.email,
          userName: user_data.ok.userName,
          name: user_data.ok.name,
          phone: user_data.ok.phone,
          role: user_data.ok.role,
        }
        // console.log(Data);
        dispatch({ type: 'STORE_USER_DATA', payload: Data });
      }
    }
  


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


            {isAuthenticated && (
              <li>
                {loadingDashboard ? ( // Show loader if loadingDashboard is true

                  <Loader />

                ) : (
                  <NavLink
                    to={process.env.DFX_NETWORK === "ic" ? DashboardLink?.path : `${DashboardLink?.path}?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`}
                    className={({ isActive }) =>
                      `px-4 py-2 font-poppins font-normal text-base leading-7 ${isActive ? "text-purple-600 underline" : ""}`
                    }
                  >
                    {DashboardLink?.name}
                  </NavLink>
                )}
              </li>
            )}
            <li>
              {
                !isAuthenticated ? (
                  <button
                    className="px-6 py-3 bg-[#3400B1] text-white font-poppins text-base rounded-full
                hover:bg-white hover:text-[#3400B1] border-2  border-[#3400B1] hover:scale-105 font-normal transition-all duration-500 ease-in-out"
                    onClick={() => {
                      !isLoading ? handleLogin() : "";
                    }}
                  >
                    Get Started
                  </button>
                ) : (
                  <button
                    className="px-6 py-3 bg-[#3400B1] text-white font-poppins text-base rounded-full
                hover:bg-white hover:text-[#3400B1] border-2  border-[#3400B1] hover:scale-105 font-normal transition-all duration-500 ease-in-out"
                    onClick={() => {
                      !isLoading ? logout() : "";
                    }}
                  >
                    Logout
                  </button>
                )
              }

            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};


export default Navbar;
