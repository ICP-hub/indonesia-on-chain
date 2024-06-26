import React, { useState, useEffect } from "react";
import NotAvailable from "../../../../Components/notAvailable/NotAvailable";
import Loader from "../../../../Components/Loader/Loader";
import { useAuth } from "../../../../Components/utils/useAuthClient";
import { useTranslation } from "react-i18next";
import { FaLinkedinIn, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyCertificates = () => {
  const [images, setImages] = useState([]);
  const { actor, contentActor } = useAuth();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  // get certitificate fun 
  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const userCertificates = await actor.getUserMintedCertificate();
        const imagesLinks = await Promise.all(
          userCertificates.map(async (certificateId) => {
            const certData = await contentActor.getcertificate(certificateId);
            return {
              imageUrl: certData.Ok[0]?.key_val_data[3]?.val?.TextContent || "",
              id: certificateId  
            };
          })
        );
        setImages(imagesLinks.filter((link) => link.imageUrl)); // Filter out empty links
      } catch (error) {
        console.error("Error occurred while fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, [actor, contentActor]);

  // toggle image size 
  const toggleImageSize = (index) => {
    setSelectedImage(index === selectedImage ? null : index);
  };


  // download certificate fun 
  const downloadImage = (image) => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `certificate-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  //share on linkdin fun
  const shareOnLinkedIn = () => {
        const imageUrl = "https://storage.googleapis.com/owr_data/2-jpg.jpg";
        const certificateUrl = "https://storage.googleapis.com/owr_data/2-jpg.jpg";
        const title = "Check out my certificate!";
        const summary = "I have achieved a new certification!";
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          certificateUrl
        )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
          summary
        )}&source=${encodeURIComponent(imageUrl)}`;
        window.open(shareUrl, "_blank");
      };
  return (
    <div className="w-full p-3 md:px-14">
      <div className="w-full p-3 bg-white rounded-md md:p-8">
        <div className="w-full text-[#7B61FF] border-b flex gap-4 font-medium">
          <span className="py-2 border-b border-b-[#7B61FF] cursor-pointer">
            {t("DynamicCertificate.YourCertificates")}
          </span>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {images.length > 0 ? (
              images.map((item, index) => (
                <div key={index} className="relative">
                  <img
                    src={item.imageUrl}
                    alt={`Certificate ${index}`}
                    className="object-contain w-full h-full transition-transform duration-200 cursor-pointer hover:scale-105"
                    onClick={() => toggleImageSize(index)}
                  />
                  {selectedImage === index && (
                    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
                      <div className="relative">
                        {/* image toggleImageSize button  */}
                        <button
                          className="absolute top-0 right-[0rem] cursor-pointer bg-red-500 px-2 py-2 text-white shadow-xl hover:animate-none hover:bg-red-700 rounded-full"
                          style={{ right: "-1rem", top: "-1rem" }}
                          onClick={() => toggleImageSize(index)}
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                        {/* download button  */}
                        <button
                          className="absolute top-0 right-[2rem] cursor-pointer bg-gray-800 px-3 py-2 rounded-md text-white shadow-xl animate-bounce hover:animate-none hover:bg-green-500 mr-2"
                          onClick={() => downloadImage(item.imageUrl)}
                        >
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"></path>
                          </svg>
                        </button>
                        {/* nevigate button  */}
                        <button
                          className="absolute top-0 right-[6rem] cursor-pointer bg-yellow-500 px-3 py-2 rounded-md text-white shadow-xl animate-bounce hover:animate-none hover:bg-yellow-700 mr-2"
                          onClick={() => navigate(`/certificate-showcase/${item.id}`)}
                          title="View Certificate"
                        >
                          <FaEye className="w-5 h-5" />
                        </button>
                        {/* <button
                            class="linkedin-button absolute top-0 right-[10rem] cursor-pointer bg-blue-500 px-3 py-2 rounded-md text-white shadow-xl animate-bounce hover:animate-none hover:bg-blue-700 mr-2"
                            onClick={shareOnLinkedIn}
                            title="Share Over Linkedin"
                          >
                            <FaLinkedinIn className="w-5 h-5" />
                          </button> */}
                        <img
                          src={item.imageUrl}
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
