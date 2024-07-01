import React from 'react';
import EducatorProfileComponent from '../../../../Components/EducatorComponents/profile/EducatorProfileComponent';
const EducatorProfile = () => {


    return (
        <section className=' bg-[#EFF1FE] w-full'>
            <div className='h-full grid-cols-12 '>
                <div className='flex flex-col col-span-12 p-4 xl:col-span-10 md:col-span-9 '>
                    <div className='w-full'>
                        <EducatorProfileComponent />
                    </div>
                </div>
            </div>

        </section>
    );
};

export default EducatorProfile;

