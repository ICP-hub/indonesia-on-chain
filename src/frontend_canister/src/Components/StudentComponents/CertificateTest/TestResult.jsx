import React from 'react'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const TestResult = ({
    totalPoints,
    handleTestSubmit,
    handleTestRetake,
    QuesDB,
    handleUserResponse,
    userResponse,
}) => {
    const { t } = useTranslation();
    return (
        <div className="w-full py-2 mt-8">
            <h1 className='text-2xl font-semibold'>{
                totalPoints >= 7 ? "Congratulations you are eligible for receiving the certificate!" : "Sorry, you are not eligible for receiving the certificate. Better luck next time!"
            }</h1>


            <div className="flex w-full gap-3 py-8">
                {
                    totalPoints >= 7 ? <button className='outline-none bg-[#7B61FF] p-2 px-3 rounded-md text-white' onClick={handleTestSubmit}>{t('TestResult.ViewCertificate')}</button> : <button className='outline-none bg-[#7B61FF] p-2 px-3 rounded-md text-white' onClick={handleTestRetake}>{t('TestResult.RetakeTest')}</button>
                }

                <Link to={'/all_courses?title=All%20Courses'} className='outline-none text-[#7B61FF] bg-white p-2 px-3 rounded-md border border-[#7B61FF]'>{t('TestResult.BrowseCourses')}</Link>
            </div>

            <div className="w-full mt-6">
                <h1 className='text-2xl font-semibold'>{t('TestResult.TestReview')}</h1>
                {
                    QuesDB.map((item, index) => (
                        <div key={index} className='my-6'>
                            <h1 className='text-lg font-semibold'>{index + 1}. {item.question}</h1>
                            <div className='flex flex-col gap-3 mt-3'>
                                <RadioGroup
                                    onChange={handleUserResponse}
                                    value={userResponse.find(i => i.question === item.question)?.answer || ""}
                                    disabled={true}
                                >
                                    {
                                        item.options.map((item, index) => (
                                            <FormControlLabel key={index} value={item} control={<Radio size='small' disabled={true} />} label={item} />
                                        ))
                                    }
                                </RadioGroup>

                            </div>
                            <div className="w-full text-sm font-medium">
                                <p>{t('TestResult.CorrectAnswer')}: {item.answer}</p>
                                {
                                    userResponse.find(i => i.question === item.question)?.answer === item.answer ? <p className='text-[#75A75E]'>{t('TestResult.YourAnswer')}: {userResponse.find(i => i.question === item.question)?.answer || ""}</p> : <p className='text-[#A75E5E]'>{t('TestResult.YourAnswer')}: {userResponse.find(i => i.question === item.question)?.answer || ""}</p>
                                }

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TestResult