import React, { useState, useEffect } from "react";
import CertificateBox from "../../../../Components/StudentComponents/CertificateBox";
import CertData from "../../../../../assets/cert-data.json";
import CertificateModal from "./CertificateModal";
import { useAuth } from '../../../../Components/utils/useAuthClient';
import NotAvailable from "../../../../Components/notAvailable/NotAvailable";
import Loader from "../../../../Components/Loader/Loader";
const MyCertificates = () => {
    const [images, setImages] = useState([]);
    const { actor, contentActor } = useAuth();
    const [Loading, setLoading] = useState(false);
    const [open, setOpen] = useState({
        open: false,
        isDownload: false,
        data: null
    });
    const [isClicked, setIsClicked] = useState(false);


    useEffect(() => {
        const GetCertficatesData = async () => {
            try {
                setLoading(true);
                let imagesLinks = [];
                const data = await actor.getUserMintedCertificate();
                let size = data.length;
                for (let i = 0; i < size; i++) {
                    const certData = await contentActor.getcertificate(data[i]);
                    console.log("certificate data", certData);
                    imagesLinks.push(certData.Ok[0].key_val_data[3].val.TextContent);
                }

                setImages(imagesLinks);
                setLoading(false);
            } catch (error) {
                console.log("error occured while fetching certificates", error);
            } finally {
                setLoading(false);
            }
        }
        GetCertficatesData();
    }, [])
    const toggleSize = () => {
        setIsClicked(!isClicked);
    };

    return (

        <div className="w-full p-3  md:px-14">
            <div className="w-full p-3 bg-white rounded-md md:p-8">
                <div className="w-full text-[#7B61FF] border-b flex gap-4 font-medium">
                    <span className="py-2 border-b border-b-[#7B61FF] cursor-pointer">Your Certificates</span>
                </div>
                {Loading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {images.length > 0 ? (
                            images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        index={index}
                                        src={image}
                                        alt='Certificate'   
                                        style={{
                                            height: '100%',
                                            width: '100%', 
                                            cursor: 'pointer' 
                                        }}
                                        className="hover:scale-105 transition-transform duration-200"
                                        onClick={toggleSize}
                                    />
                                    {isClicked && (
                                        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
                                            <img
                                                src={image}
                                                alt='Certificate'
                                                style={{
                                                    maxHeight: '90%',
                                                    maxWidth: '90%',
                                                }}
                                                onClick={toggleSize}
                                            />
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

    )
}

export default MyCertificates;
