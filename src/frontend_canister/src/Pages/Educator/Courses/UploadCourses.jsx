import { FaVideo } from "react-icons/fa"
import ImageFrame from "../../../../assets/Vectors/Frame.png"
import HandbookIcon from "../../../../assets/Vectors/handbook.png"
import { MdAdd, MdClose, MdClosedCaptionOff, MdFolder, MdInsertDriveFile, MdOutlineMobileFriendly, MdOutlineOndemandVideo } from "react-icons/md"
import { SlArrowRight } from "react-icons/sl";
import React, { useEffect, useReducer } from "react"
import InputNumber from "../../../Components/utils/InputNumber"
import { IoTrophyOutline } from "react-icons/io5"
import { Link } from "react-router-dom"

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
    // temp data
    const freeCourseData = [
        {
            icon: <MdOutlineOndemandVideo />,
            title: "14.5 hours on-demand video",
        }, {
            icon: <MdInsertDriveFile />,
            title: "13 articles",
        }, {
            icon: <MdFolder />,
            title: "3 downloadable resources",
        }, {
            icon: <MdOutlineMobileFriendly />,
            title: "Mobile Version",
        }, {
            icon: <MdClosedCaptionOff />,
            title: "Closed captions",
        }, {
            icon: <IoTrophyOutline />,
            title: "Certificate of completion",
        }
    ]


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
        console.log(courseChapter);
        console.log(newChapter);
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
        <div className="w-full flex mt-3 flex-col md:flex-row">
            <div className="w-full md:w-7/12 xl:md:w-8/12 px-6 lg:px-8 xl:px-14">
                <div className="w-full">
                    <h1 className="text-xl font-medium">Upload New Course</h1>
                </div>
                <div className="w-full mt-4 xl:mt-8 flex-col xl:flex-row flex gap-8">
                    <div className="w-full xl:w-6/12">
                        <div className="w-full flex flex-col">
                            <label htmlFor="title" className="font-medium">Title</label>
                            <input type="text" className="input_foucs_border mt-2 rounded-md" placeholder="Type here" />
                        </div>
                        <div className="w-full flex flex-col mt-4">
                            <label htmlFor="description" className="font-medium">Description</label>
                            <textarea name="description" id="description" className="mt-2 h-24 rounded-md resize-none input_foucs_border" placeholder="Type here"></textarea>
                        </div>
                    </div>
                    <div className="w-full xl:w-6/12">

                        <div className="w-full flex mt-0 xl:mt-3 gap-3">
                            {
                                courseImage?.coverImageURI !== null ?
                                    (<div className="w-full h-24 rounded-md mt-2 xl:mt-5 border border-purple-200 relative">
                                        <img src={courseImage?.coverImageURI} alt="cover_image" className="w-full h-full object-fill rounded-md" />
                                        <span className="absolute bg-red-500 p-1 rounded-full top-1 cursor-pointer text-white right-1" onClick={handleResetImage}>
                                            <MdClose />
                                        </span>
                                    </div>) : (<label htmlFor="cover_image" className="w-full text-sm md:text-base" onDrop={handleDrop}>
                                        <div className="w-full bg-[#907EFF] hover:bg-[#8474ed] p-4 rounded-md mt-2 xl:mt-5 flex items-center justify-evenly cursor-pointer">
                                            <input type="file" name="cover_image" id="cover_image" className="hidden" onChange={handleFileUpload} />
                                            <div className="flex items-center justify-center bg-white rounded-full w-14 h-14 md:w-16 md:h-16">
                                                <img src={ImageFrame} alt="ImageFrame" className="w-8 h-8 object-contain cursor-pointer" />
                                            </div>
                                            <div className="p-2 flex flex-col text-white cursor-pointer">
                                                <span>Upload Cover Image (19:6)</span>
                                                <span className="text-gray-200">Drop your file here or browse</span>
                                            </div>

                                        </div>
                                    </label>)
                            }
                        </div>

                        <div className="w-full flex mt-4 gap-3">
                            <div className="w-6/12 flex flex-col">
                                <label htmlFor="language" className="font-medium">Language</label>
                                <select name="language" id="language" className="input_foucs_border mt-2 rounded-md cursor-pointer">
                                    <option value="#">Please select</option>
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Marathi">Marathi</option>
                                    <option value="Bengali">Bengali</option>
                                </select>
                            </div>
                            <div className="w-6/12 flex flex-col">
                                <label htmlFor="skills" className="font-medium">Skill Level</label>
                                <select name="skills" id="skills" className="input_foucs_border mt-2 rounded cursor-pointer">
                                    <option value="#">Please select</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-5">
                    <div className="w-full">
                        <h1 className="font-medium">Course Content</h1>
                    </div>
                    <div className="w-full">
                        {
                            courseChapterData.length > 0 ? courseChapterData.map((item, index) => (
                                <div key={index} className="w-full bg-white my-3 rounded-md p-3 flex flex-col xl:flex-row items-center">
                                    <div className="w-full xl:w-2/12 font-medium text-gray-600">
                                        Chapter {item?.id + 1}
                                    </div>
                                    <div className="w-full xl:w-7/12 flex gap-2 my-2 lg:my-0 items-center">
                                        <label htmlFor="chapter_title" className="font-medium text-sm">Title</label>
                                        <input type="text" className="w-full input_foucs_border mt-2 rounded-md" placeholder="Type here" value={courseChapter[`chapter_${index}`]?.title} onChange={handleContentChange} />

                                    </div>
                                    <div className="w-full xl:w-3/12 flex items-center mt-2 xl:mt-0 justify-end gap-3">
                                        <button className="bg-[#907EFF] hover:bg-[#8474ed] h-full text-white py-2 px-3 text-sm rounded-md flex items-center gap-2">
                                            <FaVideo />
                                            Upload Course</button>

                                        {
                                            item?.id !== 0 &&
                                            <span className="text-red-500 cursor-pointer" onClick={() => handleRemoveChapter(item?.id)}>
                                                <MdClose size={18} />
                                            </span>}
                                    </div>
                                </div>)) : "Add Chapters"
                        }
                        <div className="w-full flex mt-3">
                            <button onClick={() => handleAddChapter()} className="bg-[#907EFF] hover:bg-[#8474ed] text-white py-2 px-3 gap-2 flex items-center text-sm rounded-md">
                                <MdAdd size={18} /> Add Chapter</button>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-5 pb-6">
                    <div className="w-full">
                        <h1 className="font-medium">Other Information</h1>
                    </div>
                    <div className="w-full">

                        <div className="w-full bg-white my-3 rounded-md p-3 flex flex-col xl:flex-row items-end gap-4">
                            <div className="w-full xl:w-4/12 flex flex-col">
                                <label htmlFor="language" className="font-medium">Price</label>
                                <div className="flex w-full">
                                    <span>
                                        <select name="language" id="language" className="input_foucs_border mt-2 rounded-l cursor-pointer">
                                            <option value="$">$</option>
                                            <option value="₹">₹</option>
                                            <option value="€">€</option>
                                            <option value="£">£</option>
                                            <option value="¥">¥</option>
                                            <option value="฿">฿</option>
                                            <option value="₩">₩</option>
                                        </select>
                                    </span>
                                    <InputNumber className="w-full input_foucs_border mt-2 rounded-r" placeholder="00" name={"price"} id={"price"} />
                                </div>

                            </div>
                            <div className="w-full xl:w-4/12 flex flex-col">
                                <label htmlFor="language" className="font-medium">Category</label>
                                <select name="language" id="language" className="input_foucs_border mt-2 rounded cursor-pointer">
                                    <option value="#">Please select</option>
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Marathi">Marathi</option>
                                    <option value="Bengali">Bengali</option>
                                </select>
                            </div>
                            <div className="w-full xl:w-4/12 flex flex-col">
                                <label htmlFor="language" className="font-medium">Type</label>
                                <select name="language" id="language" className="input_foucs_border mt-2 rounded cursor-pointer">
                                    <option value="#">Please select</option>
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Marathi">Marathi</option>
                                    <option value="Bengali">Bengali</option>
                                </select>
                            </div>
                            <div className="w-full lg:w-4/12">
                                <button onClick={() => handleAddChapter()} className="w-full bg-[#907EFF] hover:bg-[#8474ed] text-white py-2 px-3 gap-2 flex items-center text-sm rounded-md justify-center">
                                    Submit for Review
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="w-full md:w-5/12 xl:md:w-4/12 px-2 lg:px-8">
                <div className="w-full bg-[#F7F7F7] p-3 rounded-md">
                    <h1 className="font-semibold">Guides</h1>
                    <div className="w-full">
                        {
                            [1, 2, 3].map((item, index) => (
                                <div className="w-full bg-white my-3 rounded-md p-2 flex items-center" key={index}>
                                    <div className="w-4/12 h-16">
                                        <img src={"https://placehold.co/600x400"} alt="GuideImage" className="w-full h-full object-cover rounded-md" />
                                    </div>
                                    <div className="w-8/12 flex flex-col p-2">
                                        <p className="font-medium text-sm">How to Upload Your Course Correctly</p>
                                        {/* <p className="text-sm text-gray-500">Guide Description</p> */}
                                    </div>
                                </div>
                            ))
                        }


                    </div>
                </div>
                <div className="w-full mt-6 bg-white p-4 rounded-md">
                    <h2 className="font-semibold text-sm">Full Course</h2>
                    <h1 className="font-bold text-lg">FREE</h1>
                    <div className="w-full mt-4">
                        <span className="text-sm font-medium">Course Includes:</span>
                        <div className="w-full">
                            {
                                freeCourseData.map(i => <p className="flex text-sm items-center gap-1 my-2 text-gray-700" key={i.title}>{i.icon} {i.title}</p>)
                            }
                        </div>

                    </div>
                </div>
                <div className="w-full mt-6">
                    <Link to={"/handbook"} className="flex bg-[#9e9e9e] hover:bg-[#abaaaa] text-white rounded-md p-3 gap-3 items-center">
                        <img src={HandbookIcon} alt="Handbook Icon" className="w-16 h-16" />
                        <div className="w-full">
                            <p className="font-medium text-lg">Handbook</p>
                            <p>Must Read if You are a Teacher</p>
                        </div>
                        <SlArrowRight size={24} />
                    </Link>
                </div>
                <div className="w-full mt-6 bg-white p-4 rounded-md">
                    <h1 className="font-semibold">Last Submitted</h1>
                    <div className="w-full mt-4">
                        <div className="flex justify-between mb-3">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">How to Design a Logotype</span>
                                <span className="text-xs font-medium text-gray-400">Aug 21, 2021</span>
                            </div>
                            <button className="bg-[#907EFF] text-xs hover:bg-[#8474ed] text-white p-2 gap-2 rounded-md">
                                PUBLISHED
                            </button>
                        </div>
                        <div className="flex justify-between mb-3">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Adobe Illustrator Masterclass</span>
                                <span className="text-xs font-medium text-gray-400">Aug 21, 2021</span>
                            </div>
                            <button className="bg-[#907EFF] text-xs hover:bg-[#8474ed] text-white p-2 gap-2 rounded-md">
                                PUBLISHED
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadCourses