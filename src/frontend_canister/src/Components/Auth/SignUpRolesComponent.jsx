import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const SignUpRolesComponent = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className=' w-full md:w-1/2 flex flex-col md:overflow-hidden justify-center items-center'>

            <div className='flex flex-col items-center justify-center'>
                <h1 className='font-poppins font-[400] text-4xl text-black'>{t('SignUpRolesComponent.welcome')}</h1>
                <h2 className='font-poppins font-[300] text-xl text-[#5F5F5F] pt-2'>{t('SignUpRolesComponent.continueAs')}</h2>

                <div className='pt-8 space-y-4 flex flex-col justify-center items-center text-white'>
                    <button className='font-poppins font-[300] text-xl items-center py-4 md:px-[9rem] lg:px-[11rem] px-[4rem] bg-[#3400B1] rounded-full'
                        onClick={() => {
                            navigate(
                                process.env.DFX_NETWORK === "ic"
                                    ? '/signup-student'
                                    : `/signup-student?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`);
                        }}
                    >
                        {t('SignUpRolesComponent.studentButton')}
                    </button>

                    <button className='font-poppins font-[300] text-xl items-center py-4 md:px-[9rem] lg:px-[11rem] px-[4rem] bg-[#3400B1] rounded-full'
                        onClick={() => {
                            navigate(
                                process.env.DFX_NETWORK === "ic"
                                    ? '/signup-educator'
                                    : `/signup-educator?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`);
                        }}
                    >
                        {t('SignUpRolesComponent.educatorButton')}
                    </button>

                </div>
            </div>


        </div>
    )
}

export default SignUpRolesComponent
