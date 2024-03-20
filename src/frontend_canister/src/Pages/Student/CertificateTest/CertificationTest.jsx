import React, { useEffect } from 'react'
import QuesDB from "../../../../assets/test-ques.json"
import QuestionNav from '../../../Components/StudentComponents/CertificateTest/QuestionNav';
import SingleQuestion from '../../../Components/StudentComponents/CertificateTest/SingleQuestion';
import TestResult from '../../../Components/StudentComponents/CertificateTest/TestResult';

// initial state
const initialState = {
    loading: true,
    currentQuestion: 0,
    userResponse: [],
    totalPoints: 0,
    isTestSubmitted: false,
}

const certificateTestReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case "CURRENT_QUESTION":
            return {
                ...state,
                currentQuestion: action.payload,
            }
        case "USER_RESPONSE":
            return {
                ...state,
                loading: false,
                userResponse: action.payload,
            }
        case "TOTAL_POINTS":
            return {
                ...state,
                totalPoints: action.payload,
            }
        case "TEST_SUBMITTED":
            return {
                ...state,
                isTestSubmitted: action.payload,
            }
        default:
            return state
    }
}
const CertificationTest = () => {
    const [state, dispatch] = React.useReducer(certificateTestReducer, initialState)
    const { currentQuestion, userResponse, totalPoints, isTestSubmitted } = state

    const handleUserResponse = (e) => {
        dispatch({
            type: "USER_RESPONSE",
            payload: [
                ...userResponse.filter(i => i.question !== QuesDB[currentQuestion].question),
                {
                    question: QuesDB[currentQuestion].question,
                    answer: e.target.value,
                }
            ]
        })
    }

    const handleNext = () => {
        dispatch({
            type: "CURRENT_QUESTION",
            payload: currentQuestion + 1,
        })
    }
    const handlePrevious = () => {
        dispatch({
            type: "CURRENT_QUESTION",
            payload: currentQuestion - 1,
        })
    }
    const handleSideQuesNav = (index) => {
        dispatch({
            type: "CURRENT_QUESTION",
            payload: index,
        })
    }

    const handleTestSubmit = () => {
        let tempTotalPoints = 0;
        for (let i = 0; i < userResponse.length; i++) {
            const isQuesCorrect = QuesDB.find(item => item.question === userResponse[i].question)
            if (userResponse[i].answer === isQuesCorrect.answer) {
                tempTotalPoints += 1
            }
        }

        dispatch({
            type: "TOTAL_POINTS",
            payload: tempTotalPoints,
        })

        dispatch({
            type: "TEST_SUBMITTED",
            payload: true,
        })
        console.log("Temp Total Points", tempTotalPoints);
    }

    const handleTestRetake = () => {
        dispatch({
            type: "TOTAL_POINTS",
            payload: 0,
        })

        dispatch({
            type: "TEST_SUBMITTED",
            payload: false,
        })
        dispatch({
            type: "CURRENT_QUESTION",
            payload: 0,
        })
        dispatch({
            type: "USER_RESPONSE",
            payload: [],
        })
    }

    useEffect(() => {
        console.log(totalPoints);
        console.log(userResponse);
    }, [totalPoints, userResponse]);
    return (
        <div className="w-full p-3 md:px-14 flex flex-col lg:flex-row mt-5">
            <div className="w-full lg:w-7/12 xl:w-8/12 pr-8">
                <div className="w-full">
                    <h1 className='text-3xl font-semibold mb-4'>{isTestSubmitted ? "Test Score" : "Test"}</h1>
                    <p>{isTestSubmitted ? `You scored:` : "This test contains 10 questions with one points each. They are related to the video contents you have previously watched. Obtain 7 marks or more to receive certificate."}

                        {
                            isTestSubmitted &&
                            <span className={`text-lg font-semibold ml-1 ${totalPoints >= 7 ? "text-green-600" : "text-red-600"}`}>{totalPoints}</span>
                        }</p>
                </div>
                {
                    !isTestSubmitted ?
                        <SingleQuestion
                            handleUserResponse={handleUserResponse}
                            userResponse={userResponse}
                            currentQuestion={currentQuestion}
                            handlePrevious={handlePrevious}
                            QuesDB={QuesDB}
                            handleTestSubmit={handleTestSubmit}
                            handleNext={handleNext}
                        />
                        :
                        <TestResult
                            totalPoints={totalPoints}
                            handleTestSubmit={handleTestSubmit}
                            handleTestRetake={handleTestRetake}
                            QuesDB={QuesDB}
                            handleUserResponse={handleUserResponse}
                            userResponse={userResponse}
                        />
                }
            </div>
            <QuestionNav
                QuesDB={QuesDB}
                currentQuestion={currentQuestion}
                isTestSubmitted={isTestSubmitted}
                userResponse={userResponse}
                totalPoints={totalPoints}
                handleSideQuesNav={handleSideQuesNav}
            />
        </div>
    )
}

export default CertificationTest