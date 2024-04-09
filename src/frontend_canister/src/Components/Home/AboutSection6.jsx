import React, { useEffect } from 'react'
import img1 from '../../../assets/images/courseOne.png'
import img2 from '../../../assets/images/courseTwo.png'
import img3 from '../../../assets/images/courseThree.png'
import img4 from '../../../assets/images/courseFour.png'
import { useAuth } from '../utils/useAuthClient'
const AboutSection6 = () => {
    const { contentActor } = useAuth()
    const [allCourse, setAllCourse] = React.useState([]);

    useEffect(() => {
        const fetchAllCourse = async () => {
            try {
                const user = await contentActor.getallCourse();
                let number = parseInt(user.leaf.size);
                const newData = [];
                for (let i = 0; i < number; i++) {

                    let time = 0;
                    let newCourse = user.leaf.keyvals;
                    while (time < i) {
                        newCourse = newCourse[0][1];
                        time++;
                    }
                    newCourse = newCourse[0][0][1];
                    newData.push(newCourse);
                }
                console.log(newData);
                // testing---if no course exist
                // newData.forEach(async (item) => {
                //     await contentActor.deleteCourse(item.courseId)
                // })
                
                setAllCourse(newData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCourse();
    }, []);
    return (
        <>
            {
                allCourse.length > 0 ?

                    <>
                        <h2 className='text-4xl text-center mt-40 space-x-2'>
                            <span className='font-poppins text-[#2F327D] font-[700]'>Our Best </span>
                            <span className='font-nunitoSans text-[#7B61FF] font-[700]'>Blockchain</span>
                            <span className='font-poppins text-[#2F327D] font-[700]'>Courses </span>


                        </h2>

                        <h2 className='text-center mt-4'>
                            <span
                                className='text-2xl font-[400] font-poppins text-center text-[#696984]
                    mt-[400px]'
                            >Dive into the world of blockchain with our top-notch courses! Here’s some of our Featured Courses.</span>
                        </h2>


                        <div className='w-full items-center'>
                            <div className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12  mx-[10%] pt-[5.25rem] '>
                                {
                                    allCourse.splice(0, 4).map((item, index) => {

                                        return (
                                            <div className='col-span-3 relative p-8' key={index}>
                                                <img src={item.courseImg} alt="" />

                                                <div className='absolute bg-white p-6 flex justify-between space-x-4  py-4
                                         rounded-md w-[75%] items-center left-[12.5%] bottom-12 font-quickSand
                                    '>
                                                    <span className='font-[400] text-xs '>{item && item.courseTitle.substring(0, 20)}</span>
                                                    <span className='font-[300] text-[10px]'>{ }</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </> : <></>
            }
        </>
    )
}

export default AboutSection6;
