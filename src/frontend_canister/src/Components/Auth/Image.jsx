import React from 'react'
import MainLogo1 from '../../../assets/Vectors/MainLogo1.png'
import IndonesiaOnChain from '../../../assets/Vectors/IndonesiaOnChain.png'


const Image = () => {
    return (
        <div className='hidden w-1/2 md:flex  md:justify-center  md:items-end md:object-cover md:bg-no-repeat md:bg-[#e7dfff] fixed'>
            <img src={IndonesiaOnChain} alt="" className='absolute top-[2.5rem] left-[7rem]' />
            <img src={MainLogo1} alt="" className='h-screen' />
        </div>
    )
}

export default Image
