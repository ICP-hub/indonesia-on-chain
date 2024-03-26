/* eslint-disable react/prop-types */
import React from 'react'

const MiddleDataCards = ({ data }) => {

    return (
        <div className='w-fit xl:w-1/5 p-4 flex flex-col items-start bg-white rounded-md'>
            <h1 className='font-medium text-gray-500 whitespace-nowrap'>{data.title}</h1>
            <p className='font-bold'>{data.count}</p>
        </div>
    )
}

export default MiddleDataCards