import React from 'react'
import City from '../../../assets/Vectors/City.png'
const AboutSection5 = () => {
    return (
        <>
            <section className='mx-[10%] flex flex-col  items-center md:flex-row md:justify-between mt-[3.75rem]'>

                <div className='md:w-1/2 w-full 
                '>
                    <img src={City} alt="" />

                </div>
                <div className='md:w-1/2 w-full text-center md:text-left justify-around 
                grid grid-cols-1  content-center space-y-4 items-center
                '>

                    <h2 className='text-3xl md:w-[5%] w-full items-center space-x-2 '>
                        <span className=' text-[#2F327D] font-[600]'>
                            Assessments,
                            <br />
                        </span>
                        <span className=' text-[#7B61FF] font-[600]'>
                            Quizzes
                            <span className=' text-[#2F327D] font-[600]'>,</span>
                        </span>
                        <span className=' text-[#2F327D] font-[600]'>
                            Tests
                        </span>
                    </h2>

                    <p className='text-[#696984] font-[400] text-xl font-poppins w-full md:w-[80%] leading-8'>
                        Easily launch live assignments, quizzes, and tests.
                        Student results are automatically entered in the online gradebook.
                    </p>
                </div>
            </section>

            <div className='flex justify-center'>
                <button className='border border-purple-600 mt-[1rem] py-[0.69rem] px-[1.70rem] rounded-full'>
                    <span className=' text-[#7B61FF]'>See more features</span>
                </button>
            </div>
        </>
    )
}

export default AboutSection5
