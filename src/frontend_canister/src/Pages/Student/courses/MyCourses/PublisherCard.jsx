import React from 'react';
import Ellipse from '../../../../../assets/Ellipse.png';

function PublisherProfileCard() {
    return (
        <div className='container mx-auto px-4 py-8 font-poppins rounded-xl'>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex justify-between items-center py-3 px-4">
                    <h3 className='text-xl font-bold'>Publisher</h3>
                    <div className="text-lg flex items-center">
                        <span className="mr-2 text-gray-700 text-sm">View Profile</span>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.53442 5.56908L11.4655 9.50012L7.53442 13.4312" stroke="#747474" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>


                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center space-x-4">
                        <img src={Ellipse} alt="photo" className="w-12 h-12 rounded-full" />
                        <div>
                            <h2 className="text-xl font-bold">Name</h2>
                            <p className="text-gray-500">Publisher</p>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 gap-4 p-4">
                    <p className='text-sm text-gray-700'>Hey my name is Name. I’m 26 and I’m a Blockchain Educator with 6 years of experience.</p>

                    <div className="flex items-center">
                        <div className="mr-2">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.0986 19.7634C15.95 19.763 15.8037 19.7265 15.6724 19.657L11.0001 17.2004L6.32785 19.657C6.17657 19.7363 6.00615 19.7717 5.83581 19.7593C5.66548 19.7469 5.502 19.6871 5.3638 19.5868C5.22561 19.4864 5.1182 19.3494 5.05369 19.1913C4.98918 19.0332 4.97013 18.8602 4.99868 18.6918L5.8906 13.4888L2.11027 9.80377C1.98797 9.68437 1.9015 9.53315 1.86061 9.3672C1.81971 9.20125 1.82603 9.02717 1.87885 8.86462C1.93167 8.70206 2.02888 8.55752 2.15951 8.4473C2.29014 8.33707 2.44898 8.26557 2.6181 8.24085L7.84218 7.48185L10.1788 2.74819C10.2629 2.60504 10.383 2.48637 10.5272 2.40391C10.6713 2.32145 10.8345 2.27808 11.0006 2.27808C11.1666 2.27808 11.3298 2.32145 11.4739 2.40391C11.6181 2.48637 11.7382 2.60504 11.8224 2.74819L14.158 7.48185L19.3821 8.24085C19.5512 8.26557 19.7101 8.33707 19.8407 8.4473C19.9713 8.55752 20.0685 8.70206 20.1213 8.86462C20.1742 9.02717 20.1805 9.20125 20.1396 9.3672C20.0987 9.53315 20.0122 9.68437 19.8899 9.80377L16.1096 13.4888L17.0024 18.6918C17.025 18.8233 17.0185 18.9582 16.9836 19.0869C16.9486 19.2157 16.8859 19.3353 16.7999 19.4373C16.714 19.5394 16.6067 19.6214 16.4858 19.6777C16.3648 19.7341 16.232 19.7633 16.0986 19.7634Z" fill="#747474" />
                            </svg>
                        </div>
                        <div>4.8 Educator Rating</div>
                    </div>

                    <div className="flex items-center">
                        <div className="mr-2">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 2.0625C6.06289 2.0625 2.0625 6.06289 2.0625 11C2.0625 15.9371 6.06289 19.9375 11 19.9375C15.9371 19.9375 19.9375 15.9371 19.9375 11C19.9375 6.06289 15.9371 2.0625 11 2.0625ZM9.6207 14.1668C9.51758 14.2699 9.37148 14.3559 9.24258 14.3559C9.11367 14.3559 8.96758 14.2656 8.86016 14.1625L6.45391 11.7563L7.21875 10.9914L9.24687 13.0195L14.6094 7.61836L15.3613 8.39609L9.6207 14.1668Z" fill="#747474" />
                            </svg>
                        </div>
                        <div>100 Reviews</div>
                    </div>

                    <div className="flex items-center">
                        <div className="mr-2">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.02784 14.2539C10.3475 14.1476 11.6733 14.1476 12.993 14.2539C13.7116 14.2958 14.4269 14.3857 15.1342 14.523C16.6647 14.833 17.664 15.3386 18.0922 16.1541C18.4138 16.7906 18.4138 17.5483 18.0922 18.1848C17.664 19.0004 16.7044 19.5386 15.1183 19.8159C14.4116 19.9584 13.6962 20.0511 12.9771 20.0932C12.311 20.1666 11.6448 20.1666 10.9708 20.1666H9.75743C9.50366 20.134 9.25782 20.1177 9.01991 20.1177C8.30085 20.0807 7.58528 19.9907 6.87872 19.8485C5.34817 19.5549 4.34895 19.033 3.92072 18.2174C3.7554 17.9015 3.66825 17.5486 3.66684 17.1899C3.6635 16.8289 3.74802 16.4728 3.91278 16.1541C4.33309 15.3386 5.33231 14.8085 6.87872 14.523C7.5884 14.3838 8.3064 14.2938 9.02784 14.2539ZM11.0025 1.83325C13.661 1.83325 15.8162 4.04959 15.8162 6.78358C15.8162 9.51757 13.661 11.7339 11.0025 11.7339C8.34395 11.7339 6.18879 9.51757 6.18879 6.78358C6.18879 4.04959 8.34395 1.83325 11.0025 1.83325Z" fill="#747474" />
                            </svg>
                        </div>
                        <div>2000 Students</div>
                    </div>

                    <div className="flex items-center">
                        <div className="mr-2">
                            <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_110_2945)">
                                    <path d="M17.4999 3.69531H2.49992C1.57492 3.69531 0.833252 4.43698 0.833252 5.36198V15.362C0.833252 15.804 1.00885 16.2279 1.32141 16.5405C1.63397 16.8531 2.05789 17.0286 2.49992 17.0286H6.66658V18.6953H13.3333V17.0286H17.4999C18.4166 17.0286 19.1583 16.2786 19.1583 15.362L19.1666 5.36198C19.1666 4.91995 18.991 4.49603 18.6784 4.18347C18.3659 3.87091 17.9419 3.69531 17.4999 3.69531ZM17.4999 15.362H2.49992V5.36198H17.4999V15.362ZM13.3333 10.362L7.49992 13.6953V7.02865L13.3333 10.362Z" fill="#747474" />
                                </g>
                                <defs>
                                    <clip-path id="clip0_110_2945">
                                        <rect width="20" height="22.3906" fill="white" />
                                    </clip-path>
                                </defs>
                            </svg>
                        </div>
                        <div>6 Courses</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PublisherProfileCard;
