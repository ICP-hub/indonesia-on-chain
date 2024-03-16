import React, { useState } from "react";
import EnrollData from "../../../../assets/enroll-data.json";
import EnrolledStudent from "./EnrolledStudent";
import CompletedStudent from "./CompletedStudent";

const TabContent = [
    {
        id: 0,
        title: "Enrolled Students"
    }, {
        id: 1,
        title: "Completed by Students"
    }
]

const Enrollment = () => {
    const [activeTab, setActiveTab] = useState(0);

    const renderStudents = () => {
        switch (activeTab) {
            case 0:
                return <EnrolledStudent />
            case 1:
                return <CompletedStudent />
            default:
                return <EnrolledStudent />
        }
    }

    return (
        <div className="w-full p-3 md:px-14">
            <div className="w-full p-3 md:p-8 bg-white rounded-md">
                <div className="w-full border-b flex gap-4 font-medium">
                    {
                        TabContent.map((item, index) => <span key={index} className={`py-2 border-b ${activeTab === index ? "border-b-[#7B61FF] text-[#7B61FF]" : "border-transparent text-[#373638]"}  cursor-pointer`} onClick={() => setActiveTab(index)}>{item.title}</span>)
                    }
                </div>
                <div className="w-full flex gap-8 flex-wrap flex-row mt-4">
                    {
                        renderStudents()
                    }
                </div>
            </div>
        </div>
    )
}

export default Enrollment;
