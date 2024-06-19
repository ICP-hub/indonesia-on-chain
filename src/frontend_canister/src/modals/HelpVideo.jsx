import React from 'react';
import { X } from 'lucide-react';
import ReactPlayer from 'react-player'

import { useTranslation } from 'react-i18next';
const HelpVideo = ({ setHelpVideoOpen }) => {
    const { t } = useTranslation();
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
            <div className='relative bg-white rounded-xl shadow-2xl p-8 md:w-[70%] w-[90%] max-w-3xl px-8'>
                <div className='flex justify-between items-center mb-4'>
                    <span className='font-nunitoSans font-medium text-2xl'>{t('LoginModals.HowtoLogin')}</span>
                    <span className='cursor-pointer' onClick={() => setHelpVideoOpen(false)}><X /></span>
                </div>
                <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ'  controls={true} width='100%'/>
            </div>
        </div>
    );
};

export default HelpVideo;
