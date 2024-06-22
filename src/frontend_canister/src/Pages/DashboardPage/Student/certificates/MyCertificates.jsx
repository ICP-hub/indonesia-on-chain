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
                                            <div className="mx-auto">
                                                <div className="absolute top-0 right-[11.5rem] hover:bg-red-600">
                                                    <button className="text-gray-700 p-2" onClick={() => toggleImageSize(index)}>
                                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <line x1="18" y1="6" x2="6" y2="18" />
                                                            <line x1="6" y1="6" x2="18" y2="18" />
                                                        </svg>
                                                    </button>
                                                    <button className="text-gray-700 p-2" onClick={() => toggleImageSize(index)}>
                                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <line x1="18" y1="6" x2="6" y2="18" />
                                                            <line x1="6" y1="6" x2="18" y2="18" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <img
                                                    src={image}
                                                    alt={`Certificate ${index}`}
                                                    className="object-cover object-center"
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
