import React, { useEffect, useRef } from 'react'
// import { useLocation } from "react-router-dom"
import CertificateTemplate from "../../../../../assets/images/cert-1.png"

const DynamicCertificate = ({ data, passRefUp }) => {
    const certificateRef = useRef(null)

    useEffect(() => {
        passRefUp(certificateRef);
    }, [passRefUp]);
    return (
        <div className="print:w-full print:h-full w-[1000px] h-[700px] shadow relative" ref={certificateRef}>
            <img src={CertificateTemplate} alt="Certificate Template" className="object-contain" />
            <div className="w-full px-[10%] absolute top-[40%] text-center">
                <h1 className="text-3xl font-bold text-center">{data.student.studentName}</h1>
                <p className="mt-6 text-base">has successfully completed the <strong>{data.CertificateName}</strong>. Their remarkable coding skills and perseverance demonstrate their talent in the field. <strong>Congratulations on the impressive accomplishment.</strong></p>
                <h2 className='mt-32'>{data.student.educatorName}</h2>
            </div>
            <span className='absolute bottom-[15.5%] left-[18%]'>{data.id}</span>
        </div>
    )
}

export default DynamicCertificate