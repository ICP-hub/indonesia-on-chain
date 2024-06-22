import React, { useState, useEffect } from "react";
import NotAvailable from "../../../../Components/notAvailable/NotAvailable";
import Loader from "../../../../Components/Loader/Loader";
import { useAuth } from '../../../../Components/utils/useAuthClient';
import { useTranslation } from 'react-i18next';

const MyCertificates = () => {
    const [images, setImages] = useState([]);
    const { actor, contentActor } = useAuth();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            setLoading(true);
            try {
                const userCertificates = await actor.getUserMintedCertificate();
                const imagesLinks = await Promise.all(userCertificates.map(async (certificateId) => {
                    const certData = await contentActor.getcertificate(certificateId);
                    return certData.Ok[0]?.key_val_data[3]?.val?.TextContent || '';
                }));
                setImages(imagesLinks.filter(link => link)); // Filter out empty links
            } catch (error) {
                console.error("Error occurred while fetching certificates:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCertificates();
    }, [actor, contentActor]);

    const toggleImageSize = (index) => {
        setSelectedImage(index === selectedImage ? null : index);
    };

    //download fun
    const downloadImage = (image) => {
        const link = document.createElement('a');
        link.href = image;
        link.download = `certificate-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full p-3 md:px-14">
            <div className="w-full p-3 bg-white rounded-md md:p-8">
                <div className="w-full text-[#7B61FF] border-b flex gap-4 font-medium">
                    <span className="py-2 border-b border-b-[#7B61FF] cursor-pointer">{t('DynamicCertificate.YourCertificates')}</span>
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {images.length > 0 ? (
                            images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={image}
                                        alt={`Certificate ${index}`}
                                        className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-200"
                                        onClick={() => toggleImageSize(index)}
                                    />
                                    {selectedImage === index && (
                                        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
                                            <div className="relative">
                                            <button
                                                    className="absolute top-0 right-[1rem]  cursor-pointer bg-gray-800 px-3 py-2 rounded-md text-white shadow-xl animate-bounce hover:animate-none hover:bg-red-500"
                                                    onClick={() => toggleImageSize(index)}
                                                >
                                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18" />
                                                        <line x1="6" y1="6" x2="18" y2="18" />
                                                    </svg>
                                                </button>
                                                {/* //Download button */}
                                                <button
                                                    className="absolute top-0 right-[4rem] cursor-pointer bg-gray-800 px-3 py-2 rounded-md text-white shadow-xl animate-bounce hover:animate-none hover:bg-green-500 mr-2"
                                                    onClick={() => downloadImage(image)}
                                                >
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"></path>
                                                    </svg>
                                                </button>
                                               
                                                <img
                                                    src={image}
                                                    alt={`Certificate ${index}`}
                                                    className="max-h-screen"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full">
                                <div className="text-center">
                                    <NotAvailable Type={"Certificates"} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCertificates;
