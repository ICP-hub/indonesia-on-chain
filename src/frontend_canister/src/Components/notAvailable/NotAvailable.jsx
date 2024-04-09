import React from 'react'
import { MdWarning } from 'react-icons/md';

const NotAvailable = ({ Type }) => {
    return (
        <div className='w-full text-xl text-center'>
            {

                <div className='font-poppins h-screen flex flex-col justify-center items-center -mt-8'>
                    <div className='animate-bounce'>
                        <MdWarning size={200} color="orange" />
                    </div>

                    {
                        Type === "Process" ? (
                            <div className='font-poppins font-bold text-2xl text-gray-600'>
                                <p>Your enrolled Courses will show here</p>
                            </div>
                        ) : Type === "Complete" ? (
                            <div className='font-poppins font-bold text-2xl text-gray-600'>
                                <p>Your Completed Courses will appear here!</p>
                            </div>
                        ) : Type === "Certificates" ? (
                            <div className='font-poppins font-bold text-2xl text-gray-600'>
                                <p>Your Certificates Will Show here</p>
                            </div>
                        ) : (
                            <div className='font-poppins font-bold text-2xl text-gray-600'>
                                <p>All Courses Will Show here</p>
                            </div>
                        )
                    }

                </div>

            }

        </div>
    )
}

export default NotAvailable
