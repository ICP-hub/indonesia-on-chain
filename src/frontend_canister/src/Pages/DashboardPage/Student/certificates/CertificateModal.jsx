import React, { useEffect, useRef } from 'react';
import Modal from "@mui/material/Modal";
import DynamicCertificate from './DynamicCertificate';
import html2pdf from 'html2pdf.js';

const CertificateModal = ({ open, setOpen, courseId, courseDetails }) => {
    const certificateNewRef = useRef(null);

    // Function to handle modal close
    const handleModalOpen = () => {
        setOpen({
            open: false,
            isDownload: false,
            data: null
        });
    };

    // Function to get reference from DynamicCertificate child component
    const getRefFromChild = (ref) => {
        certificateNewRef.current = ref;
    };

    // Function to download certificate as PDF
    const downloadCertificate = () => {
        try {
            if (certificateNewRef.current) {
                const element = certificateNewRef.current;

                html2pdf().set({
                    filename: 'certificate.pdf',
                    jsPDF: { format: 'a4', orientation: 'landscape' },
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
    };

    // Effect to monitor changes in isDownload and trigger download
    useEffect(() => {
        if (open.isDownload) {
            downloadCertificate();
        }
    }, [open.isDownload]);

    return (
        <Modal open={open.open} onClose={handleModalOpen}>
            <div className="w-[80vw] h-[70vh] xl:w-fit xl:h-fit overflow-auto p-3 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-md">
                <DynamicCertificate passRefUp={getRefFromChild} data={open.data} courseDetails={courseDetails} courseId={courseId} setOpen={setOpen} />
            </div>
        </Modal>
    );
};

export default CertificateModal;
