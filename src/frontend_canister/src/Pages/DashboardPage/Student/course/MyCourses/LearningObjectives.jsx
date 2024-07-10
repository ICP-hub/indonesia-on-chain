import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
function LearningObjectives({ learningObjectives }) {

    const { t } = useTranslation();
    return (
        <div className="container mx-auto px-4 py-8 font-poppins rounded-xl">
            <div className="bg-white rounded-lg shadow-md px-8 py-6">
                <h2 className='font-bold text-lg mb-4 pl-[15px]'>{t('MyCourses.Whatlearn')}</h2>
                <ul className="space-y-4">
                    {learningObjectives.map((objective, index) => (
                        <li key={index} className="flex items-center">
                            <svg className="w-6 h-7 mr-3" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_110_2789)">
                                    <path d="M8.62491 17.9727L4.62866 14L3.26782 15.3433L8.62491 20.6688L20.1249 9.23659L18.7737 7.89331L8.62491 17.9727Z" fill="#2D2F31" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_110_2789">
                                        <rect width="23" height="28" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span>{objective}</span>
                        </li>
                    ))}

                </ul>
            </div>
        </div>


    );
}

export default LearningObjectives;