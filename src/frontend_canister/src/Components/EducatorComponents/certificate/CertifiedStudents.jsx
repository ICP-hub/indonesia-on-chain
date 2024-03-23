/* eslint-disable react/prop-types */
import React from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

const CertifiedStudents = ({ data }) => {
    const renderTableHeader = (key, w) => <div className={`whitespace-nowrap w-${w}/12 text-gray-600`}>{key}</div>

    const renderTableBody = () => {
        return data.slice(0, 8).map((item, index) => {
            return <div className="w-[800px] lg:w-full bg-[#EFF1FF] p-3 rounded-md flex my-4 shadow items-center" key={index}>
                <div className='w-3/12 text-gray-600'>
                    <div className="flex items-center font-medium gap-2">
                        <img src={"https://placehold.co/400x400"} alt="" className='w-12 h-12 rounded-full' />
                        {item.name}
                    </div>
                </div>
                <div className='w-5/12 text-gray-600'>{item.course_name}</div>
                <div className='w-2/12 text-gray-600'>{item.duration}</div>
                <div className='w-2/12 text-gray-600'>{item.status}</div>
            </div>
        })
    }
    return (
        <>
            <div className="w-full mt-2 overflow-auto">
                <div className="w-[800px] lg:w-full flex items-center py-2 border-b overflow-auto">
                    {renderTableHeader("Name", 3)}
                    {renderTableHeader("Course Name", 5)}
                    {renderTableHeader("Duration", 2)}
                    {renderTableHeader("Status", 2)}
                </div>
                <div className="w-full">
                    {renderTableBody()}
                </div>
            </div>
            <div className="w-full flex items-center justify-end gap-2">
                <p className="text-gray-600 text-sm mr-2">{data.slice(0, 8).length} of {data.length}</p>
                <button className="text-gray-700 rounded-full p-2 border hover:bg-gray-200" type='button'>
                    <MdChevronLeft size={20} />
                </button>
                <button className="text-gray-700 rounded-full p-2 border hover:bg-gray-200" type='button'>
                    <MdChevronRight size={20} />
                </button>
            </div>
        </>
    )
}

export default CertifiedStudents