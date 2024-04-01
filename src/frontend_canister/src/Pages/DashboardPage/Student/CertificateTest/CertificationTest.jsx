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
        // console.log("test initiated for course id", id)
        const AddquestionId = async (questionIds) => {
            const newQuestionData = [];
            let currQues = questionIds;
            let flag = true;

            while (flag) {

                let ques = currQues[0][0];
                newQuestionData.push(ques);

                if (currQues[0][1].length > 0 && currQues[0][1] !== undefined) {
                    currQues = currQues[0][1];
                } else {
                    flag = false;
                }
                // console.log("new Data ",newQuestionData);
            }
            setQuestionsId(newQuestionData);
        }
        const fetchCourse = async () => {
            const courseData = await contentActor.getfullCourse(id);
            // console.log("questionsId recieved:->", courseData.questions);
            await AddquestionId(courseData.questions)
        }

        setLoading(true);
        fetchCourse();
        setLoading(false);

        console.log(questionsId);
    }, []);

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