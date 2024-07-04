import React, { useEffect } from 'react';
import "./privacy.css"
import { BiLeftArrowCircle } from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import IndonesiaOnChain from "../../../assets/images/IndonesiaOnChain.png";
export default function PrivacyPolicy(){
    const navigate = useNavigate();
    
    useEffect(()=> {
        window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    }, [])
    return(
        <>
        <div className="bg-gray-100 text-gray-900">
            <div className="container mx-auto p-6">
                <div className="bg-white p-8 rounded-lg shadow-md">
                <div className='flex justify-between h-30'>
                    <BiLeftArrowCircle onClick={()=> navigate(-1) } size={30} className="cursor-pointer"/>
                </div>
                    <div className="flex justify-center mb-6">
                        <img src={IndonesiaOnChain} alt="Indonesia On-Chain Logo" className="w-32" />
                    </div>
                    <h1 className="text-3xl font-bold mb-6 text-center custom-heading">Privacy Policy</h1>
                    <p className="text-sm text-gray-600 mb-8 text-center">Effective Date: 2 July 2024</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading">1. Introduction</h2>
                    <p className="mb-6">Welcome to Indonesia On-Chain, we value the privacy of our users and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our platform [Platform URL].</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading">2. Information We Collect</h2>
                    <p className="mb-6">We may collect the following types of information:</p>
                    <ul className="list-disc list-inside mb-6">
                        <li><strong className="custom-link">Personal Information:</strong> Name, email address, phone number, and other contact details.</li>
                        <li><strong className="custom-link">Usage Data:</strong> Information about how you use our platform, including your IP address, browser type, and pages visited.</li>
                        <li><strong className="custom-link">Cookies and Tracking Technologies:</strong> We use cookies to enhance your experience and gather data about site traffic and interactions.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading">3. How We Use Your Information</h2>
                    <p className="mb-6">We use your information to:</p>
                    <ul className="list-disc list-inside mb-6">
                        <li>Provide and maintain our services.</li>
                        <li>Improve, personalize, and expand our platform.</li>
                        <li>Communicate with you, including responding to your inquiries and providing updates.</li>
                        <li>Analyze usage trends and administer our platform.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading">4. Sharing Your Information</h2>
                    <p className="mb-6">We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following cases:</p>
                    <ul className="list-disc list-inside mb-6">
                        <li>With your consent.</li>
                        <li>To comply with legal obligations.</li>
                        <li>To protect and defend our rights and property.</li>
                        <li>With service providers who assist us in operating our platform.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading">5. Data Security</h2>
                    <p className="mb-6">We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading">6. Your Rights</h2>
                    <p className="mb-6">You have the right to:</p>
                    <ul className="list-disc list-inside mb-6">
                        <li>Access and update your personal information.</li>
                        <li>Request the deletion of your data.</li>
                        <li>Opt-out of receiving marketing communications.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading">7. Third-Party Links</h2>
                    <p className="mb-6">Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these sites. We encourage you to review their privacy policies.</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading">8. Changes to This Privacy Policy</h2>
                    <p className="mb-6">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading">9. Contact Us</h2>
                    <p className="mb-6">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@disruptives.io" className="custom-link">info@disruptives.io</a></p>
                </div>
            </div>
        </div>
        </>
    )
}