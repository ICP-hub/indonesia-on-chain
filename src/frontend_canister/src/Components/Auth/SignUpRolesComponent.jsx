import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const SignUpRolesComponent = () => {
    const navigate = useNavigate();


    return (
        <div className=' w-1/2 flex flex-col justify-center items-center'>

            <div className='flex flex-col items-center justify-center'>
                <h1 className='font-poppins font-[400] text-4xl text-black'>Welcome!</h1>
                <h2 className='font-poppins font-[300] text-xl text-[#5F5F5F] pt-2'>Continue as</h2>

                <div className='pt-8 space-y-4 flex flex-col justify-center items-center text-white'>
                    <button className='font-poppins font-[300] text-xl items-center py-4 px-[11rem] bg-[#3400B1] rounded-full'
                        onClick={() => {
                            navigate(
                                process.env.DFX_NETWORK === "ic"
                                    ? '/signup-student'
                                    : `/signup-student?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`);
                        }}
                    >
                        Student
                    </button>

                    <button className='font-poppins font-[300] text-xl items-center py-4 px-[11rem] bg-[#3400B1] rounded-full'
                        onClick={() => {
                            navigate(
                                process.env.DFX_NETWORK === "ic"
                                    ? '/signup-educator'
                                    : `/signup-educator?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`);
                        }}
                    >
                        Educator
                    </button>

                </div>
            </div>


        </div>
    )
}

export default SignUpRolesComponent
