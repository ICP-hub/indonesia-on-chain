import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { useAuth } from '../../../../Components/utils/useAuthClient';
import { useDispatch } from 'react-redux';
import { showAlert, hideAlert } from '../../../../Components/Reducers/Alert';
import { useTranslation } from 'react-i18next';
import certpng from '../../../../../assets/images/cert-1.png';
import certpng2 from '../../../../../assets/images/cert-2.png'

const DynamicCertificate = ({ setOpen, data, passRefUp, courseId }) => {
    const certificateRef = useRef(null);
    const dispatch = useDispatch();
    const { contentActor, actor } = useAuth();
    const [isMinted, setIsMinted] = useState(false);
    const [isMinting, setIsMinting] = useState(false);
    const { t } = useTranslation();
const navigate =useNavigate();
const getData = async () =>{
    console.log(await actor.get_user_marks(),'marks data');
}
    useEffect(() => {
        if (certificateRef.current) {
            passRefUp(certificateRef.current);
            console.log("Course ID:", courseId);
            getData();
        }
    }, [passRefUp, courseId]);

    const handleExportImageAsBase64 = async () => {
        setIsMinting(true); // Start minting process
        if (certificateRef.current) {
            try {
                // Capture certificate content to canvas
                const canvas = await html2canvas(certificateRef.current);
                const dataUrl = canvas.toDataURL('image/png');

                // Mint certificate and update user status
                await contentActor.allvideowatched2(courseId, dataUrl);
                const result = await actor.updateUserMintedCertificate(courseId);
                const result1 = await actor.updateCompletedCourse(courseId);
                
                console.log("User Certificate minted:", result);
                console.log("Completed Course updated:", result1);

                setIsMinted(true); // Set minting state to true

                // Show success alert and close modal after 3 seconds
                dispatch(showAlert({
                    type: "success",
                    text: t('DynamicCertificate.MintedSuccessfully')
                }));
                setTimeout(() => {
                    dispatch(hideAlert());
                    setOpen({ open: false, isDownload: false, data: null });
                }, 3000);
                navigate('/student-dashboard/my-certificates');
            } catch (error) {
                console.error('Error during minting process:', error);

                // Show error alert and set minted state to true (if failed due to already minted)
                dispatch(showAlert({
                    type: "danger",
                    text: t('DynamicCertificate.AlreadyMinted')
                }));
                setTimeout(() => {
                    dispatch(hideAlert());
                    setIsMinted(true); // Set minted state to true
                    setOpen({ open: false, isDownload: false, data: null });
                }, 3000);
                navigate('/student-dashboard/my-certificates');
            } finally {
                setIsMinting(false); // Reset minting state
            }
        } else {
            console.error('Certificate reference is not available.');
        }
    };

    return (
        <div className="relative">
            <div className="print:w-full print:h-full w-[1000px] h-[700px] shadow relative" ref={certificateRef}>
                <img src={certpng2} alt="Certificate Template" className="object-contain" />
                <div className="w-full px-[10%] absolute top-[46%] text-center">
                    <h1 className="text-3xl font-bold text-center">{data.student.studentName}</h1>
                    <p className="mt-6 text-base">{t('DynamicCertificate.Completed')} <strong>{data.CertificateName}</strong>. {t('DynamicCertificate.RemarkableSkills')} <strong>{t('Congratulations')}</strong></p>
                    <h2 className='mt-[5rem]'>{data.student.educatorName}</h2>
                </div>
                <span className='absolute top-[24%] right-[8%]'><span className='text-[#54126E] text-sm'>Serial No. : <b>{data.id}</b></span></span>
            </div>
            {!isMinted && (
                <>
                    {!isMinting && (
                        <button
                            className='bg-[#7B61FF] font-poppins rounded-lg text-white py-[13px] px-[26.5px] w-full absolute bottom-4 left-1/2 transform -translate-x-1/2'
                            onClick={handleExportImageAsBase64}
                        >
                            {t('DynamicCertificate.Mint')}
                        </button>
                    )}
                    {isMinting && (
                        <button
                            className='bg-gray-500 font-poppins rounded-lg text-white py-[13px] px-[26.5px] w-full absolute bottom-4 left-1/2 transform -translate-x-1/2'
                            disabled
                        >
                            <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 mx-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                            {t('DynamicCertificate.Processing')}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default DynamicCertificate;
