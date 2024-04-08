import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import CertificateTemplate from "../../../../../assets/images/cert-1.png";

const DynamicCertificate = ({ data, passRefUp }) => {
    const certificateRef = useRef(null);
    const [certificateContent, setCertificateContent] = useState('');

    useEffect(() => {
        passRefUp(certificateRef.current);
    }, [passRefUp]);

    useEffect(() => {
        setCertificateContent(certificateRef.current);
    }, [data]);

    const handleExportImageAsBase64 = () => {
        setCertificateContent(certificateRef.current);
        
        html2canvas(certificateContent)
            .then(function (canvas) {
                
                return canvas.toDataURL('image/png');
            })
            .then(function (dataUrl) {
                
                console.log(dataUrl);
            })
            .catch(function (error) {
                console.error('Error while exporting image', error);
            });
    };

    return (
        <div className="relative">
            <div className="print:w-full print:h-full w-[1000px] h-[700px] shadow relative" ref={certificateRef}>
                <img src={CertificateTemplate} alt="Certificate Template" className="object-contain" />
                <div className="w-full px-[10%] absolute top-[40%] text-center">
                    <h1 className="text-3xl font-bold text-center">{data.student.studentName}</h1>
                    <p className="mt-6 text-base">has successfully completed the <strong>{data.CertificateName}</strong>. Their remarkable coding skills and perseverance demonstrate their talent in the field. <strong>Congratulations on the impressive accomplishment.</strong></p>
                    <h2 className='mt-32'>{data.student.educatorName}</h2>
                </div>
                <span className='absolute bottom-[15.5%] left-[18%]'>{data.id}</span>
            </div>
            <button className='bg-[#7B61FF] font-poppins rounded-lg text-white py-[13px] px-[26.5px] w-full absolute bottom-4 left-1/2 transform -translate-x-1/2' onClick={handleExportImageAsBase64}>Mint</button>
        </div>
    );
}

export default DynamicCertificate;
