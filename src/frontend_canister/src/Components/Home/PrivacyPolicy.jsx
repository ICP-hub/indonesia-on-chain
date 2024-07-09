import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './privacy.css';
import { BiLeftArrowCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import IndonesiaOnChain from '../../../assets/images/IndonesiaOnChain.png';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="bg-gray-100 text-gray-900">
      <div className="container mx-auto p-6 ">
        <div className="bg-white p-8 rounded-lg shadow-md mt-32">
          <div className="flex justify-between h-30">
            {/* <BiLeftArrowCircle onClick={() => navigate(-1)} size={30} className="cursor-pointer" /> */}
          </div>
          <div className="flex justify-center mb-6">
            <img src={IndonesiaOnChain} alt="Indonesia On-Chain Logo" className="w-32" />
          </div>
          <h1 className="text-3xl font-bold mb-6 text-center custom-heading">{t('privacyPolicy.heading')}</h1>
          <p className="text-sm text-gray-600 mb-8 text-center">{t('privacyPolicy.effectiveDate')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('privacyPolicy.introduction')}</h2>
          <p className="mb-6">{t('privacyPolicy.introductionText')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('privacyPolicy.informationWeCollect')}</h2>
          <p className="mb-6">{t('privacyPolicy.informationWeCollectText')}</p>
          <ul className="list-disc list-inside mb-6">
            <li><strong className="custom-link">{t('privacyPolicy.personalInformation')}</strong>{t('privacyPolicy.personalInformation2')}</li>
            <li><strong className="custom-link">{t('privacyPolicy.usageData')}</strong>{t('privacyPolicy.usageData2')}</li>
            <li><strong className="custom-link">{t('privacyPolicy.cookiesAndTracking')}</strong>{t('privacyPolicy.cookiesAndTracking2')}</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('privacyPolicy.howWeUseYourInformation')}</h2>
          <p className="mb-6">{t('privacyPolicy.howWeUseYourInformationText')}</p>
          <ul className="list-disc list-inside mb-6">
            <li>{t('privacyPolicy.provideServices')}</li>
            <li>{t('privacyPolicy.improvePlatform')}</li>
            <li>{t('privacyPolicy.communicate')}</li>
            <li>{t('privacyPolicy.analyzeTrends')}</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('privacyPolicy.sharingYourInformation')}</h2>
          <p className="mb-6">{t('privacyPolicy.sharingYourInformationText')}</p>
          <ul className="list-disc list-inside mb-6">
            <li>{t('privacyPolicy.withConsent')}</li>
            <li>{t('privacyPolicy.legalObligations')}</li>
            <li>{t('privacyPolicy.protectRights')}</li>
            <li>{t('privacyPolicy.serviceProviders')}</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('privacyPolicy.dataSecurity')}</h2>
          <p className="mb-6">{t('privacyPolicy.dataSecurityText')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('privacyPolicy.yourRights')}</h2>
          <p className="mb-6">{t('privacyPolicy.yourRightsText')}</p>
          <ul className="list-disc list-inside mb-6">
            <li>{t('privacyPolicy.accessUpdate')}</li>
            <li>{t('privacyPolicy.requestDeletion')}</li>
            <li>{t('privacyPolicy.optOut')}</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('privacyPolicy.thirdPartyLinks')}</h2>
          <p className="mb-6">{t('privacyPolicy.thirdPartyLinksText')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('privacyPolicy.changesPolicy')}</h2>
          <p className="mb-6">{t('privacyPolicy.changesPolicyText')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('privacyPolicy.contactUs')}</h2>
          <p className="mb-6">{t('privacyPolicy.contactUsText')} <a href="mailto:info@disruptives.io" className="custom-link">{t('privacyPolicy.email')}</a></p>
        </div>
      </div>
    </div>
  );
}
