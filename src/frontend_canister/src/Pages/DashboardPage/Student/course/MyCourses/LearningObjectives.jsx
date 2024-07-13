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
                            <span><p dangerouslySetInnerHTML={{ __html:objective}} /></span>
                        </li>
                    ))}

                </ul>
            </div>
        </div>


    );
}

export default LearningObjectives;