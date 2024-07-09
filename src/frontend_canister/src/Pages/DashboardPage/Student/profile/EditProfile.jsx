import React, { useEffect, useState } from "react"
import {
  MdAdd,
  MdClose,
  MdEdit,
  MdOutlineArrowBack,
  MdSchool,
} from "react-icons/md"
import { LiaUniversitySolid } from "react-icons/lia"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../../../Components/utils/useAuthClient"
import UserImagePlaceholder from "../../../../../assets/images/default-user.png"
// import UserImagePlaceholder from "../assests/user.png"
import { FaAward } from "react-icons/fa6"
import { PiUserCircle } from "react-icons/pi"
import { toast, ToastContainer } from "react-toastify"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import Skeleton from "@mui/material/Skeleton"
import Modal from "@mui/material/Modal"
import InputNumber from "../../../../Components/utils/InputNumber"
import { useTranslation } from 'react-i18next';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const EditProfile = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { actor } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubLoading, setSubIsLoading] = useState({
    social: false,
    interest: false,
  })
  const { t } = useTranslation();
  const [userEditData, setUserEditData] = useState({
    email: [state.email] || [""],
    name: [state.name] || [""],
    userName: [state.userName] || [""],
    phone: [state.phone] || [""],
    bio: [state.bio] || [""],
    profileImage: [state.profileImage] || [""],
    nationalId: [state.nationalId] || [""],
    nationalIdProof: [state.nationalIdProof] || [""],
    experience: [state.experience] || [""],
    status: [state.status] || [""],
    university: [state.status] || "",
  })
  console.log("user Edit data in edit componet..", userEditData)
  // const handleFlattenList = (data) => {
  //   return data.reduce((acc, val) => {
  //     return acc.concat(Array.isArray(val) ? val) : val)
  //   }, [])
  // }

  const [interest, setInterest] = useState(state.interest)
  const [education, setEducation] = useState(state.education)
  const [eduData, setEduData] = useState({
    institution: "",
    program: "",
    score: "",
  })

  const [base64Image, setBase64Image] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [newSocial, setNewSocial] = useState("")
  const [isEditBio, setIsEditBio] = useState(false)
  const [isAddInterest, setIsAddInterest] = useState(false)
  const [isEditEducation, setIsEditEducation] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserEditData((prevState) => ({
      ...prevState,
      [name]: [value],
    }))
  }

  const handleAddNewInterest = async () => {
    setSubIsLoading({
      interest: true,
      social: false,
    })
    if (newInterest.length > 0) {
      try {
        const result = await actor.updateUserInterest(newInterest)
        console.log(result.ok)
        if (result.ok) {
          setSubIsLoading({
            interest: false,
            social: false,
          })
          setInterest([...interest, newInterest])
          setNewInterest("")
          setIsAddInterest(false)
        }
      } catch (error) {
        const message = error.message
        const startIndex = message.indexOf("terjebak secara eksplisit:")
        const errorMessageSubstring = message.substring(startIndex)
        const endIndex = errorMessageSubstring.indexOf(":")
        const finalErrorMessage = errorMessageSubstring
          .substring(endIndex + 1)
          .trim()
        toast.error(finalErrorMessage)
        console.error("Error fetching data:", error)
      }
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file.size > 1000000) {
      toast.error("Ukuran gambar melebihi 1MB")
      return
    } else {
      const reader = new FileReader()
      reader.onload = (ev) => {
        console.log(ev.target.result)
        setBase64Image(ev.target.result)
        setUserEditData((prevState) => ({
          ...prevState,
          profileImage: [ev.target.result],
        }))
      }

      reader.readAsDataURL(file)
    }
  }

  const handleModalOpen = () => {
    setIsEditEducation(!isEditEducation)
  }

  const handleAddEducation = async () => {
    setIsEditEducation(false)
    setIsLoading(true)
    try {
      const result = await actor.updateUserEducation(eduData)
      console.log(result.ok)
      if (result.ok) {
        setEducation([
          ...education,
          {
            institution: eduData.institution,
            program: eduData.program,
            score: eduData.score,
          }
        ])
        console.log(education);
        setEduData({
          institution: "",
          program: "",
          score: "0"
        })
        setIsEditEducation(false)
        setIsLoading(false)
      }
    } catch (error) {
      const message = error.message
      const startIndex = message.indexOf("terjebak secara eksplisit:")
      const errorMessageSubstring = message.substring(startIndex)
      const endIndex = errorMessageSubstring.indexOf(":")
      const finalErrorMessage = errorMessageSubstring
        .substring(endIndex + 1)
        .trim()
      setIsLoading(false)
      toast.error(finalErrorMessage)

      console.error("Error fetching data:", error)
    }
  }



  const handleDisableSaveButton = () => {
    const {
      name,
      userName,
      phone,
      bio,
      profileImage,
      // qualification,
      nationalId,
      nationalIdProof,
      experience,
      status,
      // university,
      // degree,
      // cgpa,
    } = userEditData

    if (
      (name[0] === state.name || name[0] === "") &&
      (userName[0] === state.userName || userName[0] === "") &&
      (phone[0] === state.phone || phone[0] === "") &&
      (bio[0] === state.bio[0] || bio[0] === "") &&
      (profileImage[0] === state.profileImage[0] || profileImage[0] === "") &&
      (nationalId[0] === state.nationalId[0] || nationalId[0] === "") &&
      (nationalIdProof[0] === state.nationalIdProof[0] ||
        nationalIdProof[0] === "") &&
      (experience[0] === state.experience[0] || experience[0] === "") &&
      (status[0] === state.status[0] || status[0] === "")
    ) {
      return true
    }
    return false
  }

  const handleUpdateData = async () => {
    setIsLoading(true)
    console.log(userEditData)
    // Update user data in the database
    try {
      const result = await actor.update_user(userEditData)
      console.log(result.ok)
      if (result.ok) {
        setIsLoading(false)
        toast.success("Profil berhasil diperbarui")
        navigate(-1)
      }
    } catch (error) {
      const message = error.message
      const startIndex = message.indexOf("terjebak secara eksplisit:")
      const errorMessageSubstring = message.substring(startIndex)
      const endIndex = errorMessageSubstring.indexOf(":")
      const finalErrorMessage = errorMessageSubstring
        .substring(endIndex + 1)
        .trim()
      setIsLoading(false)
      toast.error(finalErrorMessage)
      console.error("Error fetching data:", error)
    }
  }


  // handle social meadia 
  const [isAddSocial, setIsAddSocial] = useState(false);
  const [social, setSocial] = useState(state.social);
  const [instagramHandle, setInstagramHandle] = useState('');
  const [linkedinHandle, setLinkedinHandle] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');

  const addedPlatforms = new Set(social.map(url => {
    if (url.includes('instagram.com')) return 'instagram';
    if (url.includes('linkedin.com')) return 'linkedin';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
    return '';
  }));

  const handleAddNewSocial = async (platform) => {
    setSubIsLoading({
      interest: false,
      social: true,
    });

    let socialUrl = '';
    let errorMessage = '';

    if (addedPlatforms.has(platform)) {
      errorMessage = "Pegangan media sosial ini telah ditambahkan.";
    } else if (platform === 'instagram' && instagramHandle.length > 0) {
      if (!instagramHandle.match(/^[a-zA-Z0-9._]+$/)) {
        errorMessage = "Domain tidak valid. Silakan masukkan nama pengguna media sosial yang valid.";
      } else {
        socialUrl = `https://www.instagram.com/${instagramHandle}`;
      }
    } else if (platform === 'linkedin' && linkedinHandle.length > 0) {
      if (!linkedinHandle.match(/^[a-zA-Z0-9-_]+$/)) {
        errorMessage = "Domain tidak valid. Silakan masukkan nama pengguna media sosial yang valid.";
      } else if (linkedinHandle.includes('linkedin.com/in/')) {
        errorMessage = "Harap masukkan hanya nama akun LinkedIn Anda, bukan URL lengkap.";
      } else {
        socialUrl = `https://www.linkedin.com/in/${linkedinHandle}`;
      }
    } else if (platform === 'twitter' && twitterHandle.length > 0) {
      if (!twitterHandle.match(/^[a-zA-Z0-9_]+$/)) {
        errorMessage = "Domain tidak valid. Silakan masukkan nama pengguna media sosial yang valid.";
      } else {
        socialUrl = `https://twitter.com/${twitterHandle}`;
      }
    } else {
      errorMessage = "Silakan masukkan nama akun sosial yang valid.";
    }

    if (errorMessage) {
      toast.error(errorMessage);
      setSubIsLoading({
        interest: false,
        social: false,
      });
    } else if (social.includes(socialUrl)) {
      toast.warning("Pegangan media sosial ini telah ditambahkan.");
      setSubIsLoading({
        interest: false,
        social: false,
      });
    } else {
      try {
        const result = await actor.updateUserSocials(socialUrl);
        if (result.ok) {
          setSubIsLoading({
            interest: false,
            social: false,
          });
          setSocial([...social, socialUrl]);
          setInstagramHandle('');
          setLinkedinHandle('');
          setTwitterHandle('');
          setIsAddSocial(false);
        }
      } catch (error) {
        toast.error("Kesalahan saat mengambil data:", error.message);
        console.error("Error fetching data:", error);
        setSubIsLoading({
          interest: false,
          social: false,
        });
      }
    }
  };


  const handleCancel = () => {
    setIsAddSocial(false);
  };

  const getIcon = (url) => {
    if (url.includes('instagram.com')) return <FaInstagram size="1.5em" />;
    if (url.includes('linkedin.com')) return <FaLinkedin size="1.5em" />;
    if (url.includes('x.com') || url.includes('twitter.com')) return <FaTwitter size="1.5em" />;
    return null;
  };

  const getHandle = (url) => {
    if (url.includes('instagram.com')) return url.replace('https://www.instagram.com/', '');
    if (url.includes('linkedin.com')) return url.replace('https://www.linkedin.com/in/', '');
    if (url.includes('x.com')) return url.replace('https://x.com/', '');
    if (url.includes('twitter.com')) return url.replace('https://twitter.com/', '');
    return url;
  };

  // const handleCancel = () => {
  //   setIsAddSocial(false);
  // };

 //get Education
 const [userinfo, setUserInfo] = useState([]);
 useEffect(() => {
   const fetchData = async () => {
     try {
       const userinfo = await actor.get_user_info();
       setUserInfo(userinfo.ok);
     } catch (error) {
       toast.error("sesuatu yang salah", error);
     }
   };
   fetchData();
 }, [actor]);
  return (
    <div className="w-full p-3 md:px-14">
      <div className="w-full px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 bg-[#7B61FF] text-white  rounded-full p-1 px-2 text-sm"
        >
          <MdOutlineArrowBack />
          {t('EditProfile.Back')}
        </button>
      </div>
      <div className="flex flex-col w-full mt-5 lg:flex-row">
        <div className="w-full p-4 lg:w-6/12">
          {/* User Profile Image Section */}
          <div className="w-full p-6 mb-5 bg-white shadow rounded-xl">
            <div className="overflow-hidden border rounded-full w-28 h-28">
              <img
                src={
                  base64Image
                    ? base64Image
                    : userEditData.profileImage[0].length > 0
                      ? userEditData.profileImage
                      : UserImagePlaceholder
                }
                alt="User Profile Image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-full my-3">
              <h1 className="text-lg font-semibold">{t('EditProfile.YourPhoto')}</h1>
              <p className="text-gray-600">
                {t('EditProfile.displayedprofile')}
              </p>
            </div>
            <div className="flex w-full gap-2 my-3">
              <label
                htmlFor="upload_image"
                className="w-fit border border-[#7B61FF] text-[#7B61FF] rounded p-2 px-4 text-sm cursor-pointer"
              >
                <input
                  type="file"
                  id="upload_image"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                {t('EditProfile.UploadNew')}
              </label>

              <button
                className="w-fit bg-[#7B61FF] border border-[#7B61FF] text-white rounded p-2 px-4 text-sm"
                onClick={handleUpdateData}
              >
                {t('EditProfile.Save')}
              </button>
            </div>
          </div>

          {/* User Details Section */}
          <div className="w-full h-auto p-6 mb-5 bg-white shadow rounded-xl">
            <div className="w-full">
              <h1 className="text-lg font-semibold">{t('EditProfile.PersonalInformation')}</h1>
            </div>
            <div className="w-full">
              <div className="w-full my-3">
                <label htmlFor="name" className="text-sm font-normal">
                  {t('EditProfile.Name')}
                </label>
                <input
                  id="name"
                  name="name"
                  className="w-full mt-2 rounded-md input_foucs_border"
                  type="text"
                  value={userEditData.name[0]}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full my-3">
                <label htmlFor="username" className="text-sm font-normal">
                  {t('EditProfile.Username')}
                </label>
                <input
                  id="username"
                  name="userName"
                  className="w-full mt-2 rounded-md input_foucs_border"
                  type="text"
                  value={userEditData.userName[0]}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full my-3">
                <label htmlFor="email" className="text-sm font-normal">
                  {t('EditProfile.Email')}
                </label>
                <input
                  id="email"
                  name="email"
                  className="w-full mt-2 rounded-md input_foucs_border"
                  type="text"
                  value={userEditData.email[0]}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full my-3">
                <label htmlFor="phone" className="text-sm font-normal">
                  {t('EditProfile.PhoneNumber')}
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="w-full mt-2 rounded-md input_foucs_border"
                  type="text"
                  value={userEditData.phone[0]}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full my-3">
                <label htmlFor="role" className="text-sm font-normal">
                  {t('EditProfile.Role')}
                </label>
                <input
                  id="role"
                  name="role"
                  className="w-full mt-2 rounded-md input_foucs_border"
                  type="text"
                  value={state.role}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full mt-4">
            <button className="w-fit border border-[#7B61FF] text-[#7B61FF] rounded ml-2 p-2 px-4 text-sm" onClick={() => navigate(-1)}>
              {t('EditProfile.Cancel')}
            </button>
            <button
              className="w-fit bg-[#7B61FF] border border-[#7B61FF] text-white rounded ml-2 p-2 px-4 text-sm"
              onClick={handleUpdateData}
              disabled={handleDisableSaveButton()}
            >
              {t('EditProfile.Save')}
            </button>
          </div>
        </div>
        <div className="w-full p-4 lg:w-6/12">
          {/* Bio section */}
          <div className="w-full p-6 mb-5 bg-white shadow rounded-xl">
            <div className="flex justify-between w-full">
              <h1 className="text-lg font-semibold">{t('Bio')}</h1>
              <button onClick={() => setIsEditBio(!isEditBio)}>
                <MdEdit />
              </button>
            </div>
            {isEditBio ? (
              <div className="h-[180px] w-full ">
                <textarea
                  className="w-full h-full  resize-none text-sm bg-[#EFF1FF] p-3 border border-[#dde0f3] mt-2 rounded-md input_foucs_border"
                  name="bio"
                  id="bio"
                  value={userEditData.bio[0]}
                  onChange={handleInputChange}
                  autoFocus={isEditBio}
                ></textarea>
              </div>
            ) : (
              <p className="w-full h-full resize-none text-sm bg-[#EFF1FF] p-3 border border-[#dde0f3] mt-2 rounded-md input_foucs_border overflow-auto break-words">
                {userEditData.bio[0]}
              </p>
            )}
          </div>
          {/* Interest section */}
          <div className="w-full p-6 mb-5 bg-white shadow rounded-xl">
            <div className="w-full">
              <h1 className="text-lg font-semibold">{t('EditProfile.Interests')}</h1>
            </div>
            <div className="flex flex-wrap w-full gap-2 mt-3">
              {interest.map((interest, index) => (
                <div
                  key={index}
                  className="w-fit flex items-center gap-2 text-sm rounded-full text-[#6478FF] p-2 px-3 bg-[#EFF1FF]"
                >
                  {interest}
                  <span className="cursor-pointer hover:text-[#7e8df1]">
                    <MdClose />
                  </span>
                </div>
              ))}
              {isSubLoading.interest && (
                <Skeleton
                  variant="rounded"
                  width={70}
                  height={30}
                  sx={{ borderRadius: "100px" }}
                />
              )}
            </div>
            <div className="w-full mt-3">
              {isAddInterest ? (
                <div className="flex w-full gap-2">
                  <input
                    className="w-full rounded-md input_foucs_border"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                  />
                  <button
                    className="w-fit flex items-center bg-[#7B61FF] border border-[#7B61FF] text-white rounded p-2 px-4 "
                    onClick={handleAddNewInterest}
                  >
                    {" "}
                    {t('EditProfile.Add')}
                  </button>
                  <button
                    className="w-fit flex items-center bg-[#7B61FF] border border-[#7B61FF] text-white rounded p-2 px-4 "
                    onClick={() => setIsAddInterest(false)}
                  >
                    {" "}
                    {t('EditProfile.Cancel')}
                  </button>
                </div>
              ) : (
                <button
                  className="flex items-center gap-2 w-full border justify-center rounded-md border-[#C1C9FF] p-2"
                  onClick={() => setIsAddInterest(!isAddInterest)}
                >
                  <MdAdd /> {t('EditProfile.Addmore')}
                </button>
              )}
            </div>
          </div>
          {/* Education section */}
          <div className="w-full p-6 mb-5 bg-white shadow rounded-xl">
            {/* <div className="mb-6">
              <h3 className="text-xl font-[600] text-black font-poppins">{t('EducatorProfileComponent.Educations')}</h3>

              <div className="mt-6 flex flex-col justify-start">
                {
                  userinfo.education ? userinfo.education.map((edu, index) => (
                    <div className="w-full flex flex-col gap-3 bg-[#EFF1FF] p-3 border border-[#dde0f3] mt-2 rounded-md relative">
                      <div className='flex items-center  gap-2'>
                        <LiaUniversitySolid size={24} />
                        <div className="font-[400] font-poppins text-sm">{t('EducatorProfileComponent.University')}: {edu.institution}</div>
                      </div>
                      <div className='flex items-center  gap-2'>
                        <MdSchool size={24} />
                        <div className="font-[400] font-poppins text-sm">{t('EducatorProfileComponent.Degree')}: {edu.program}</div>
                      </div>
                    
                    </div>
                  )) : <div className="w-full">{t('EducatorProfileComponent.EducationDetails')}</div>

                }
              </div>

            </div> */}
            <div className="w-full">
              <h1 className="text-lg font-semibold">{t('EditProfile.Education')}</h1>
            </div>

            <div className="w-full flex flex-col gap-3 bg-[#EFF1FF] p-3 border border-[#dde0f3] mt-2 rounded-md relative">
            <p className="text-red-500">{t('EditProfile.onlythree')}</p>
              <div className="flex flex-col items-center justify-center gap-2 sm:justify-start sm:flex-row">
               
                <div className="flex gap-1">
                  <LiaUniversitySolid size={24} />
                  <span className="font-medium">{t('EditProfile.University')}</span>
                </div>
                <input
                  type="text"
                  name="university"
                  id="university"
                  // className={`outline-none bg-transparent text-sm border-b ${isEditEducation.index === 0 && isEditEducation.isEdit
                  //   ? "border-b-gray-300"
                  //   : "border-b-transparent"
                  //   } py-1 w-fit`}
                  className={`outline-none bg-transparent text-sm border-b  py-1 w-fit`}
                  placeholder="Masukkan Nama Universitas"
                  style={{ textAlign: 'center' }} // Added style to center the placeholder text
                  // disabled={isEditEducation.index === 0 && !isEditEducation.isEdit}
                  disabled
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-2 sm:justify-start sm:flex-row">
                <div className="flex gap-1">
                  <MdSchool size={24} />
                  <span className="font-medium">{t('EditProfile.Degree')}</span>
                </div>
                <input
                  type="text"
                  name="degree"
                  id="degree"
                  className={`outline-none bg-transparent text-sm border-b py-1 w-fit`}
                  placeholder="Masukkan Gelar/Nama Jurusan"
                  style={{ textAlign: 'center' }}
                  disabled
                // disabled={
                //   isEditEducation.index === 0 && !isEditEducation.isEdit
                // }
                />
              </div>
              {/* <div className="flex flex-col items-center justify-center gap-2 sm:justify-start sm:flex-row">
                <div className="flex gap-1">
                  <FaAward size={24} />
                  <span className="font-medium">{t('EditProfile.Percentage')}</span>
                </div>
                <input
                  type="text"
                  name="cgpa"
                  id="cgpa"
                  className={`outline-none bg-transparent text-sm border-b ${isEditEducation.index === 0 && isEditEducation.isEdit
                    ? "border-b-gray-300"
                    : "border-b-transparent"
                    } py-1 w-fit`}
                  placeholder="Enter CGPA/Percentage"
                  style={{ textAlign: 'center' }}
                  disabled={
                    isEditEducation.index === 0 && !isEditEducation.isEdit
                  }
                />

              </div> */}

            </div>
            <div className="w-full mt-3">
              <Modal open={isEditEducation} onClose={handleModalOpen}>
                <div className="w-[500px] h-fit overflow-auto p-3 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-md">
                  <div className="w-full my-3">

                    <label className="text-sm font-medium"><LiaUniversitySolid size={20} /> {t('EditProfile.University')}</label>
                    <br></br>
                    <input
                      type="text"
                      name="institution"
                      id="institution"
                      className='w-full mt-2 rounded-md input_foucs_border'
                      placeholder="Masukkan Nama Universitas"
                      value={eduData.institution}
                      onChange={(e) => setEduData({
                        ...eduData,
                        institution: e.target.value
                      })}

                    />
                  </div>
                  <div className="w-full my-3">

                    <label className="text-sm font-medium"><MdSchool size={22} /> {t('EditProfile.Degree')} </label>
                    <br></br>
                    <input
                      type="text"
                      name="program"
                      id="program"
                      className='w-full mt-2 rounded-md input_foucs_border'
                      placeholder="Masukkan Gelar/Nama Jurusan"
                      value={eduData.program}
                      onChange={(e) => setEduData({
                        ...eduData,
                        program: e.target.value
                      })}
                    />
                  </div>
                  {/* <div className="w-full my-3">
                    
                    <label className="text-sm font-medium"><FaAward size={22} /> {t('EditProfile.Percentage')}</label>
                    <br></br>
                   
                    <InputNumber 
                      type="number"
                      name="score"
                      id="score"
                      className='w-full mt-2 rounded-md input_foucs_border'
                      placeholder="Enter CGPA/Percentage"
                      value={eduData.score}
                      onChange={(e) => setEduData({
                        ...eduData,
                        score: e.target.value
                      })}
                    />
                  </div> */}
                  <button
                    className='w-full mt-3 bg-[#7B61FF] border border-[#7B61FF] text-white rounded p-2'
                    onClick={handleAddEducation}>{t('EditProfile.Add')}</button>
                </div>
              </Modal>
              <button className='flex items-center gap-2 w-full border justify-center rounded-md border-[#C1C9FF] p-2' onClick={handleModalOpen}><MdAdd /> {t('Addmore')}</button>
            </div>
          </div>
          {/* Social Media */}
          <div className="w-full p-6 mb-5 bg-white shadow rounded-xl">
            <div className="w-full">
              <h1 className="text-lg font-semibold">{t('EditProfile.SocialMediaAccounts')}</h1>
            </div>
            <div className="flex flex-col w-full gap-2 mt-3">
              {social.map((socialLink, index) => (
                <div
                  key={index}
                  className="flex w-full p-2 gap-2  rounded-md items-center text-blue-700"
                >
                  {/* border border-[#C1C9FF] */}
                  {getIcon(socialLink)}
                  <a href={socialLink} target="_blank" rel="noopener noreferrer">
                    <input
                      type="text"
                      className="w-full outline-none bg-transparent cursor-pointer text-blue-700"
                      name="social"
                      id="social"
                      value={getHandle(socialLink)}
                      readOnly
                    />
                  </a>
                </div>
              ))}
              {isSubLoading.social && (
                <Skeleton
                  variant="rounded"
                  height={30}
                  sx={{ borderRadius: "20px", width: "100%" }}
                />
              )}
            </div>
            {/* <div className="w-full mt-3">
              {isAddSocial ? (
              < >
                <div className="flex items-center w-full gap-2 mb-5">
                  <FaInstagram size="1.5em" />
                  <input
                    className="w-full rounded-md input_foucs_border"
                    placeholder="https://www.instagram.com/"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value.replace('https://www.instagram.com/', ''))}
                  />
                  <button
                    className="w-fit flex items-center bg-[#7B61FF] border border-[#7B61FF] text-white rounded p-2 px-4"
                    onClick={() => handleAddNewSocial('instagram')}
                  >
                    {t('EditProfile.Add')}
                  </button>
                </div>
                <div className="flex items-center w-full gap-2 mb-5">
                  <FaLinkedin size="1.5em" />
                  <input
                    className="w-full rounded-md input_foucs_border"
                    placeholder="https://www.linkedin.com/in/"
                    value={linkedinHandle}
                    onChange={(e) => setLinkedinHandle(e.target.value.replace('https://www.linkedin.com/in/', ''))}
                  />
                  <button
                    className="w-fit flex items-center bg-[#7B61FF] border border-[#7B61FF] text-white rounded p-2 px-4"
                    onClick={() => handleAddNewSocial('linkedin')}
                  >
                    {t('EditProfile.Add')}
                  </button>
                </div>
                <div className="flex items-center w-full gap-2 mb-5">
                  <FaTwitter size="1.5em" />
                  <input
                    className="w-full rounded-md input_foucs_border"
                    placeholder="https://x.com/"
                    value={twitterHandle}
                    onChange={(e) => setTwitterHandle(e.target.value.replace('https://x.com/', ''))}
                  />
                  <button
                    className="w-fit flex items-center bg-[#7B61FF] border border-[#7B61FF] text-white rounded p-2 px-4"
                    onClick={() => handleAddNewSocial('twitter')}
                  >
                    {t('EditProfile.Add')}
                  </button>
                </div>
              </>
               ) : (
                <button
                  className="flex items-center gap-2 w-full border justify-center rounded-md border-[#C1C9FF] p-2"
                  onClick={() => setIsAddSocial(!isAddSocial)}
                >
                  <MdAdd /> {t('EditProfile.Addmore')}
                </button>
              )} 
            </div> */}
             <div className="w-full mt-3">
        {!addedPlatforms.has('instagram') && (
          <div className="flex items-center w-full gap-2 mb-5">
            <FaInstagram size="1.5em" />
            <input
              className="w-full rounded-md input_foucs_border"
              placeholder="https://www.instagram.com/"
              value={instagramHandle}
              onChange={(e) => setInstagramHandle(e.target.value.replace('https://www.instagram.com/', ''))}
            />
            <button
              className="w-fit flex items-center bg-[#7B61FF] border border-[#7B61FF] text-white rounded p-2 px-4"
              onClick={() => handleAddNewSocial('instagram')}
            >
              {t('EditProfile.Add')}
            </button>
          </div>
        )}
        {!addedPlatforms.has('linkedin') && (
          <div className="flex items-center w-full gap-2 mb-5">
            <FaLinkedin size="1.5em" />
            <input
              className="w-full rounded-md input_foucs_border"
              placeholder="https://www.linkedin.com/in/"
              value={linkedinHandle}
              onChange={(e) => setLinkedinHandle(e.target.value.replace('https://www.linkedin.com/in/', ''))}
            />
            <button
              className="w-fit flex items-center bg-[#7B61FF] border border-[#7B61FF] text-white rounded p-2 px-4"
              onClick={() => handleAddNewSocial('linkedin')}
            >
              {t('EditProfile.Add')}
            </button>
          </div>
        )}
        {!addedPlatforms.has('twitter') && (
          <div className="flex items-center w-full gap-2 mb-5">
            <FaTwitter size="1.5em" />
            <input
              className="w-full rounded-md input_foucs_border"
              placeholder="https://x.com/"
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value.replace('https://x.com/', ''))}
            />
            <button
              className="w-fit flex items-center bg-[#7B61FF] border border-[#7B61FF] text-white rounded p-2 px-4"
              onClick={() => handleAddNewSocial('twitter')}
            >
              {t('EditProfile.Add')}
            </button>
          </div>
        )}
      </div>
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer />
    </div>
  )
}

export default EditProfile
