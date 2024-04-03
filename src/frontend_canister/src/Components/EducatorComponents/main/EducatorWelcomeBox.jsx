import React from 'react'
import EducatorWelcomeImage from "../../../../assets/images/hero-img.png"

const EducatorWelcomeBox = () => {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex flex-col-reverse items-center justify-between w-full md:flex-row">
                <div className="mx-auto my-3 md:my-4 text-white lg:mx-10 md:mx-4 p-4 md:p-0">
                    <p className="flex items-start justify-start text-small text-[16px] lightfont">
                        April 30,Tuesday
                    </p>
                    <div className="my-2 lg:my-8">
                        <h1 className="my-2 text-4xl font-bold">Welcome Back, Suraj!</h1>
                        <p className="text-lg mt-2 font-normal">
                            2000 new students registered!
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