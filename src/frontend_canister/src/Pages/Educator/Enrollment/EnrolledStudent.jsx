import React from 'react'

const EnrolledStudent = () => {
    const renderTableHeader = () => {
        let header = ["Name", "Course Name", "Duration", "Status"]
        return header.map((key, index) => {
            return <div key={index} className='w-3/12 text-gray-600'>{key.toUpperCase()}</div>
        })
    }

    const renderTableBody = () => {
        let body = ["John Doe", "john@example.com", "+00000000000000", "Computer Science"]
        return body.map((key, index) => {
            return <div key={index} className='w-3/12 text-gray-600'>{key}</div>
        })
    }
    return (
        <div className="w-full">
            <div className="w-full flex items-center">
                {renderTableHeader()}
            </div>
            <div className="w-full flex items-center">
                {renderTableBody()}
            </div>
        </div>
    )
}

export default EnrolledStudent