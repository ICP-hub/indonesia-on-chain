import React, { useState } from 'react';
import StudentProfileComponent from '../../../../Components/StudentComponents/StudentProfileComponent';
const StudentProfile = () => {


  return (
    <section className=' bg-[#EFF1FE]'>

      <div className='h-full grid-cols-12 md:grid lg:flex'>
        <div className='flex flex-col col-span-12 p-4 xl:col-span-10 md:col-span-9 '>
          <div className='w-full'>
            <StudentProfileComponent />
          </div>
        </div>
      </div>

    </section>
  );
};

export default StudentProfile;