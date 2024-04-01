import React, { useEffect, useState } from 'react'
import QuesDB from "../../../../../assets/test-ques.json"
// import QuestionNav from '../../../../Components/StudentComponents/CertificateTest/QuestionNav';
import SingleQuestion from '../../../../Components/StudentComponents/CertificateTest/SingleQuestion';
import TestResult from '../../../../Components/StudentComponents/CertificateTest/TestResult';
import { useAuth } from '../../../../Components/utils/useAuthClient';
import { useParams } from "react-router-dom";
import Loader from '../../../../Components/Loader/Loader';

const CertificationTest = () => {
    const { contentActor } = useAuth();
    const { id } = useParams();
    const [Loading, setLoading] = useState(false);
    const [questionsId, setQuestionsId] = useState([]);

    useEffect(() => {
        const AddquestionData = async (questionIds) => {
            const newQuestionData = [];
            let currQues = questionIds;
            let flag = true;
    
            while (flag) {
                let quesId = currQues[0];
                const question = await contentActor.getquestion(quesId);
                newQuestionData.push(question);
    
                if (currQues[1].length > 0 && currQues[1] !== undefined) {
                    currQues = currQues[1];
                } else {
                    flag = false;
                }
            }
            setQuestionsData(newQuestionData);
        };
    
        const fetchCourse = async () => {
            const courseData = await contentActor.getfullCourse(id);
            await AddquestionData(courseData.questions);
        };
    
        setLoading(true);
        fetchCourse().then(() => setLoading(false));
    
        // Note: Since fetching data is asynchronous, you may not see updated `questionsData` immediately after setting it.
    }, []);
    

    console.log(questionsId);

    console.log("Questions ID after processed",questionsId);
    return (
        <div>
            {Loading ? (
                <Loader />
            ) : (
                <div className="flex flex-col w-full p-3 mt-5 md:px-14 lg:flex-row">
                    <div className="w-full pr-8 lg:w-7/12 xl:w-8/12">
                        <div className="w-full">
                            {/* <h1 className='mb-4 text-3xl font-semibold'>{isTestSubmitted ? "Test Score" : "Test"}</h1> */}
                            {/* <p>{isTestSubmitted ? `You scored:` : "This test contains 10 questions with one points each. They are related to the video contents you have previously watched. Obtain 7 marks or more to receive certificate."}

                                {
                                    isTestSubmitted &&
                                    <span className={`text-lg font-semibold ml-1 ${totalPoints >= 7 ? "text-green-600" : "text-red-600"}`}>{totalPoints}</span>
                                }</p> */}
                        </div>
                        {
                            // !isTestSubmitted ?
                            //     <SingleQuestion
                            //         handleUserResponse={handleUserResponse}
                            //         userResponse={userResponse}
                            //         currentQuestion={currentQuestion}
                            //         handlePrevious={handlePrevious}
                            //         QuesDB={QuesDB}
                            //         handleTestSubmit={handleTestSubmit}
                            //         handleNext={handleNext}
                            //     />
                            //     :
                            //     <TestResult
                            //         totalPoints={totalPoints}
                            //         handleTestSubmit={handleTestSubmit}
                            //         handleTestRetake={handleTestRetake}
                            //         QuesDB={QuesDB}
                            //         handleUserResponse={handleUserResponse}
                            //         userResponse={userResponse}
                            //     />
                        }
                    </div>
                    {/* <QuestionNav
                QuesDB={QuesDB}
                currentQuestion={currentQuestion}
                isTestSubmitted={isTestSubmitted}
                userResponse={userResponse}
                totalPoints={totalPoints}
                handleSideQuesNav={handleSideQuesNav}
            /> */}
                </div>
            )}
        </div>
    )
}

export default CertificationTest