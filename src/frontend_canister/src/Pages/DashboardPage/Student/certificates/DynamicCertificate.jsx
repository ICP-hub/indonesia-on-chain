import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { useAuth } from '../../../../Components/utils/useAuthClient';
import { useDispatch } from 'react-redux';
import { showAlert, hideAlert } from '../../../../Components/Reducers/Alert';
import { useTranslation } from 'react-i18next';

const DynamicCertificate = ({ setOpen, data, passRefUp, courseId, courseDetails }) => {
    const certificateRef = useRef(null);
    const dispatch = useDispatch();
    const { contentActor, actor } = useAuth();
    const [certificateContent, setCertificateContent] = useState('');
    const [isMinted, setIsMinted] = useState(false);
    const [isMinting, setIsMinting] = useState(false); // Add state for button visibility
    const { t } = useTranslation('DynamicCertificate');

    useEffect(() => {
        passRefUp(certificateRef.current);
        console.log("course id", courseId);
    }, [passRefUp]);

    useEffect(() => {
        setCertificateContent(certificateRef.current);
    }, [data]);

    const handleExportImageAsBase64 = async () => {
        setIsMinting(true); // Hide button immediately
        setCertificateContent(certificateRef.current);
        html2canvas(certificateContent)
            .then(function (canvas) {
                return canvas.toDataURL('image/png');
            })
            .then(async function (dataUrl) {
                console.log("Data Url", dataUrl);
                console.log("userId", courseId);
                await contentActor.allvideowatched2(courseId, dataUrl).then(async function () {
                    const result = await actor.updateUserMintedCertificate(courseId);
                    const result1 = await actor.updateOngoingCourse(courseId);
                    console.log("User Certificate minted", result);
                    console.log("User Certificate minted1", result1);
                    setIsMinted(true); // Set isMinted to true after successful minting
                }).then(() => {
                    dispatch(showAlert({
                        type: "success",
                        text: t('MintedSuccessfully')
                    }));

                    setTimeout(() => {
                        dispatch(hideAlert());
                    }, 3000);

                    setOpen({
                        open: false,
                        isDownload: false,
                        data: null
                    });
                }).catch((err) => {
                    dispatch(showAlert({
                        type: "danger",
                        text: t('AlreadyMinted')
                    }));
                    setTimeout(() => {
                        dispatch(hideAlert());
                    }, 3000);
                    setIsMinted(true); // Set isMinted to true if it fails due to already being minted
                    setOpen({
                        open: false,
                        isDownload: false,
                        data: null
                    });
                });
            })
            .catch(function (error) {
                console.error('Error while exporting image', error);
            });
    };

    return (
        <div className="relative">
            <div className="print:w-full print:h-full w-[1000px] h-[700px] shadow relative" ref={certificateRef}>
                <img src="https://storage.googleapis.com/ioc-data/cert-1.png" alt="Certificate Template" className="object-contain" />
                <div className="w-full px-[10%] absolute top-[40%] text-center">
                    <h1 className="text-3xl font-bold text-center">{data.student.studentName}</h1>
                    <p className="mt-6 text-base">{t('Completed')} <strong>{data.CertificateName}</strong>. {t('RemarkableSkills')}<strong>{t('Congratulations')}</strong></p>
                    <h2 className='mt-32'>{data.student.educatorName}</h2>
                </div>
                <span className='absolute bottom-[15.5%] left-[18%]'>{data.id}</span>
            </div>
            {!isMinted && !isMinting && (
                <button className='bg-[#7B61FF] font-poppins rounded-lg text-white py-[13px] px-[26.5px] w-full absolute bottom-4 left-1/2 transform -translate-x-1/2' onClick={handleExportImageAsBase64}>{t('Mint')}</button>
            )}
        </div>
    );
};

export default DynamicCertificate;
