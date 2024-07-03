import React from 'react';
import "./privacy.css"
import IndonesiaOnChain from "../../../assets/images/IndonesiaOnChain.png";
const TermsOfUse = () => {
    return (
        <div className="bg-gray-100 text-gray-900">
            <div className="container mx-auto p-6">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <img src={IndonesiaOnChain} alt="Indonesia On-Chain Logo" className="w-32 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold mb-6 text-center custom-heading" >Terms of Use</h1>
                    <p className="text-sm text-gray-600 mb-8 text-center">Effective Date: 2 July 2024</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading" >1. Introduction</h2>
                    <p className="mb-6">Welcome to Indonesia On-Chain, these Terms of Service govern your use of our website and services. By accessing or using our services, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use our services.</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading" >2. User Accounts</h2>
                    <h3 className="text-xl font-semibold mb-2">2.1 Account Creation</h3>
                    <p className="mb-6">To access certain features of our platform, you must create an account by providing accurate and complete information during the registration process.</p>
                    <h3 className="text-xl font-semibold mb-2">2.2 Account Responsibility</h3>
                    <p className="mb-6">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account or any other security breach.</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading" >3. Intellectual Property</h2>
                    <h3 className="text-xl font-semibold mb-2">3.1 Our Content</h3>
                    <p className="mb-6">All content provided by us, including text, videos, graphics, logos, images, and software, is protected by intellectual property laws. You may not use, reproduce, or distribute our content without our prior written permission.</p>
                    <h3 className="text-xl font-semibold mb-2">3.2 Trademarks</h3>
                    <p className="mb-6">Indonesia On-Chain and our logos are trademarks of ICP Hub Indonesia - Disruptives. You may not use these trademarks without our prior written consent.</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading" >4. Privacy</h2>
                    <h3 className="text-xl font-semibold mb-2">4.1 Privacy Policy</h3>
                    <p className="mb-6">We are committed to protecting your privacy. Please review our Privacy Policy, which explains how we collect, use, and disclose your information.</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading" >5. Limitation of Liability</h2>
                    <h3 className="text-xl font-semibold mb-2">5.1 Disclaimer</h3>
                    <p className="mb-6">Our services are provided "as is" without warranties of any kind, whether express or implied. We do not guarantee the accuracy, completeness, or reliability of our services.</p>
                    <h3 className="text-xl font-semibold mb-2">5.2 Limitation</h3>
                    <p className="mb-6">To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services, even if we have been advised of the possibility of such damages.</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading" >6. Indemnification</h2>
                    <p className="mb-6">You agree to indemnify, defend, and hold harmless Indonesia On-Chain, its affiliates, and their respective officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses, including legal fees, arising out of or in connection with your use of our services or your violation of these Terms.</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading" >7. Termination</h2>
                    <h3 className="text-xl font-semibold mb-2">7.1 Suspension/Termination</h3>
                    <p className="mb-6">We may suspend or terminate your account and access to our services at our discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.</p>
                    <h3 className="text-xl font-semibold mb-2">7.2 Effect of Termination</h3>
                    <p className="mb-6">Upon termination, your right to use our services will immediately cease. All provisions of these Terms that should survive termination shall remain in effect, including intellectual property rights, indemnity, and limitation of liability.</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading" >8. Changes to Terms</h2>
                    <h3 className="text-xl font-semibold mb-2">8.1 Modification</h3>
                    <p className="mb-6">We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on our website. It is your responsibility to review these Terms periodically for any updates or changes.</p>
                    <h3 className="text-xl font-semibold mb-2">8.2 Acceptance of Changes</h3>
                    <p className="mb-6">Your continued use of our services after changes have been made constitutes acceptance of the revised Terms.</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading" >9. Dispute Resolution</h2>
                    <h3 className="text-xl font-semibold mb-2">9.1 Informal Resolution</h3>
                    <p className="mb-6">If you have any disputes or concerns, please contact us first to seek an informal resolution.</p>
                    <h3 className="text-xl font-semibold mb-2">9.2 Arbitration</h3>
                    <p className="mb-6">For any disputes that cannot be resolved informally, you agree to resolve any claims through final and binding arbitration, except that you may assert claims in small claims court if your claims qualify.</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading" >10. Entire Agreement</h2>
                    <p className="mb-6">These Terms, along with our Privacy Policy and any other legal notices published by us, constitute the entire agreement between you and Indonesia On-Chain regarding your use of our services.</p>

                    <h2 className="text-2xl font-semibold mb-4 custom-heading" >11. Contact Us</h2>
                    <p className="mb-6">If you have any questions or concerns about these Terms, please contact us at <a href="mailto:info@disruptives.io" className='custom-link' >info@disruptives.io</a></p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUse;
