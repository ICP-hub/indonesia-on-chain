import React, { useEffect, useState } from 'react'
import EducatorWelcomeImage from "../../../../assets/images/hero-img.png"
import { useSelector } from 'react-redux';

const EducatorWelcomeBox = ({ setLoading, data }) => {
    const [currentDate, setCurrentDate] = useState();
    const { userInfo, userInfoError } = useSelector(state => state.users)
    useEffect(() => {
        function getCurrentDate() {
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'
            ];

            const days = [
                'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
            ];

            const currentDate = new Date();
            const month = months[currentDate.getMonth()];
            const dayOfMonth = currentDate.getDate();
            const dayOfWeek = days[currentDate.getDay()];

            return `${month} ${dayOfMonth}, ${dayOfWeek}`;
        }

        const CalDate = getCurrentDate();
        setCurrentDate(CalDate);
    },[])
    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex flex-col-reverse items-center justify-between w-full md:flex-row">
                <div className="mx-auto my-3 md:my-4 text-white lg:mx-10 md:mx-4 p-4 md:p-0">
                    <p className="flex items-start justify-start text-small text-[16px] lightfont">
                        {currentDate}
                    </p>
                    <div className="my-2 lg:my-8">
                        <h1 className="my-2 text-4xl font-bold">Welcome Back, {userInfo.userName}!</h1>
                        <p className="text-lg mt-2 font-normal">
                            {data.newStudentCount} new students registered!
                        </p>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <img
                        src={EducatorWelcomeImage}
                        className="w-[80%] md:w-[95%] drop-shadow-lg"
                        alt="side images"
                    />
                </div>
            </div>
        </div>
    )
}

export default EducatorWelcomeBox