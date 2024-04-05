import React from 'react'
import { MdWarning } from 'react-icons/md';

const NotAvailable = ({ Type }) => {
    return (
        <div className='w-full text-xl '>
            {
                Type == "Complete" ? (
                    <div className='font-poppins h-screen flex flex-col justify-center items-center -mt-8'>
                        <div className='animate-bounce'>
                            <MdWarning size={200} color="orange" /> 
                        </div>
                        <div className='text-center'>
                           Your Completed Courses will appear here!
                        </div>
                    </div>
                ) : (
                    <div>

                    </div>
                )
            }

        </div>
    )
}

export default NotAvailable
