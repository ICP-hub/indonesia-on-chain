import React, { useRef } from 'react'
// import { useLocation } from "react-router-dom"
import CertificateTemplate from "../../../assets/indonesia-certificate.svg"
import html2pdf from 'html2pdf.js';

const DynamicCertificate = ({ state }) => {
    // const { state } = useLocation()
    const certificateRef = useRef()

    const downloadCertificate = () => {
        try {
            const element = certificateRef.current;

            html2pdf().set({
                filename: 'certificate.pdf',
                jsPDF: { format: `a4`, orientation: 'landscape' },
                html2canvas: {
                    scale: 1
                },
            }).from(element).save();
        } catch (error) {
            console.log(error);
            alert("Failed to download certificate. Please try again later.");
            return;
        }
    }
    console.log(location);
    return (
        <div className="w-full bg-gray-100 flex flex-col justify-center items-center p-8 overflow-auto">
            <div className="print:w-full print:h-full w-[1000px] h-[700px] shadow relative" ref={certificateRef}>
                <img src={CertificateTemplate} alt="Certificate Template" className="object-contain" />
                <div className="w-full px-[10%] absolute top-[40%] text-center">
                    <h1 className="text-center text-3xl font-bold">{state.studentName}</h1>
                    <p className="mt-4 text-base">has successfully completed the course on <strong>Blockchain</strong> starting from {state.startDate} to {state.endDate}. Their remarkable coding skills and perseverance demonstrate their talent in the field. <strong>Congratulations on the impressive accomplishment.</strong></p>
                    <h2 className='mt-32'>{state.educatorName}</h2>
                </div>
            </div>
            <button onClick={downloadCertificate} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Download Certificate</button>
        </div>
    )
}

export default DynamicCertificate