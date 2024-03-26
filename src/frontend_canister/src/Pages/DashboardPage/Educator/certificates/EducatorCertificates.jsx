import React from "react";
import CertifiedStudents from "../../../../Components/EducatorComponents/certificate/CertifiedStudents";
import DataCert from "../../../../../assets/enroll-data.json";
import { MdAdd, MdClose } from "react-icons/md";
import { useState } from "react";

const EducatorCertificates = () => {
    const [userData, setUserData] = useState({
        user_profile: {
            raw: "",
            base64: ""
        },
        student_name: "",
        course_name: "",
        duration: "",
        remarks: ""
    })

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result);
            setUserData({ ...userData, user_profile: { raw: file, base64: reader.result } });
        }
    }

    const handleFileReset = () => {
        setUserData({ ...userData, user_profile: { raw: "", base64: "" } });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
        setUserData({
            user_profile: {
                raw: "",
                base64: ""
            },
            student_name: "",
            course_name: "",
            duration: "",
            remarks: ""
        })
    }

    return (
        <div className="w-full p-3 md:px-14">
            <div className="w-full flex flex-col-reverse md:flex-row flex-wrap p-3 md:p-8 bg-white rounded-md">
                <div className="w-full flex mt-4 md:mt-0 border-t md:border-transparent flex-col md:flex-row flex-wrap items-end *:text-gray-600 *:text-sm mb-6">
                    <div className="w-full flex justify-center md:w-2/12 xl:w-1/12 p-2">
                        <label className="block w-14 h-14 border rounded-full relative cursor-pointer hover:border-purple-400" id="user_profile_id">
                            <img src={userData.user_profile.base64 === "" ? 'https://placehold.co/400x400' : userData.user_profile.base64} alt="UserIcon" className="w-full h-full object-contain rounded-full" />
                            {userData.user_profile.base64 === "" ?
                                <span className="absolute text-white top-0 right-0 bg-[#907EFF] p-1 rounded-full translate-x-1/3">
                                    <MdAdd size={12} />
                                </span> :
                                <span className="absolute text-white top-0 right-0 bg-[#da4343] p-1 rounded-full translate-x-1/3" onClick={handleFileReset}>
                                    <MdClose size={12} />
                                </span>}
                            <input type="file" name="user_profile_id" id="user_profile_id" className="hidden" onChange={handleFileUpload} disabled={userData.user_profile.base64 !== ""} />
                        </label>
                    </div>
                    <div className="w-full md:w-4/12 xl:w-2/12 p-2">
                        <label htmlFor="student_name">Student Name</label>
                        <input type="text" name="student_name" id="student_name" className="mt-1 w-full rounded-full p-2 border focus:outline-none focus:border-purple-300 bg-gray-100" placeholder="Enter" onChange={handleInputChange} />
                    </div>
                    <div className="w-full md:w-4/12 xl:w-2/12 p-2">
                        <label htmlFor="course_name">Course Name</label>
                        <input type="text" name="course_name" id="course_name" className="mt-1 w-full rounded-full p-2 border focus:outline-none focus:border-purple-300 bg-gray-100" placeholder="Enter" onChange={handleInputChange} />
                    </div>
                    <div className="w-full md:w-4/12 xl:w-2/12 p-2">
                        <label htmlFor="duration">Duration</label>
                        <input type="text" name="duration" id="duration" className="mt-1 w-full rounded-full p-2 border focus:outline-none focus:border-purple-300 bg-gray-100" placeholder="Enter" onChange={handleInputChange} />
                    </div>
                    <div className="w-full md:w-4/12 xl:w-2/12 p-2">
                        <label htmlFor="remarks">Remarks</label>
                        <input type="text" name="remarks" id="remarks" className="mt-1 w-full rounded-full p-2 border focus:outline-none focus:border-purple-300 bg-gray-100" placeholder="Enter" onChange={handleInputChange} />
                    </div>
                    <div className="w-full md:w-4/12 xl:w-3/12 p-2">
                        <button type="button" className="w-full rounded-full p-2 border focus:outline-none bg-[#907EFF] hover:bg-[#8171e9] text-sm text-white font-medium" onClick={handleSubmit}>Upload Certificate</button>
                    </div>
                </div>
                <div className="w-full">
                    <CertifiedStudents data={DataCert.students_completed} />
                </div>
            </div>
        </div>
    )
}

export default EducatorCertificates;
