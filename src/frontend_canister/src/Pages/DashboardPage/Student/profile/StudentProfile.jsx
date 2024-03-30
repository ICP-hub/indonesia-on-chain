import React, { useState } from 'react';
// import StudentProfileNavbar from '../../../../Components/StudentComponents/StudentProfileNavbar';
import StudentProfileComponent from '../../../../Components/StudentComponents/StudentProfileComponent';
import StudentSideBar from '../../../../Components/DashBoardComponents/Student/SideBar';
import MobileSideBar from '../../../../Components/DashBoardComponents/Student/MobileSidebar';
const StudentProfile = () => {


  return (
    <section className=' bg-[#EFF1FE]'>

      <div className='h-full grid-cols-12 md:grid'>
        <div className='flex flex-col col-span-12 p-4 xl:col-span-10 md:col-span-9 '>
          <div className='w-full mt-[6.25rem]'>
            <StudentProfileComponent />
          </div>
        </div>
      </div>

    </section>
  );
};

export default StudentProfile;