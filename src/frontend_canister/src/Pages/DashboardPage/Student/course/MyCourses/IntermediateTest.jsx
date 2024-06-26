import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../Components/utils/useAuthClient";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Loader from "../../../../../Components/Loader/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
const IntermediateTest = ({ courseId, id,setWatchedVideos }) => {
  const { contentActor,actor } = useAuth();
  const [Loading, setLoading] = useState(false);
  const [questionsId, setQuestionsId] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [isTestSubmitted, setisTestSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [securedresult, setSecuredresult] = useState(0);
  const [Result, setResult] = useState(false);
  const [totalQuestion, SetTotalQuestion] = useState(0);
  const [showSpinnerButton,SetShowSpinnerButton] = useState(false);
  const [testResult,SetTestResult] = useState(0);
  const { t } = useTranslation();
  useEffect(() => {
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
      }
      setQuestionsId(newQuestionData);
    };

    const fetchCourse = async (id) => {
      await contentActor
        .getresult(id)
        .then((data) => {
          setResult(true);
          SetTestResult(parseInt(data));
        })
        .catch((err) => {
          SetTestResult(parseInt(0));
          setResult(false);
        });
      const courseData = await contentActor.getquestionlistbytestid(id);
      await AddquestionId(courseData.questionlist);
    };
    setLoading(true);
    fetchCourse(id).then(() => {
      setLoading(false);
    });
  }, [id,testResult]);

  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const questionDataArray = [];

        for (let i = 0; i < questionsId.length - 1; i++) {
          const questionData = await contentActor.getquestion(questionsId[i]);
          questionDataArray.push(questionData);
        }
        setQuestionsData(questionDataArray);
      } catch (error) {
        console.log(error);
      }
    };

    if (questionsId.length > 0) {
      setAnswers(new Array(questionsData.length).fill(null));
      try {
        setLoading(true);
        getAllQuestions().then(() => {
          setLoading(false);
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  }, [questionsId]);

  const HandleWatchedVideos = (result) => {
    let newVideoData = new Set();
    let CurrVid = result;
    let flag = true;

    while (flag) {

      let Vid = CurrVid[0][0];
      newVideoData.add(Vid);
      if (CurrVid[0][1].length > 0 && CurrVid[0][1] !== undefined) {
        CurrVid = CurrVid[0][1];
      } else {
        flag = false;
      }
    }
    setWatchedVideos(newVideoData);
    console.log(newVideoData,'newVideoData');
  }


  const HandleEnded = async () => {
    const result = await contentActor.getwatchedvideo(courseId);
    HandleWatchedVideos(result);
  }


  const handleSubmit = async () => {
    SetShowSpinnerButton(true)
    const result = await contentActor.calculateresults(id, answers);
    console.log(result, answers);
    await actor.update_course_obtained_marks(courseId,parseFloat(result),parseFloat(totalQuestion));
    await contentActor.videotracking(courseId, id);
    setisTestSubmitted(true);
    setSecuredresult(parseInt(result));
    SetTestResult(parseInt(result))
    HandleEnded();
    toast.success('Test submitted successfully!');
    SetShowSpinnerButton(false);
  };


  const handleAnswerSelect = (index, value, id) => {
    const updatedAnswers = [...answers];
    const newAns = `${id},${value}`;
    updatedAnswers[index] = newAns;
    setAnswers(updatedAnswers);
  };
  const allQuestionsAnswered = answers.every((answer) => answer !== null);

  useEffect(() => {
    if (questionsData.length > 0) {
      SetTotalQuestion(questionsData.length);
    }
  }, [questionsData]);




  return (
    <div>
      {Loading ? (
        <Loader />
      ) : !Result ? (
        <div className="flex flex-col w-full p-3 mt-24 md:px-14 lg:flex-row">
          <div className="w-full pr-8 lg:w-7/12 xl:w-8/12">
            <div className="w-full">
              {securedresult > 0 ? (
                <div>{t('MyCourses.Scoredmarks')} {securedresult}</div>
              ) : (
                <div></div>
              )}
            </div>
            {!Loading ? (
              <>
                <h4 className="my-5 text-sm font-bold">
                 {t('MyCourses.Choose')}
                </h4>
                {questionsData.map((question, key) => (
                  <div key={key} className="mt-4">
                    <h1 className="text-lg font-semibold text-gray-700">
                      Q{key + 1}: {question.question}
                    </h1>
                    <div className="flex flex-col gap-3 mt-3">
                      <RadioGroup
                        onChange={(e) =>
                          handleAnswerSelect(
                            key,
                            e.target.value,
                            question.questionId
                          )
                        }
                      >
                        <div>
                          <FormControlLabel
                            value={question.option1}
                            control={<Radio size="small" />}
                            label={question.option1}
                            className="block w-fit"
                          />
                          <FormControlLabel
                            value={question.option2}
                            control={<Radio size="small" />}
                            label={question.option2}
                            className="block w-fit"
                          />
                          <FormControlLabel
                            value={question.option3}
                            control={<Radio size="small" />}
                            label={question.option3}
                            className="block w-fit"
                          />
                          <FormControlLabel
                            value={question.option4}
                            control={<Radio size="small" />}
                            label={question.option4}
                            className="block w-fit"
                          />
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <Loader />
            )}

            {allQuestionsAnswered &&
              (!showSpinnerButton ? (
                <button
                  onClick={handleSubmit}
                  className="outline-none bg-[#7B61FF] p-2 px-8 rounded-md text-white my-4"
                >
                  {t('MyCourses.Submit')}
                </button>
              ) : (
                <button type="button" className="outline-none bg-[#7B61FF] p-2 px-8 rounded-md text-white my-4" disabled>
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 mx-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  {t('MyCourses.Processing')}
                  
                </button>
              ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-24 text-xl font-medium font-nunitoSans">
          <span>
          {t('MyCourses.scored')} {testResult} {t('MyCourses.Outof')}{" "}
            {totalQuestion}
          </span>

          <button
            className="outline-none bg-[#7B61FF] p-2 px-8 rounded-md text-white my-4 w-2/5"
            onClick={() => {
              setResult(false);
            }}
          >
            {t('MyCourses.Retake')}
          </button>
        </div>
      )}
         <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
transition: Bounce
pauseOnHover
theme="light"
className="z-50 mt-20"
/>
    </div>
  );
};

export default IntermediateTest;
