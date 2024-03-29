import React, { useState } from 'react'
import { MdAdd, MdClose, MdEdit, MdOutlineArrowBack, MdSchool } from 'react-icons/md'
import { LiaUniversitySolid } from "react-icons/lia";
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from "../utils/useAuthClient";
import UserImagePlaceholder from "../../../../../assets/Vectors/user.png"
import { FaAward } from 'react-icons/fa6';
import { PiUserCircle } from "react-icons/pi";

const EditProfile = () => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const { actor, contentActor } = useAuth();

    const [userEditData, setUserEditData] = useState({
        name: "John Doe",
        userName: "johndoe123",
        role: "Student",
        title: "Software Engineer",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        active: true,
        bio: "I'm a passionate storyteller, avid reader, and aspiring writer. With a love for creativity and a knack for words, I navigate through life one page at a time, seeking inspiration in every corner. From the serene beauty of nature to the bustling streets of the city, I find stories waiting to be told. Join me on this journey as we explore the depths of imagination and craft tales that resonate with the soul.",
        nationalId: "ABC123XYZ",
        nationalIdProof: "",
        profileImage: "",
        qualification: "Bachelor of Science in Computer Science",
        university: "University of Example",
        degree: "Bachelor",
        cgpa: "",
        experience: "5 years",
        social: ["https://twitter.com/johndoe", "https://linkedin.com/in/johndoe"],
        interest: ["Coding", "Reading", "Traveling"],
    })

    const [base64Image, setBase64Image] = useState("")
    const [newInterest, setNewInterest] = useState("")
    const [newSocial, setNewSocial] = useState("")
    const [isEditBio, setIsEditBio] = useState(false)
    const [isAddInterest, setIsAddInterest] = useState(false)
    const [isAddSocial, setIsAddSocial] = useState(false)
    const [isEditEducation, setIsEditEducation] = useState({
        index: 0,
        isEdit: false,
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserEditData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleAddNewInterest = () => {
        if (newInterest.length > 0) {
            setUserEditData((prevState) => ({
                ...prevState,
                interest: [...prevState.interest, newInterest],
            }))
            setNewInterest("")
            setIsAddInterest(false)
        }
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (ev) => {
            console.log(ev.target.result);
            setBase64Image(ev.target.result)
            setUserEditData((prevState) => ({
                ...prevState,
                profileImage: ev.target.result,
            }))
        }

        reader.readAsDataURL(file)
    }

    const handleAddNewSocial = () => {
        if (newSocial.length > 0) {
            setUserEditData((prevState) => ({
                ...prevState,
                social: [...prevState.social, newSocial],
            }))
            setNewSocial("")
            setIsAddSocial(false)
        }
    }

    const handleUpdateData = () => {
        console.log(userEditData);
        // Update user data in the database
    }

    React.useEffect(() => {
        console.log(state);
    }, [location]);
    return (
        <div className="w-full p-3 md:px-14">
            <div className="w-full px-4">
                <button onClick={() => navigate(-1)} className="flex items-center gap-1 bg-[#7B61FF] text-white  rounded-full p-1 px-2 text-sm"><MdOutlineArrowBack />Back</button>
            </div>
            <div className="w-full flex mt-5 flex-col lg:flex-row">
                <div className="w-full lg:w-6/12 p-4">
                    {/* User Profile Image Section */}
                    <div className="w-full bg-white mb-5 rounded-xl shadow p-6">
                        <div className="w-28 h-28 border rounded-full overflow-hidden">
                            <img src={base64Image ? base64Image : UserImagePlaceholder} alt="User Profile Image" className='w-full h-full object-cover' />
                        </div>
                        <div className="w-full my-3">
                            <h1 className='font-semibold text-lg'>Your Photo</h1>
                            <p className='text-gray-600'>This will be displayed on your profile.</p>
                        </div>
                        <div className="w-full flex gap-2 my-3">
                            <label htmlFor="upload_image" className="w-fit border border-[#7B61FF] text-[#7B61FF] rounded p-2 px-4 text-sm cursor-pointer">
                                <input type="file" id="upload_image" className="hidden" onChange={handleFileUpload} />
                                Upload New
                            </label>

                            <button className="w-fit bg-[#7B61FF] border border-[#7B61FF] text-white rounded p-2 px-4 text-sm" onClick={handleUpdateData}>Save</button>
                        </div>
                    </div>

                    {/* User Details Section */}
                    <div className="w-full h-auto bg-white mb-5 rounded-xl shadow p-6">
                        <div className="w-full">
                            <h1 className='text-lg font-semibold'>Personal Information</h1>
                        </div>
                        <div className="w-full">
                            <div className="w-full my-3">
                                <label htmlFor="name" className='text-sm font-normal'>Name</label>
                                <input id="name" name="name" className='w-full mt-2 rounded-md input_foucs_border' type="text" value={userEditData.name} onChange={handleInputChange} />
                            </div>
                            <div className="w-full my-3">
                                <label htmlFor="username" className='text-sm font-normal'>Username</label>
                                <input id="username" name="userName" className='w-full mt-2 rounded-md input_foucs_border' type="text" value={userEditData.userName} onChange={handleInputChange} />
                            </div>
                            <div className="w-full my-3">
                                <label htmlFor="email" className='text-sm font-normal'>Email</label>
                                <input id="email" name="email" className='w-full mt-2 rounded-md input_foucs_border' type="text" value={userEditData.email} onChange={handleInputChange} />
                            </div>
                            <div className="w-full my-3">
                                <label htmlFor="phone" className='text-sm font-normal'>Phone Number</label>
                                <input id="phone" name="phone" className='w-full mt-2 rounded-md input_foucs_border' type="text" value={userEditData.phone} onChange={handleInputChange} />
                            </div>
                            <div className="w-full my-3">
                                <label htmlFor="role" className='text-sm font-normal'>Role</label>
                                <input id="role" name="role" className='w-full mt-2 rounded-md input_foucs_border' type="text" value={userEditData.role} onChange={handleInputChange} />
                            </div>
                            <div className="w-full my-3">
                                <label htmlFor="title" className='text-sm font-normal'>Title</label>
                                <input id="title" name="title" className='w-full mt-2 rounded-md input_foucs_border' type="text" value={userEditData.title} onChange={handleInputChange} />
                            </div>
                        </div>

                    </div>
                    <div className="w-full flex justify-end mt-4">
                        <button className="w-fit border border-[#7B61FF] text-[#7B61FF] rounded ml-2 p-2 px-4 text-sm">Cancel</button>
                        <button className="w-fit bg-[#7B61FF] border border-[#7B61FF] text-white rounded ml-2 p-2 px-4 text-sm" onClick={handleUpdateData}>Save</button>
                    </div>

                </div>
                <div className="w-full lg:w-6/12 p-4">
                    {/* Bio section */}
                    <div className="w-full bg-white mb-5 rounded-xl shadow p-6">
                        <div className="w-full flex justify-between">
                            <h1 className='text-lg font-semibold'>Bio</h1>
                            <button onClick={() => setIsEditBio(!isEditBio)}>
                                <MdEdit />
                            </button>
                        </div>
                        {
                            isEditBio ? <div className="h-[180px] w-full">
                                <textarea className='w-full h-full resize-none text-sm bg-[#EFF1FF] p-3 border border-[#dde0f3] mt-2 rounded-md input_foucs_border' name='bio' id='bio' value={userEditData.bio} onChange={handleInputChange} autoFocus={isEditBio}></textarea>
                            </div> : <p className='w-full h-full resize-none text-sm bg-[#EFF1FF] p-3 border border-[#dde0f3] mt-2 rounded-md input_foucs_border'>{userEditData.bio}</p>
                        }


                    </div>
                    {/* Interest section */}
                    <div className="w-full bg-white mb-5 rounded-xl shadow p-6">
                        <div className="w-full">
                            <h1 className='text-lg font-semibold'>Interests</h1>
                        </div>
                        <div className="w-full mt-3 flex gap-2 flex-wrap">
                            {
                                userEditData.interest.map((interest, index) =>
                                    <div key={index} className="w-fit flex items-center gap-2 text-sm rounded-full text-[#6478FF] p-2 px-3 bg-[#EFF1FF]">
                                        {interest}
                                        <span onClick={() => setUserEditData({
                                            ...userEditData,
                                            interest: userEditData.interest.filter(item => item !== interest)
                                        })} className='cursor-pointer hover:text-[#7e8df1]'>
                                            <MdClose />
                                        </span>
                                    </div>)
                            }
                        </div>
                        <div className="w-full mt-3">

                            {
                                isAddInterest ? <div className="w-full flex gap-2">
                                    <input className='input_foucs_border rounded-md w-full' value={newInterest} onChange={(e) => setNewInterest(e.target.value)} />
                                    <button className="w-fit flex items-center bg-[#7B61FF] border border-[#7B61FF] text-white rounded p-2 px-4 " onClick={handleAddNewInterest}> Add</button>
                                    <button className="w-fit flex items-center bg-[#7B61FF] border border-[#7B61FF] text-white rounded p-2 px-4 " onClick={() => setIsAddInterest(false)}> Cancel</button>
                                </div> : <button className='flex items-center gap-2 w-full border justify-center rounded-md border-[#C1C9FF] p-2' onClick={() => setIsAddInterest(!isAddInterest)}><MdAdd /> Add more</button>
                            }
                        </div>
                    </div>
                    {/* Education section */}
                    <div className="w-full bg-white mb-5 rounded-xl shadow p-6">
                        <div className="w-full">
                            <h1 className='text-lg font-semibold'>Education</h1>
                        </div>
                        <div className="w-full flex flex-col gap-3 bg-[#EFF1FF] p-3 border border-[#dde0f3] mt-2 rounded-md relative">
                            <div className='flex items-center gap-2'>
                                <LiaUniversitySolid size={24} />
                                <input type="text" name="university" id="university" className={`outline-none bg-transparent text-sm border-b ${isEditEducation.index === 0 && isEditEducation.isEdit ? "border-b-gray-300" : "border-b-transparent"} py-1 w-fit`} placeholder='Enter University Name' value={userEditData.university} onChange={handleInputChange} disabled={isEditEducation.index === 0 && !isEditEducation.isEdit} />
                            </div>
                            <div className='flex items-center gap-2'>
                                <MdSchool size={24} />
                                <input type="text" name="degree" id="degree" className={`outline-none bg-transparent text-sm border-b ${isEditEducation.index === 0 && isEditEducation.isEdit ? "border-b-gray-300" : "border-b-transparent"} py-1 w-fit`} placeholder='Enter Degree/Course Name' value={userEditData.degree} onChange={handleInputChange} disabled={isEditEducation.index === 0 && !isEditEducation.isEdit} />
                            </div>
                            <div className='flex items-center gap-2'>
                                <FaAward size={24} />
                                <input type="text" name="cgpa" id="cgpa" className={`outline-none bg-transparent text-sm border-b ${isEditEducation.index === 0 && isEditEducation.isEdit ? "border-b-gray-300" : "border-b-transparent"} py-1 w-fit`} placeholder='Enter CGPA/Percentage' value={userEditData.cgpa} onChange={handleInputChange} disabled={isEditEducation.index === 0 && !isEditEducation.isEdit} />
                            </div>
                            <button type='button' className='absolute top-2 right-2' onClick={() => setIsEditEducation({
                                index: 0,
                                isEdit: !isEditEducation.isEdit
                            })}><MdEdit /></button>

                        </div>
                        <div className="w-full mt-3">
                            <button className='flex items-center gap-2 w-full border justify-center rounded-md border-[#C1C9FF] p-2'><MdAdd /> Add more</button>
                        </div>
                    </div>
                    {/* Social Media */}
                    <div className="w-full bg-white mb-5 rounded-xl shadow p-6">
                        <div className="w-full">
                            <h1 className='text-lg font-semibold'>Social Media Accounts</h1>
                        </div>
                        <div className="w-full mt-3 flex flex-col gap-2">
                            {
                                userEditData.social.map((social, index) =>
                                    <div key={index} className="flex w-full p-2 gap-2 border border-[#C1C9FF] rounded-md items-center">
                                        <PiUserCircle />
                                        <input type="text" className='w-full outline-none bg-transparent' name="social" id="social" value={social} disabled />
                                    </div>
                                )
                            }
                        </div>
                        <div className="w-full mt-3">
                            {
                                isAddSocial ? <div className="w-full flex gap-2">
                                    <input className='input_foucs_border rounded-md w-full' value={newSocial} onChange={(e) => setNewSocial(e.target.value)} />
                                    <button className="w-fit flex items-center bg-[#7B61FF] border border-[#7B61FF] text-white rounded p-2 px-4 " onClick={handleAddNewSocial}> Add</button>
                                    <button className="w-fit flex items-center bg-[#7B61FF] border border-[#7B61FF] text-white rounded p-2 px-4 " onClick={() => setIsAddSocial(false)}> Cancel</button>
                                </div> : <button className='flex items-center gap-2 w-full border justify-center rounded-md border-[#C1C9FF] p-2' onClick={() => setIsAddSocial(!isAddSocial)}><MdAdd /> Add more</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile