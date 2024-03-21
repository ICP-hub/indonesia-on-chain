import React, { useState } from 'react';
import StudentProfileNavbar from '../../../../Components/StudentComponents/StudentProfileNavbar';
import StudentProfileComponent from '../../../../Components/StudentComponents/StudentProfileComponent';
import StudentSideBar from '../../../../Components/DashBoardComponents/Student/SideBar';
import MobileSideBar from '../../../../Components/DashBoardComponents/Student/MobileSidebar';
const StudentProfile = () => {


  return (
    <section className=' bg-[#EFF1FE]'>

      <div className='h-full grid-cols-12 md:grid'>
        <div className={`xl:col-span-2 md:col-span-3 sticky top-0 h-screen md:block hidden`}>
          <StudentSideBar />
        </div>



        <div className='flex flex-col col-span-12 p-4 xl:col-span-10 md:col-span-9 '>
          <div className='sticky top-0 z-50 w-full backdrop-blur'>
            <StudentProfileNavbar />
          </div>

          <div className='w-full mt-[6.25rem]'>
            <StudentProfileComponent />
          </div>


        </div>
      </div>

      <div className='sticky bottom-0 z-20 block md:hidden'>
        <MobileSideBar />
      </div>

    </section>
  );
};

export default StudentProfile;