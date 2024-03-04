import React from 'react'
import CollegeGirl from '../../../assets/Vectors/CollegeGirl.png'
const AboutSection4 = () => {
    return (
        <>
            <h2 className='text-4xl text-center mt-40 '>
                <span className='font-poppins text-[#2F327D] font-[700]'>Our </span>
                <span className='font-nunitoSans text-[#7B61FF] font-[700]'>Features</span>


            </h2>

            <h2 className='text-center mt-4'>
                <span
                    className='text-2xl font-[400] font-poppins text-center text-[#696984]
                    mt-[400px]'
                >This very extraordinary feature, can make blockchain learning activities more efficient.</span>
            </h2>

            <section className='mx-[10%] flex justify-between mt-[3.75rem]'>

                <div className='w-1/2 text-left justify-around 
                grid grid-cols-1  content-center space-y-4
                '>

                    <h2 className='text-3xl w-[50%] space-x-2'>
                        <span className='text-[#7B61FF] font-[600]'>
                            Tools
                        </span>
                        <span className='text-[#2F327D] font-[600]'>
                            For Educators

                            And Learners
                        </span>
                    </h2>

                    <p className='text-[#696984] font-[400] text-xl font-poppins w-[80%] leading-8'>
                        Indonesia on Chain offers a dynamic learning experience, providing comprehensive courses that demystify blockchain technology whether you're a beginner or an enthusiast.
                    </p>
                </div>

                <div className='relative justify-between'>
                    <img src={CollegeGirl} alt="classroom" className='z-50 cursor-pointer' />

                </div>
            </section>
        </>
    )
}

export default AboutSection4
