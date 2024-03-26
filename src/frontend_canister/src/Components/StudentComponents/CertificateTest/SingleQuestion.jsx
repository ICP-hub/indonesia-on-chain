import React from 'react'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

const SingleQuestion = ({
    handleUserResponse,
    userResponse,
    currentQuestion,
    handlePrevious,
    QuesDB,
    handleTestSubmit,
    handleNext,
}) => {
    return (
        <div className="w-full mt-8 py-2">
            {
                QuesDB.slice(currentQuestion, currentQuestion + 1).map((item, index) => (
                    <div key={index}>
                        <h1 className='text-lg font-semibold'>{currentQuestion + 1}. {item.question}</h1>
                        <div className='flex flex-col gap-3 mt-3'>
                            <RadioGroup
                                onChange={handleUserResponse}
                                value={userResponse.find(i => i.question === item.question)?.answer || ""}
                            >
                                {
                                    item.options.map((item, index) => (
                                        <FormControlLabel key={index} value={item} className='w-fit' control={<Radio size='small' />} label={item} />
                                    ))
                                }
                            </RadioGroup>

                        </div>
                    </div>
                ))
            }
            <div className="w-full flex justify-start gap-4 mt-5">
                {
                    currentQuestion > 0 &&

                    <button className='outline-none text-[#7B61FF] p-2 px-3 rounded-md border border-[#7B61FF]' onClick={handlePrevious}>Previous</button>
                }
                {
                    currentQuestion + 1 === QuesDB.length ?
                        <button className='outline-none bg-[#7B61FF] p-2 px-3 rounded-md text-white'
                            onClick={handleTestSubmit}
                            disabled={
                                userResponse.length === 0 ||
                                userResponse.length < 7
                            }>Submit</button> :
                        <button className='outline-none bg-[#7B61FF] p-2 px-3 rounded-md text-white' onClick={handleNext}>Next</button>
                }
            </div>
        </div>
    )
}

export default SingleQuestion