import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
export default function AskAQuestion() {
    const { t } = useTranslation();
    const [question, setQuestion] = useState('');

    const handleChange = (event) => {
        setQuestion(event.target.value);
    }

    return (
        <div className='container relative'>
        
        <div className="absolute top-[-20px]  right-[-20px] z-10">
            <svg width="113" height="113" viewBox="0 0 113 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="56.5" cy="56.5" r="56.5" fill="#5B61EB" />
            </svg>
        </div>
    
       
        <div className="container mx-auto px-4 py-8 font-poppins rounded-xl backdrop-blur-xl bg-white bg-opacity-60 relative z-50 border-1px-black">
            <div className="px-8 py-6">
                <h2 className="font-bold mb-4 text-xl">{t('MyCourses.Askquestion')}</h2>
                <div className="flex">
                    <div className="w-2/3">
                        <p className="text-gray-600 mb-4 text-lg">{t('MyCourses.weeklyoverview')} </p>
                    </div>
                </div>
    
                <div className="mb-4 flex ">
                    <input
                        className="w-full h-14 rounded-lg p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mr-2"
                        placeholder="Type your question here..."
                        value="Your Question"
                        onChange={handleChange}
                    />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg h-14">
                    {t('Submit')}
                    </button>
                </div>
            </div>
        </div>
    
       
        <div className="relative bottom-20 left-[-20px]">
            <svg width="124" height="124" viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="62" cy="62" r="62" fill="#33EFA0" />
            </svg>
        </div>
    </div>
    





    )
}