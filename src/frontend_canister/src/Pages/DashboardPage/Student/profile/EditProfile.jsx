import React, { useState } from 'react'
import { MdAdd, MdClose, MdEdit, MdOutlineArrowBack, MdSchool } from 'react-icons/md'
import { LiaUniversitySolid } from "react-icons/lia";
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from "../../../../Components/utils/useAuthClient";
import UserImagePlaceholder from "../../../../../assets/Vectors/user.png"
// import UserImagePlaceholder from "../assests/user.png"
import { FaAward } from 'react-icons/fa6';
import { PiUserCircle } from "react-icons/pi";
import { toast } from 'react-toastify';

const EditProfile = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { actor } = useAuth();

    const [userEditData, setUserEditData] = useState({
        email: [state.email] || [""],
        name: [state.name]|| [""],
        userName: [state.userName] || [""],
        phone: [state.phone] || [""],
        bio: [...state.bio] || [""],
        profileImage: [...state.profileImage] || [""],
        qualification: [...state.qualification] || [""],
        nationalId: [...state.nationalId] || [""],
        nationalIdProof: [...state.nationalIdProof] || [""],
        experience: [...state.experience] || [""],
        status: [...state.status] || [""],
        university: [...state.university] || [""],
        degree: [...state.degree] || [""],
        cgpa: [...state.cgpa] || [""],
        social: [...state.social] || [""],  
        interest: [...state.interest] || [""],
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
            [name]: [value],
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
                profileImage: [ev.target.result],
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

    const handleUpdateData = async () => {
        console.log(state);
        console.log(userEditData);
        // Update user data in the database
        try {

            const result = await actor.update_user(userEditData);
            console.log(result.ok);
            if (result.ok) {
                toast.success("Profile updated successfully");
                navigate(-1)
            }

        } catch (error) {
            const message = error.message;
            const startIndex = message.indexOf("trapped explicitly:");
            const errorMessageSubstring = message.substring(startIndex);
            const endIndex = errorMessageSubstring.indexOf(":");
            const finalErrorMessage = errorMessageSubstring.substring(endIndex + 1).trim();
            toast.error(finalErrorMessage);
            console.error('Error fetching data:', error);
        }
    }

    React.useEffect(() => {
        console.log(state);
    }, [state]);
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
                                <input id="name" name="name" className='w-full mt-2 rounded-md input_foucs_border' type="text" value={userEditData.name[0]} onChange={handleInputChange} />
                            </div>
                            <div className="w-full my-3">
                                <label htmlFor="username" className='text-sm font-normal'>Username</label>
                                <input id="username" name="userName" className='w-full mt-2 rounded-md input_foucs_border' type="text" value={userEditData.userName[0]} onChange={handleInputChange} />
                            </div>
                            <div className="w-full my-3">
                                <label htmlFor="email" className='text-sm font-normal'>Email</label>
                                <input id="email" name="email" className='w-full mt-2 rounded-md input_foucs_border' type="text" value={userEditData.email[0]} onChange={handleInputChange} />
                            </div>
                            <div className="w-full my-3">
                                <label htmlFor="phone" className='text-sm font-normal'>Phone Number</label>
                                <input id="phone" name="phone" className='w-full mt-2 rounded-md input_foucs_border' type="text" value={userEditData.phone[0]} onChange={handleInputChange} />
                            </div>
                            <div className="w-full my-3">
                                <label htmlFor="role" className='text-sm font-normal'>Role</label>
                                <input id="role" name="role" className='w-full mt-2 rounded-md input_foucs_border' type="text" value={state.role} disabled />
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
                                <textarea className='w-full h-full resize-none text-sm bg-[#EFF1FF] p-3 border border-[#dde0f3] mt-2 rounded-md input_foucs_border' name='bio' id='bio' value={userEditData.bio[0]} onChange={handleInputChange} autoFocus={isEditBio}></textarea>
                            </div> : <p className='w-full h-full resize-none text-sm bg-[#EFF1FF] p-3 border border-[#dde0f3] mt-2 rounded-md input_foucs_border'>{userEditData.bio[0]}</p>
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
                                <input type="text" name="university" id="university" className={`outline-none bg-transparent text-sm border-b ${isEditEducation.index === 0 && isEditEducation.isEdit ? "border-b-gray-300" : "border-b-transparent"} py-1 w-fit`} placeholder='Enter University Name' value={userEditData.university[0]} onChange={handleInputChange} disabled={isEditEducation.index === 0 && !isEditEducation.isEdit} />
                            </div>
                            <div className='flex items-center gap-2'>
                                <MdSchool size={24} />
                                <input type="text" name="degree" id="degree" className={`outline-none bg-transparent text-sm border-b ${isEditEducation.index === 0 && isEditEducation.isEdit ? "border-b-gray-300" : "border-b-transparent"} py-1 w-fit`} placeholder='Enter Degree/Course Name' value={userEditData.degree[0]} onChange={handleInputChange} disabled={isEditEducation.index === 0 && !isEditEducation.isEdit} />
                            </div>
                            <div className='flex items-center gap-2'>
                                <FaAward size={24} />
                                <input type="text" name="cgpa" id="cgpa" className={`outline-none bg-transparent text-sm border-b ${isEditEducation.index === 0 && isEditEducation.isEdit ? "border-b-gray-300" : "border-b-transparent"} py-1 w-fit`} placeholder='Enter CGPA/Percentage' value={userEditData.cgpa[0]} onChange={handleInputChange} disabled={isEditEducation.index === 0 && !isEditEducation.isEdit} />
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