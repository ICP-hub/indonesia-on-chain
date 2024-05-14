import React from 'react';
import { X } from 'lucide-react';
import icp from '../../assets/images/icp.png';
import nfid from '../../assets/images/nfid.png';
import { useAuth } from '../Components/utils/useAuthClient';

const LoginSelect = ({ setClickConnectWallet }) => {
    const { login } = useAuth();
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
            <div className='relative bg-white rounded-xl shadow-2xl p-8 md:w-[70%] w-[90%] max-w-xl px-8'>
                <div className='flex justify-between items-center mb-4'>
                    <span className='font-nunitoSans font-medium text-2xl'>Select Login Option</span>
                    <span className='cursor-pointer' onClick={() => setClickConnectWallet(false)}><X /></span>
                </div>
                <div className='border-t border-gray-600 mb-4'></div>
                <div className='flex flex-col items-center gap-4'>
                    <div className='flex justify-between items-center gap-6 w-full p-6 bg-[#E4E4FE] hover:bg-violet-200  cursor-pointer rounded-xl'
                        onClick={() => {
                            login("Icp")
                        }}>
                        <img src={icp} alt="" className='w-8 h-8 transform scale-150' />
                        <div className='flex flex-col justify-start'>
                            <div className='font-normal text-xl font-cabin text-start'>Internet Identity</div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-6 w-full p-6 bg-[#E4E4FE] hover:bg-violet-200 cursor-pointer rounded-xl'
                        onClick={() => {
                            login("nfid")
                        }}>
                        <div className='pl-3'>
                            <img src={nfid} alt="" className='w-16 h-8 transform scale-150' />
                        </div>
                        <div className='flex flex-col justify-start'>
                            <div className='font-normal text-xl font-cabin text-start'>Nfid</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSelect;
