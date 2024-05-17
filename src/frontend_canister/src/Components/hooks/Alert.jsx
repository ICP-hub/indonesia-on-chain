import React from 'react'

const Alert = ({ type, text }) => {
    return (
        <div className='z-50 sticky'>
            {type == 'danger' || 'success' ? (
                <div
                    className='absolute top-10 left-0 right-0 flex justify-center items-center'
                >
                    {/* {console.table("aegt",type,text)} */}
                    <div
                        className={`${type == 'danger' ? 'bg-red-800' : 'bg-green-800'} p-2 text-indigo-100 
                 leading-none lg:rounded-full flex lg:inline-flex items-center`}
                        role='alert'
                    >
                        <p className={`${type == 'danger' ? 'bg-red-500' : 'bg-green-500'}
                 flex rounded-full uppercase px-2 py-1 font-semibold mr-0`}>{`${type == 'danger' ? '✖️ failed' : '✔️ Success'}`}</p>
                        <p className='mr-2 text-left font-cabin mx-3 text-xl font-normal'>{text}</p>
                    </div>


                </div>
            ) : (
                <div className='z-50'>
                    {text}
                </div>
            )}
        </div>
    )
}

export default Alert