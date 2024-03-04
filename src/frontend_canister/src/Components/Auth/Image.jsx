import React from 'react'
import MainLogo1 from '../../../assets/Vectors/MainLogo1.png'
import IndonesiaOnChain from '../../../assets/Vectors/IndonesiaOnChain.png'


const Image = () => {
    return (
        <div className='w-1/2 flex justify-center  items-end object-cover bg-no-repeat bg-[#e7dfff] relative'>
            <img src={IndonesiaOnChain} alt="" className='absolute top-[2.5rem] left-[7rem]'/>
            <img src={MainLogo1} alt=""  className='h-screen'/>
        </div>
    )
}

export default Image
