import React from 'react'
import { MdWarning } from 'react-icons/md';

const NotAvailable = ({ Type }) => {
    return (
        <div className='w-full text-xl text-center'>
            {

                <div className='flex flex-col items-center justify-center h-full font-poppins'>
                    <div className='w-75 h-75'>
                        <img src="https://storage.googleapis.com/ioc-data/nodatafound2.svg" className='w-full h-full drop-shadow-lg' />
                    </div>

                    {
                        Type === "Process" ? (
                            <div className='text-2xl font-bold text-gray-600 font-poppins'>
                                <p>Your enrolled Courses will show here</p>
                            </div>
                        ) : Type === "Complete" ? (
                            <div className='text-2xl font-bold text-gray-600 font-poppins'>
                                {console.log('take tests section')}
                                <p>Your Completed Courses will appear here!</p>
                            </div>
                        ) : Type === "Certificates" ? (
                            <div className='text-2xl font-bold text-gray-600 font-poppins'>
                                <p>Your Certificates Will Show here</p>
                            </div>
                        ) : Type === "Notfound" ? (
                            <div className='text-2xl font-bold text-gray-600 font-poppins'>
                                <p>Data not found</p>
                            </div>
                        ): (
                            <div className='text-2xl font-bold text-gray-600 font-poppins'>
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
