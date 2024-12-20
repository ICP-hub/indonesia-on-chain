/* eslint-disable react/prop-types */
import React from "react"
import { Link } from "react-router-dom"
import Icon1 from "../../../assets/images/cert.png"
import { LiaDownloadSolid } from "react-icons/lia";
import { useTranslation } from 'react-i18next';
const CertificateBox = ({ data, setOpen }) => {
    const { t } = useTranslation();
    return (
        <div className="flex-1 p-4 shrink-0 grow-0 basis-[100%] sm:basis-[45%] lg:basis-[320px] xl:basis-[31%] bg-[#EFF1FF] rounded-md">
            <div className="w-full">
                <img src={Icon1} alt="Icon" className="w-6 h-6 object-contain rounded-full" />
            </div>
            <div className="w-full border-b border-b-[#C7CDFF] py-2">
                <h1 className="font-medium text-lg">{data?.CertificateName}</h1>
                <p className="text-[#686FB2] text-sm">{t('CertificateBox.Issuedby')}: {data?.IssuedBy}</p>
                <p className="text-[#686FB2] text-sm">{t('CertificateBox.IssueDate')}: {data?.IssueDate}</p>
            </div>
            <div className="w-full flex mt-2 gap-3 justify-end">
                <Link onClick={() => setOpen({
                    open: true,
                    isDownload: true,
                    data: data
                })} className="bg-[#7B61FF] p-2 px-3 text-sm text-white rounded-md flex items-center gap-1 hover:bg-[#745bf3]"><LiaDownloadSolid size={18} />{t('CertificateBox.Download')}</Link>
                <Link onClick={() => setOpen({
                    open: true,
                    isDownload: false,
                    data: data
                })} className="bg-[#7B61FF] p-2 px-3 text-sm text-white rounded-md hover:bg-[#745bf3]">{t('CertificateBox.View')}</Link>
            </div>
        </div>
    )
}

export default CertificateBox