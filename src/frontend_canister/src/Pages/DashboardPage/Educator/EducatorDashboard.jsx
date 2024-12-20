import React,{useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import DrawerSidebar from "../../../Components/Sidebar/DrawerSidebar";
import SideBar from "../../../Components/Sidebar/SideBar";
import Navbar from "../../../Components/Navbar/Navbar";
import Certificates from "./certificates/EducatorCertificates";
import EducatorProfile from "./profile/EducatorProfile";
// import Settings from "./settings/Settings";
import UploadCourse from "./Courses/UploadCourses";
import Enrollment from "./Enrollment/Enrollment";
import EducatorMain from "./main/EducatorMain";
import MyUploadedCourses from './Courses/MyUploadedCourses'
import EditEducatorprofile from './profile/EditEducatorprofile'
import noaccess from "../../../../assets/images/no_access.png";
import { Principal } from '@dfinity/principal';
import { useAuth } from "../../../Components/utils/useAuthClient";
import Loader from "../../../Components/Loader/Loader";
import copy from 'copy-text-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";

// Pending: Code Splitting with Lazy & Suspense ⚠️⚠️

const EducatorDashboard = () => {
  const { actor } = useAuth();  
  const [authorisedUser,SetAuthorisedUser] = useState(false);
  const [Loading,setLoading] = useState(true);
  const [currentPrincipal,setCurrentPrincipal] = useState(null);
  const { t } = useTranslation();

  function matchPrincipal(principalArray, targetPrincipal) {
    for (let i = 0; i < principalArray.length; i++) {
        let currentPrincipal = principalArray[i]._arr;
        let isMatch = true;

        for (let j = 0; j < currentPrincipal.length; j++) {
            if (currentPrincipal[j] !== targetPrincipal._arr[j]) {
                isMatch = false;
                break;
            }
        }

        if (isMatch) {
            return i; // Return the index of the matching principal
        }
    }

    return -1; // Return -1 if no match is found
}

function handelCopy(currentPrincipal){
  toast.success("copied");
  copy(currentPrincipal);
}

useEffect(()=>{
  const fetchUsers = async () => {
    try {
      setLoading(true);
        const backendCanisterId = Principal.fromText(process.env.CANISTER_ID_BACKEND_CANISTER);
        console.log(backendCanisterId)
        console.log(backendCanisterId,'this is the backend canister');
        const allController= await actor.get_controllers(backendCanisterId);
        const callerId = await actor.get_caller();
        let matchIndex = matchPrincipal(allController, callerId);
        if (matchIndex !== -1) {
          setCurrentPrincipal(callerId.toText());
          setLoading(false)
          SetAuthorisedUser(true);
        } else {
            setCurrentPrincipal(callerId.toText());
            console.log('No matching principal found');
            setLoading(false)
        }        
        console.log("callerId", callerId.toText());
        console.log(allController,'All Controller');
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

fetchUsers();
}, [actor])



  return (
    <div className="w-full h-screen bg-[#EFF1FF] flex">
      <div className="sticky top-0 hidden w-full h-full bg-white sm:w-1/12 lg:w-2/12 md:block">
        <SideBar type="educator" />
      </div>

      <DrawerSidebar type="educator" />
      {Loading ? (
  <Loader />
) : (
  authorisedUser ? (
    <div className="w-full pb-8 overflow-auto sm:w-11/12 lg:w-10/12">
      <Navbar type="educator" />
      <div className="flex w-full">
        <Routes>
          <Route path="/main" element={<Enrollment />} />
          <Route path="/my-courses" element={<MyUploadedCourses />} />
          <Route path="/my-courses/upload-course" element={<UploadCourse />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/my-profile" element={<EducatorProfile />} />
          <Route path="/enrollments" element={<Enrollment />} />
          <Route path="/my-profile/edit-profile" element={<EditEducatorprofile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center w-full pb-8 overflow-auto lg:w-10/12 sm:w-11/12">
      <div className="flex items-center justify-center w-full">
        <img className="w-[30rem] drop-shadow-lg" src={noaccess} alt="No Access" />
      </div>
      <h1 className="text-xl font-bold text-red-500">{t('EducatorDashboard.authorizedHeadingMsg')}</h1>
      <p className="text-sm text-gray-500">{t('EducatorDashboard.authorizedSmallMsg')}</p>
      <div className="bg-[#E4E4FE] flex flex-col gap-2 items-center justify-center my-5 p-5 rounded-lg px-10">
          <p className="text-sm text-gray-700">{t('EducatorDashboard.copy_msg_1')}</p>
          <div className="px-4 py-2 rounded-lg cursor-pointer bg-green-50 hover:bg-[#fff] drop-shadow-lg" onClick={()=>handelCopy(currentPrincipal)}>
            <p className="text-blue-600">{currentPrincipal}</p>
          </div>
          <p className="text-sm text-gray-700">{t('EducatorDashboard.copy_msg_2')}</p>
      </div>
    </div>
  )
)}

<ToastContainer />
    </div>
  )
}

export default EducatorDashboard;