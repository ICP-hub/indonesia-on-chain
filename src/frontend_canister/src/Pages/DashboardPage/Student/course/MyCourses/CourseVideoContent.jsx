import React from 'react';
import { useAuth } from '../../../../../Components/utils/useAuthClient';
import { useNavigate } from 'react-router-dom';

function CourseVideoContent({ }) {
    const { contentActor } = useAuth();
    console.log("Content Actor", contentActor);
    const navigate = useNavigate({});
    return (
        <div className="container mx-auto px-4 py-8 font-poppins rounded-xl">
            <div className="bg-white rounded-lg shadow-md px-8 py-6">
                <div className="flex flex-col space-y-4">
                    <div>
                        <h2 className="text-xl text-gray-700">Full Course</h2>
                        <h4 className="text-lg text-black-500 font-bold space-y-2">FREE</h4>
                        <h6 className="text-md text-black-500 mt-4">Course Includes:</h6>
                    </div>
                    <ul className="space-y-4">
                        {/* {videoData.map((video, key) =>(
                            
                        ))} */}
                    </ul>
                </div>

                <button
                    className={`mt-6 py-2 px-6 ${isEnrolled ? 'bg-gray-400' : 'bg-[#7B61FF]'} text-white font-bold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-full`}
                    disabled={isEnrolled}
                >
                    {isEnrolled ? "Already Enrolled" : "Enroll Now"}
                </button>
            </div>
        </div>
    );
}

export default CourseVideoContent;











