import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { useAuth } from '../../../../Components/utils/useAuthClient';
import { useDispatch } from 'react-redux';
import { showAlert, hideAlert } from '../../../../Components/Reducers/Alert';
import { useTranslation } from 'react-i18next';
import certpng from '../../../../../assets/images/cert-1.png'

const DynamicCertificate = ({ setOpen, data, passRefUp, courseId }) => {
    const certificateRef = useRef(null);
    const dispatch = useDispatch();
    const { contentActor, actor } = useAuth();
    const [isMinted, setIsMinted] = useState(false);
    const [isMinting, setIsMinting] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (certificateRef.current) {
            passRefUp(certificateRef.current);
            console.log("Course ID:", courseId);
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

                setIsMinted(true); // Set minted state to true

                
                dispatch(showAlert({
                    type: "success",
                    text: t('DynamicCertificate.MintedSuccessfully')
                }));

            } catch (error) {
                console.error('Error during minting process:', error);
                dispatch(showAlert({
                    type: "danger",
                    text: t('DynamicCertificate.AlreadyMinted')
                }));

            } finally {
                setIsMinting(false); 
            }
        } else {
            console.error('Certificate reference is not available.');
        }
    };

    useEffect(() => {
        if (isMinted) {
            const alertTimeout = setTimeout(() => {
                dispatch(hideAlert());
                setOpen({ open: false, isDownload: false, data: null });
            }, 3000);
            return () => clearTimeout(alertTimeout);
        }
    }, [isMinted, dispatch, setOpen]);

    return (
        <div className="relative">
            <div className="print:w-full print:h-full w-[1000px] h-[700px] shadow relative" ref={certificateRef}>
                <img src={certpng} alt="Certificate Template" className="object-contain" />
                <div className="w-full px-[10%] absolute top-[40%] text-center">
                    <h1 className="text-3xl font-bold text-center">{data.student.studentName}</h1>
                    <p className="mt-6 text-base">{t('DynamicCertificate.Completed')} <strong>{data.CertificateName}</strong>. {t('DynamicCertificate.RemarkableSkills')} <strong>{t('Congratulations')}</strong></p>
                    <h2 className='mt-32'>{data.student.educatorName}</h2>
                </div>
                <span className='absolute bottom-[15.5%] left-[18%]'>{data.id}</span>
            </div>
            {!isMinted && !isMinting && (
                <button className='bg-[#7B61FF] font-poppins rounded-lg text-white py-[13px] px-[26.5px] w-full absolute bottom-4 left-1/2 transform -translate-x-1/2' onClick={handleExportImageAsBase64}>
                    {t('DynamicCertificate.Mint')}
                </button>
            )}
        </div>
    );
};

export default DynamicCertificate;
