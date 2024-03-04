import React from 'react'
import Clasroom from '../../../assets/Vectors/Classroom.png'
import orangeBox from '../../../assets/Vectors/orangeBox.png'
import PurpleBox from '../../../assets/Vectors/PurpleBox.png'
import Ellipse from '../../../assets/Vectors/Ellipse.png'
import EllipsePurple from '../../../assets/Vectors/EllipsePurple.png'
const AboutSection3 = () => {
    return (
        <section className=' mt-40 mx-[10%] flex justify-between'>

            <div className='w-1/2 relative justify-between'>
                <img src={EllipsePurple} alt="" className='-z-10 absolute -left-5 top-[1.75rem]' />
                <div className='pt-12'>
                    <span className=' text-3xl text-[#2F327D] font-[600] font-poppins'>Everything you can do in a physical classroom, </span>
                    <span className=' text-3xl text-[#7B61FF] font-[600] font-poppins'>you can do here</span>
                </div>

                <p className='text-[#696984] font-[400] text-xl pt-4 font-poppins leading-8 w-[80%]'>Indonesia on Chain offers a dynamic learning experience, providing comprehensive courses that demystify blockchain technology whether you're a beginner or an enthusiast.</p>
            </div>

            <div className='relative justify-between'>
                <img src={Clasroom} alt="classroom" className='z-50 cursor-pointer' />
                <img src={orangeBox} alt="orangeBox" className='-bottom-4 -right-4 absolute -z-10' />
                <img src={Ellipse} alt="ellipse" className='top-[13.75rem] -left-[2.40rem] absolute' />
                <img src={PurpleBox} alt="PurpleBox" className='-top-4 -left-4 absolute -z-10' />
            </div>
        </section>
    )
}

export default AboutSection3
