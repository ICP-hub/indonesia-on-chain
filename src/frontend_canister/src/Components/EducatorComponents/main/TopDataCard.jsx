/* eslint-disable react/prop-types */
import React from 'react'

const TopDataCard = ({ data }) => {
    return (
        <div className="w-full flex items-end flex-1 p-4 py-3 rounded-lg bg-white">
            <div className="flex-1 whitespace-nowrap">
                <h1 className='lg:text-lg font-bold'>{data.fixedValue ? data.value + "/" + data.fixedValue : data.value}</h1>
                <p className='text-gray-600 text-sm lg:text-base'>{data.subValue} this month</p>
                <p className='font-semibold lg:text-lg'>{data.title}</p>
            </div>
            <div className="flex-1 flex justify-end">
                {data.icon}
            </div>
        </div>
    )
}

export default TopDataCard