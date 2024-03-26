import React, { useState } from "react";
import CertificateBox from "../../../../Components/StudentComponents/CertificateBox";
import CertData from "../../../../../assets/cert-data.json";
import CertificateModal from "./CertificateModal";

const MyCertificates = () => {
    const [open, setOpen] = useState({
        open: false,
        isDownload: false,
        data: null
    });

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <div className="w-full p-3 md:px-14">
            <div className="w-full p-3 bg-white rounded-md md:p-8">
                <div className="w-full text-[#7B61FF] border-b flex gap-4 font-medium">
                    <span className="py-2 border-b border-b-[#7B61FF] cursor-pointer">Your Certificates</span>
                </div>
                <div className="flex flex-row flex-wrap w-full gap-8 mt-4">
                    {CertData.map((item, index) => <CertificateBox key={index} data={item} setOpen={setOpen} />)}
                </div>
            </div>
            <CertificateModal open={open} setOpen={setOpen} />
        </div>
    )
}

export default MyCertificates;
