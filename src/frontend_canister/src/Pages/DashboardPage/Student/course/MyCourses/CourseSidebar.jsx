import React from 'react';
import { useAuth } from '../../../../../Components/utils/useAuthClient';
import {useNavigate} from 'react-router-dom';

function CourseSidebar({ isEnrolled,id }) {
    const { contentActor } = useAuth();
    console.log("Content Actor", contentActor);
    const navigate = useNavigate();
    return (
        <div className="container mx-auto px-4 py-8 font-poppins rounded-xl">
            <div className="bg-white rounded-lg shadow-md px-8 py-6">
                <div className="flex flex-col space-y-4">
                    <div>
                        <h2 className="text-xl text-gray-700">Full Course</h2>
                        <h4 className="text-lg text-black-500 font-bold space-y-2">FREE</h4>
                        <h6 className="text-md text-black-500 mt-4">Course Includes:</h6>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex items-center">
                            <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_110_2980)">
                                    <path d="M17.4999 3.69531H2.49992C1.57492 3.69531 0.833252 4.43698 0.833252 5.36198V15.362C0.833252 15.804 1.00885 16.2279 1.32141 16.5405C1.63397 16.8531 2.05789 17.0286 2.49992 17.0286H6.66658V18.6953H13.3333V17.0286H17.4999C18.4166 17.0286 19.1583 16.2786 19.1583 15.362L19.1666 5.36198C19.1666 4.91995 18.991 4.49603 18.6784 4.18347C18.3659 3.87091 17.9419 3.69531 17.4999 3.69531ZM17.4999 15.362H2.49992V5.36198H17.4999V15.362ZM13.3333 10.362L7.49992 13.6953V7.02865L13.3333 10.362Z" fill="#747474" />
                                </g>
                                <defs>
                                    <clip-path id="clip0_110_2980">
                                        <rect width="20" height="22.3906" fill="white" />
                                    </clip-path>
                                </defs>
                            </svg>
                            <span className="ml-2 text-gray-700">14.5 hours on-demand video</span>
                        </li>
                        <li className="flex items-center">
                            <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_110_2889)">
                                    <path d="M11.6666 3.45215H4.99992C4.08325 3.45215 3.34159 4.20215 3.34159 5.11882L3.33325 18.4521C3.33325 19.3688 4.07492 20.1188 4.99159 20.1188H14.9999C15.9166 20.1188 16.6666 19.3688 16.6666 18.4521V8.45215L11.6666 3.45215ZM4.99992 18.4521V5.11882H10.8333V9.28548H14.9999V18.4521H4.99992Z" fill="#747474" />
                                </g>
                                <defs>
                                    <clip-path id="clip0_110_2889">
                                        <rect width="20" height="22.3906" fill="white" transform="translate(0 0.590088)" />
                                    </clip-path>
                                </defs>
                            </svg>
                            <span className="ml-2 text-gray-700">13 articles</span>
                        </li>
                        <li className="flex items-center">
                            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_110_2893)">
                                    <path d="M9.30841 8.84188L7.64175 7.17521H3.33341V17.1752H16.6667V8.84188H9.30841ZM3.33341 5.50854H8.33341L10.0001 7.17521H16.6667C17.5834 7.17521 18.3334 7.92521 18.3334 8.84188V17.1752C18.3334 18.0919 17.5834 18.8419 16.6667 18.8419H3.33341C2.41675 18.8419 1.66675 18.0919 1.66675 17.1752L1.67508 7.17521C1.67508 6.25854 2.41675 5.50854 3.33341 5.50854ZM8.79175 13.0085V10.5085H11.2084V13.0085H13.3334L10.0001 16.3419L6.66675 13.0085H8.79175Z" fill="#747474" />
                                </g>
                                <defs>
                                    <clip-path id="clip0_110_2893">
                                        <rect width="20" height="22.3906" fill="white" transform="translate(0 0.97998)" />
                                    </clip-path>
                                </defs>
                            </svg>
                            <span className="ml-2 text-gray-700">3 downloadable resources</span>
                        </li>
                        <li className="flex items-center">
                            <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_110_2898)">
                                    <path d="M14.1667 2.4368L5.83341 2.42847C4.91675 2.42847 4.16675 3.17847 4.16675 4.09513V19.0951C4.16675 20.0118 4.91675 20.7618 5.83341 20.7618H14.1667C15.0834 20.7618 15.8334 20.0118 15.8334 19.0951V4.09513C15.8334 3.17847 15.0834 2.4368 14.1667 2.4368ZM14.1667 17.4285H5.83341V5.7618H14.1667V17.4285Z" fill="#747474" />
                                </g>
                                <defs>
                                    <clip-path id="clip0_110_2898">
                                        <rect width="20" height="22.3906" fill="white" transform="translate(0 0.399902)" />
                                    </clip-path>
                                </defs>
                            </svg>
                            <span className="ml-2 text-gray-700">Mobile Version</span>
                        </li>
                        <li className="flex items-center">
                            <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_110_2902)">
                                    <path d="M3.51835 18.9102C3.27474 18.9136 3.033 18.8672 2.808 18.7738C2.583 18.6803 2.3795 18.5418 2.21002 18.3668C2.035 18.1973 1.89651 17.9938 1.80307 17.7688C1.70963 17.5438 1.66322 17.3021 1.66668 17.0585V5.94682C1.66668 5.43849 1.84752 5.00182 2.21002 4.63932C2.37934 4.46403 2.58279 4.32531 2.80782 4.23172C3.03284 4.13812 3.27466 4.09165 3.51835 4.09516H16.4817C16.7254 4.09165 16.9672 4.13812 17.1922 4.23172C17.4172 4.32531 17.6207 4.46403 17.79 4.63932C18.1525 5.00182 18.3334 5.43766 18.3334 5.94766V17.0585C18.3334 17.5668 18.1525 18.0035 17.79 18.3668C17.6205 18.5418 17.417 18.6803 17.192 18.7738C16.967 18.8672 16.7253 18.9136 16.4817 18.9102H3.51835ZM3.51835 17.0585H16.4817V5.94682H3.51835V17.0585ZM5.37002 14.2802H8.14835C8.41085 14.2802 8.63085 14.1918 8.80835 14.0135C8.98585 13.8368 9.07418 13.6168 9.07418 13.3552V12.4285H7.68502V12.8918H5.83335V10.1135H7.68502V10.5768H9.07418V9.65099C9.07418 9.38849 8.98585 9.16765 8.80835 8.99016C8.72217 8.90339 8.61918 8.83513 8.50569 8.78956C8.3922 8.74399 8.27061 8.72208 8.14835 8.72516H5.37002C5.10835 8.72516 4.88835 8.81349 4.71002 8.99016C4.62299 9.07636 4.55452 9.17946 4.50881 9.2931C4.46309 9.40674 4.4411 9.52853 4.44419 9.65099V13.3543C4.44419 13.6168 4.53335 13.8368 4.71085 14.0135C4.88835 14.1918 5.10835 14.2802 5.37002 14.2802ZM11.8517 14.2802H14.63C14.8917 14.2802 15.1117 14.1918 15.2884 14.0135C15.4667 13.8368 15.555 13.6168 15.555 13.3552V12.4285H14.1667V12.8918H12.315V10.1135H14.1667V10.5768H15.5559V9.65099C15.5559 9.38849 15.4667 9.16765 15.2892 8.99016C15.2032 8.90333 15.1004 8.83502 14.987 8.78945C14.8737 8.74387 14.7522 8.72199 14.63 8.72516H11.8517C11.5892 8.72516 11.37 8.81349 11.1934 8.99016C11.015 9.16849 10.9267 9.38849 10.9267 9.65099V13.3543C10.9267 13.6168 11.015 13.8368 11.1934 14.0135C11.37 14.1918 11.5892 14.2802 11.8517 14.2802Z" fill="#747474" />
                                </g>
                                <defs>
                                    <clip-path id="clip0_110_2902">
                                        <rect width="20" height="22.3906" fill="white" transform="translate(0 0.399902)" />
                                    </clip-path>
                                </defs>
                            </svg>
                            <span className="ml-2 text-gray-700">Closed captions</span>
                        </li>
                        <li className="flex items-center">
                            <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_110_2906)">
                                    <path d="M15.8333 5.56193H14.1667V3.89526H5.83333V5.56193H4.16667C3.25 5.56193 2.5 6.31193 2.5 7.2286V8.06193C2.5 10.1869 4.1 11.9203 6.15833 12.1786C6.42188 12.8031 6.8335 13.354 7.35764 13.7837C7.88177 14.2135 8.50266 14.5092 9.16667 14.6453V17.2286H5.83333V18.8953H14.1667V17.2286H10.8333V14.6453C11.4973 14.5092 12.1182 14.2135 12.6424 13.7837C13.1665 13.354 13.5781 12.8031 13.8417 12.1786C15.9 11.9203 17.5 10.1869 17.5 8.06193V7.2286C17.5 6.31193 16.75 5.56193 15.8333 5.56193ZM4.16667 8.06193V7.2286H5.83333V10.4119C4.86667 10.0619 4.16667 9.14526 4.16667 8.06193ZM10 13.0619C8.625 13.0619 7.5 11.9369 7.5 10.5619V5.56193H12.5V10.5619C12.5 11.9369 11.375 13.0619 10 13.0619ZM15.8333 8.06193C15.8333 9.14526 15.1333 10.0619 14.1667 10.4119V7.2286H15.8333V8.06193Z" fill="#747474" />
                                </g>
                                <defs>
                                    <clip-path id="clip0_110_2906">
                                        <rect width="20" height="22.3906" fill="white" transform="translate(0 0.199951)" />
                                    </clip-path>
                                </defs>
                            </svg>
                            <span className="ml-2 text-gray-700">Certificate of completion</span>
                        </li>
                    </ul>
                </div>

                <button
                    className={`mt-6 py-2 px-6 ${isEnrolled ? 'bg-gray-400' : 'bg-[#7B61FF]'} text-white font-bold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-full`}
                    disabled={isEnrolled}
                >
                    {isEnrolled ? "Already Enrolled" : "Enroll Now"}
                </button>
                {isEnrolled ? (
                    <button className="mt-6 py-2 px-6 bg-[#7B61FF] text-white font-bold rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-full"

                        onClick={() => {
                            navigate(
                                process.env.DFX_NETWORK === "ic"
                                    ? `/student-dashboard/my-courses/course-content${id}`
                                    : `/student-dashboard/my-courses/course-content${id}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`
                            );
                        }}
                    >
                        Go to Course Content
                    </button>
                ) :
                    <>
                    </>
                }
            </div>
        </div>
    );
}

export default CourseSidebar;
