// CertificateModal.js
import React, { useEffect, useRef } from 'react'
import Modal from "@mui/material/Modal"
import DynamicCertificate from './DynamicCertificate'
import html2pdf from 'html2pdf.js';

const CertificateModal = ({ open, setOpen }) => {
    const certificateNewRef = useRef(null);


    const handleModalOpen = () => {
        setOpen({
            open: false,
            isDownload: false,
            data: null
        })
    }

    const getRefFromChild = (ref) => {
        certificateNewRef.current = ref.current;
        console.log("getRefFromChild");
        console.log(certificateNewRef);
    }

    const downloadCertificate = () => {
        try {
            if (certificateNewRef.current) {
                const element = certificateNewRef.current;

                // console.log("downloadCertificate" + element);

                console.log("downloadCertificate");
                console.log(element);

                html2pdf().set({
                    filename: 'certificate.pdf',
                    jsPDF: { format: `a4`, orientation: 'landscape' },
                    html2canvas: {
                        scale: 1
                    },
                }).from(element).save();
            } else {
                console.error("Certificate element ref is null.");
            }
        } catch (error) {
            console.log(error);
            alert("Failed to download certificate. Please try again later.");
        }
    }

    useEffect(() => {
        certificateNewRef.current && certificateNewRef.current.addEventListener("load", () => {
            alert("Certificate downloaded successfully.");
        })
        if (open.isDownload === true) {
            console.log("inside effect");
            console.log(certificateNewRef);
            downloadCertificate();
        }
    }, [open.isDownload]);

    return (
        <Modal open={open.open} onClose={handleModalOpen}>
            <div className="w-[80vw] h-[70vh] xl:w-fit xl:h-fit overflow-auto p-3 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-md">
                <DynamicCertificate passRefUp={getRefFromChild} data={open.data} />
            </div>
        </Modal>
    )
}

export default CertificateModal;
