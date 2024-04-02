import React, { useEffect, useState } from 'react'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useAuth } from '../../utils/useAuthClient';

const SingleQuestion = ({
    handleUserResponse,
    userResponse,
    currentQuestion,
    handlePrevious,
    QuesDB,
    handleTestSubmit,
}) => {
    const [questionData, setQuestionData] = useState();
    const [options, setOptions] = useState([]);
    const { contentActor } = useAuth();
    const getrandomquestions = async () => {
        const question = await contentActor.getrandomquestion("1711947755744603553");
        setQuestionData(question);
        let newOptions = [];
        newOptions.push(question.option1);
        newOptions.push(question.option2);
        newOptions.push(question.option3);
        newOptions.push(question.option4);
        setOptions(newOptions);
        console.log(question);
    }


    useEffect(() => {
        const fetch = async () => {
            await getrandomquestions();
        }
        fetch();
    }, []);


    const handleNext1 = () => {
        getrandomquestions();
    };

    return (
        questionData ?
            <div className="w-full mt-8 py-2">
                <div key={questionData.questionId}>
                    <h1 className='text-lg font-semibold'> {questionData.question}</h1>
                    <div className='flex flex-col gap-3 mt-3'>
                        <RadioGroup
                            onChange={handleUserResponse}
                        >
                            {
                                options.map((item, index) => (
                                    <FormControlLabel key={index} value={item} className='w-fit' control={<Radio size='small' />} label={item} />
                                ))
                            }
                        </RadioGroup>

                    </div>
                </div>
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
                            <button className='outline-none bg-[#7B61FF] p-2 px-3 rounded-md text-white' onClick={handleNext1}>Next</button>
                    }
                </div>
            </div> : null
    )
}

export default SingleQuestion