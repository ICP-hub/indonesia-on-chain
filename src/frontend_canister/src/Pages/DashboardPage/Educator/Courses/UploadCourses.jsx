import { FaVideo } from "react-icons/fa"
import ImageFrame from "../../../../../assets/images/Frame.png"
import HandbookIcon from "../../../../../assets/images/handbook.png"
import { MdAdd, MdClose, MdClosedCaptionOff, MdFolder, MdInsertDriveFile, MdOutlineMobileFriendly, MdOutlineOndemandVideo } from "react-icons/md"
import { SlArrowRight } from "react-icons/sl";
import React, { useEffect, useReducer } from "react"
import InputNumber from "../../../../Components/utils/InputNumber"
import { IoTrophyOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
const initialState = {
    loading: false,
    courseChapterData: [],
    courseImage: {
        coverImageRaw: null,
        coverImageURI: null
    },
    courseChapter: {
        chapter_0: {
            id: 0,
            title: "",
        }
    }
}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading: true
            }
        case "ADD_IMAGE":
            return {
                ...state,
                courseImage: action.payload
            }
        case "UPLOAD_COURSE":
            return {
                ...state,
                loading: false,
                courseContent: action.payload
            }
        case "ADD_CHAPTER":
            return {
                ...state,
                loading: false,
                courseChapter: action.payload
            }
        case "CONVERT_ADD_CHAPTER":
            return {
                ...state,
                loading: false,
                courseChapterData: action.payload
            }
        default:
            return state
    }
}

const UploadCourses = () => {
    const { t } = useTranslation("EducatorCertificates");
    // temp data
    const freeCourseData = [
        {
            icon: <MdOutlineOndemandVideo />,
            title: "14.5 jam video on-demand",
        }, {
            icon: <MdInsertDriveFile />,
            title: "13 artikel",
        }, {
            icon: <MdFolder />,
            title: "3 sumber daya yang dapat diunduh",
        }, {
            icon: <MdOutlineMobileFriendly />,
            title: "Versi Mobile",
        }, {
            icon: <MdClosedCaptionOff />,
            title: "Teks terjemahan",
        }, {
            icon: <IoTrophyOutline />,
            title: "Sertifikat penyelesaian",
        }
    ];
    


    const [state, dispatch] = useReducer(courseReducer, initialState)
    const { courseChapter, courseChapterData, courseImage } = state

    function handleAddChapter() {
        const newChapter = {
            ...courseChapter,
            [`chapter_${courseChapterData.length}`]: {
                id: courseChapterData.length,
                title: ""
            }
        }
        dispatch({
            type: "ADD_CHAPTER",
            payload: newChapter
        })
    }

    function uniqueCourseContent(data) {
        const uniqueData = new Set(courseChapterData.map(d => d.id))
        const uniqueContent = data.filter(d => !uniqueData.has(d.id))

        dispatch({
            type: "CONVERT_ADD_CHAPTER",
            payload: [...courseChapterData, ...uniqueContent]
        })
    }

    const handleContentChange = (e) => {
        dispatch({
            type: "ADD_CHAPTER",
            payload: {
                ...courseChapter,
                [`chapter_${courseChapterData.length - 1}`]: {
                    id: courseChapterData.length - 1,
                    title: e.target.value
                }
            }
        })
    }

    const handleRemoveChapter = (id) => {
        const newChapter = { ...courseChapter }
        // console.log(courseChapter);
        // console.log(newChapter);
        delete newChapter[`chapter_${id}`]
        dispatch({
            type: "ADD_CHAPTER",
            payload: newChapter
        })
        dispatch({
            type: "CONVERT_ADD_CHAPTER",
            payload: courseChapterData.filter(d => d.id !== id)
        })
    }

    const handleDrop = (e) => {
        e.preventDefault()

        const file = e.dataTransfer.files[0]
        console.log(file);
    }

    const handleFileUpload = (e) => {
        e.preventDefault()

        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            dispatch({
                type: "ADD_IMAGE",
                payload: {
                    coverImageRaw: file,
                    coverImageURI: reader.result
                }
            })
        }
    }

    const handleResetImage = () => {
        dispatch({
            type: "ADD_IMAGE",
            payload: {
                coverImageRaw: null,
                coverImageURI: null
            }
        })
    }

    useEffect(() => {
        if (Object.keys(courseChapter).length > 0) {
            uniqueCourseContent(Object.values(courseChapter))
        }
    }, [courseChapter])

    useEffect(() => {
        // console.log(courseChapterData);
        // console.log(courseChapter);
        console.log(courseImage);
    }, [courseImage])
   
    return (
        <div className="flex flex-col w-full mt-3 md:flex-row">
            <div className="w-full px-6 md:w-7/12 xl:md:w-8/12 lg:px-8 xl:px-14">
                <div className="w-full">
                    <h1 className="text-xl font-medium">{t("UploadCourse")}</h1>
                </div>
                <div className="flex flex-col w-full gap-8 mt-4 xl:mt-8 xl:flex-row">
                    <div className="w-full xl:w-6/12">
                        <div className="flex flex-col w-full">
                            <label htmlFor="title" className="font-medium"> {t("Title")}</label>
                            <input type="text" className="mt-2 rounded-md input_foucs_border" placeholder="Type here" />
                        </div>
                        <div className="flex flex-col w-full mt-4">
                            <label htmlFor="description" className="font-medium"> {t("Description")}</label>
                            <textarea name="description" id="description" className="h-24 mt-2 rounded-md resize-none input_foucs_border" placeholder="Type here"></textarea>
                        </div>
                    </div>
                    <div className="w-full xl:w-6/12">

                        <div className="flex w-full gap-3 mt-0 xl:mt-3">
                            {
                                courseImage?.coverImageURI !== null ?
                                    (<div className="relative w-full h-24 mt-2 border border-purple-200 rounded-md xl:mt-5">
                                        <img src={courseImage?.coverImageURI} alt="cover_image" className="object-fill w-full h-full rounded-md" />
                                        <span className="absolute p-1 text-white bg-red-500 rounded-full cursor-pointer top-1 right-1" onClick={handleResetImage}>
                                            <MdClose />
                                        </span>
                                    </div>) : (<label htmlFor="cover_image" className="w-full text-sm md:text-base" onDrop={handleDrop}>
                                        <div className="w-full bg-[#907EFF] hover:bg-[#8474ed] p-4 rounded-md mt-2 xl:mt-5 flex items-center justify-evenly cursor-pointer">
                                            <input type="file" name="cover_image" id="cover_image" className="hidden" onChange={handleFileUpload} />
                                            <div className="flex items-center justify-center bg-white rounded-full w-14 h-14 md:w-16 md:h-16">
                                                <img src={ImageFrame} alt="ImageFrame" className="object-contain w-8 h-8 cursor-pointer" />
                                            </div>
                                            <div className="flex flex-col p-2 text-white cursor-pointer">
                                                <span>{t("UploadCoverImage")}</span>
                                                <span className="text-gray-200">{t("Droporbrowse")}</span>
                                            </div>

                                        </div>
                                    </label>)
                            }
                        </div>

                        <div className="flex w-full gap-3 mt-4">
                            <div className="flex flex-col w-6/12">
                                <label htmlFor="language" className="font-medium">{t("Language")}</label>
                                <select name="language" id="language" className="mt-2 rounded-md cursor-pointer input_foucs_border">
                                    <option value="#">{t("Pleaseselect")}</option>
                                    <option value="English">{t("English")}</option>
                                    <option value="Hindi">{t("Hindi")}</option>
                                    <option value="Marathi">{t("Marathi")}</option>
                                    <option value="Bengali">{t("Bengali")}</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-6/12">
                                <label htmlFor="skills" className="font-medium">{t("SkillLevel")}</label>
                                <select name="skills" id="skills" className="mt-2 rounded cursor-pointer input_foucs_border">
                                    <option value="#">{t("Pleaseselect")}</option>
                                    <option value="Beginner">{t("Beginner")}</option>
                                    <option value="Intermediate">{t("Intermediate")}</option>
                                    <option value="Advanced">{t("Advanced")}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-5">
                    <div className="w-full">
                        <h1 className="font-medium">{t("CourseContent")}</h1>
                    </div>
                    <div className="w-full">
                        {
                            courseChapterData.length > 0 ? courseChapterData.map((item, index) => (
                                <div key={index} className="flex flex-col items-center w-full p-3 my-3 bg-white rounded-md xl:flex-row">
                                    <div className="w-full font-medium text-gray-600 xl:w-2/12">
                                    {t("Chapter")} {item?.id + 1}
                                    </div>
                                    <div className="flex items-center w-full gap-2 my-2 xl:w-7/12 lg:my-0">
                                        <label htmlFor="chapter_title" className="text-sm font-medium">{t("Title")}</label>
                                        <input type="text" className="w-full mt-2 rounded-md input_foucs_border" placeholder="Type here" value={courseChapter[`chapter_${index}`]?.title} onChange={handleContentChange} />

                                    </div>
                                    <div className="flex items-center justify-end w-full gap-3 mt-2 xl:w-3/12 xl:mt-0">
                                        <button className="bg-[#907EFF] hover:bg-[#8474ed] h-full text-white py-2 px-3 text-sm rounded-md flex items-center gap-2">
                                            <FaVideo />
                                            {t("UpCourse")}</button>

                                        {
                                            item?.id !== 0 &&
                                            <span className="text-red-500 cursor-pointer" onClick={() => handleRemoveChapter(item?.id)}>
                                                <MdClose size={18} />
                                            </span>}
                                    </div>
                                </div>)) : "Add Chapters"
                        }
                        <div className="flex w-full mt-3">
                            <button onClick={() => handleAddChapter()} className="bg-[#907EFF] hover:bg-[#8474ed] text-white py-2 px-3 gap-2 flex items-center text-sm rounded-md">
                                <MdAdd size={18} /> {t("AddChapters")}</button>
                        </div>
                    </div>
                </div>
                <div className="w-full pb-6 mt-5">
                    <div className="w-full">
                        <h1 className="font-medium">{t("OtherInformation")}</h1>
                    </div>
                    <div className="w-full">

                        <div className="flex flex-col items-end w-full gap-4 p-3 my-3 bg-white rounded-md xl:flex-row">
                            <div className="flex flex-col w-full xl:w-4/12">
                                <label htmlFor="language" className="font-medium">{t("Price")}</label>
                                <div className="flex w-full">
                                    <span>
                                        <select name="language" id="language" className="mt-2 rounded-l cursor-pointer input_foucs_border">
                                            <option value="$">$</option>
                                            <option value="₹">₹</option>
                                            <option value="€">€</option>
                                            <option value="£">£</option>
                                            <option value="¥">¥</option>
                                            <option value="฿">฿</option>
                                            <option value="₩">₩</option>
                                        </select>
                                    </span>
                                    <InputNumber className="w-full mt-2 rounded-r input_foucs_border" placeholder="00" name={"price"} id={"price"} />
                                </div>

                            </div>
                            <div className="flex flex-col w-full xl:w-4/12">
                                <label htmlFor="language" className="font-medium">{t("Category")}</label>
                                <select name="language" id="language" className="mt-2 rounded cursor-pointer input_foucs_border">
                                    <option value="#">{t("Pleaseselect")}</option>
                                    <option value="English">{t("English")}</option>
                                    <option value="Hindi">{t("Hindi")}</option>
                                    <option value="Marathi">{t("Marathi")}</option>
                                    <option value="Bengali">{t("Bengali")}</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full xl:w-4/12">
                                <label htmlFor="language" className="font-medium">{t("Type")}</label>
                                <select name="language" id="language" className="mt-2 rounded cursor-pointer input_foucs_border">
                                    <option value="#">{t("Pleaseselect")}</option>
                                    <option value="English">{t("English")}</option>
                                    <option value="Hindi">{t("Hindi")}</option>
                                    <option value="Marathi">{t("Marathi")}</option>
                                    <option value="Bengali">{t("Bengali")}</option>
                                </select>
                            </div>
                            <div className="w-full lg:w-4/12">
                                <button onClick={() => handleAddChapter()} className="w-full bg-[#907EFF] hover:bg-[#8474ed] text-white py-2 px-3 gap-2 flex items-center text-sm rounded-md justify-center">
                                {t("SubmitforReview")}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="w-full px-2 md:w-5/12 xl:md:w-4/12 lg:px-8">
                <div className="w-full bg-[#F7F7F7] p-3 rounded-md">
                    <h1 className="font-semibold">{t("Guides")}</h1>
                    <div className="w-full">
                        {
                            [1, 2, 3].map((item, index) => (
                                <div className="flex items-center w-full p-2 my-3 bg-white rounded-md" key={index}>
                                    <div className="w-4/12 h-16">
                                        <img src={"https://placehold.co/600x400"} alt="GuideImage" className="object-cover w-full h-full rounded-md" />
                                    </div>
                                    <div className="flex flex-col w-8/12 p-2">
                                        <p className="text-sm font-medium">{t("UploadCourseCorrectly")}</p>
                                        {/* <p className="text-sm text-gray-500">Guide Description</p> */}
                                    </div>
                                </div>
                            ))
                        }


                    </div>
                </div>
                <div className="w-full p-4 mt-6 bg-white rounded-md">
                    <h2 className="text-sm font-semibold">{t("FullCourse")}</h2>
                    <h1 className="text-lg font-bold">{t("FREE")}</h1>
                    <div className="w-full mt-4">
                        <span className="text-sm font-medium">{t("CourseIncludes")}</span>
                        <div className="w-full">
                            {
                                freeCourseData.map(i => <p className="flex items-center gap-1 my-2 text-sm text-gray-700" key={i.title}>{i.icon} {i.title}</p>)
                            }
                        </div>

                    </div>
                </div>
                <div className="w-full mt-6">
                    <Link to={"/handbook"} className="flex bg-[#9e9e9e] hover:bg-[#abaaaa] text-white rounded-md p-3 gap-3 items-center">
                        <img src={HandbookIcon} alt="Handbook Icon" className="w-16 h-16" />
                        <div className="w-full">
                            <p className="text-lg font-medium">{t("Handbook")}</p>
                            <p>{t("MustReadTeacher")}</p>
                        </div>
                        <SlArrowRight size={24} />
                    </Link>
                </div>
                <div className="w-full p-4 mt-6 bg-white rounded-md">
                    <h1 className="font-semibold">{t("LastSubmitted")}</h1>
                    <div className="w-full mt-4">
                        <div className="flex justify-between mb-3">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{t("Logotype")}</span>
                                <span className="text-xs font-medium text-gray-400">Aug 21, 2021</span>
                            </div>
                            <button className="bg-[#907EFF] text-xs hover:bg-[#8474ed] text-white p-2 gap-2 rounded-md">
                            {t("PUBLISHED")}
                            </button>
                        </div>
                        <div className="flex justify-between mb-3">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{t("AdobeIllustrator")}</span>
                                <span className="text-xs font-medium text-gray-400">Aug 21, 2021</span>
                            </div>
                            <button className="bg-[#907EFF] text-xs hover:bg-[#8474ed] text-white p-2 gap-2 rounded-md">
                            {t("PUBLISHED")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadCourses