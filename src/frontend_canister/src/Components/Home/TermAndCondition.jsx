import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import IndonesiaOnChain from '../../../assets/images/IndonesiaOnChain.png';
import { BiLeftArrowCircle } from 'react-icons/bi';

const TermsOfUse = () => {
  const { t } = useTranslation(); // Access translation function
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="bg-gray-100 text-gray-900">
      <div className="container mx-auto p-6">
        <div className="bg-white p-8 rounded-lg shadow-md mt-32">
          <div className="flex justify-between h-30">
            {/* <BiLeftArrowCircle onClick={() => navigate(-1)} size={30} className="cursor-pointer" /> */}
          </div>
          <img src={IndonesiaOnChain} alt="Indonesia On-Chain Logo" className="w-32 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-6 text-center custom-heading">{t('termsOfUse.heading')}</h1>
          <p className="text-sm text-gray-600 mb-8 text-center">{t('termsOfUse.effectiveDate')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('termsOfUse.introduction')}</h2>
          <p className="mb-6">{t('termsOfUse.introductionText')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('termsOfUse.userAccounts')}</h2>
          <h3 className="text-xl font-semibold mb-2">{t('termsOfUse.accountCreation')}</h3>
          <p className="mb-6">{t('termsOfUse.accountCreationText')}</p>
          <h3 className="text-xl font-semibold mb-2">{t('termsOfUse.accountResponsibility')}</h3>
          <p className="mb-6">{t('termsOfUse.accountResponsibilityText')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('termsOfUse.intellectualProperty')}</h2>
          <h3 className="text-xl font-semibold mb-2">{t('termsOfUse.ourContent')}</h3>
          <p className="mb-6">{t('termsOfUse.ourContentText')}</p>
          <h3 className="text-xl font-semibold mb-2">{t('termsOfUse.trademarks')}</h3>
          <p className="mb-6">{t('termsOfUse.trademarksText')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('termsOfUse.privacy')}</h2>
          <h3 className="text-xl font-semibold mb-2">{t('termsOfUse.privacyPolicy')}</h3>
          <p className="mb-6">{t('termsOfUse.privacyPolicyText')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('termsOfUse.limitationOfLiability')}</h2>
          <h3 className="text-xl font-semibold mb-2">{t('termsOfUse.disclaimer')}</h3>
          <p className="mb-6">{t('termsOfUse.disclaimerText')}</p>
          <h3 className="text-xl font-semibold mb-2">{t('termsOfUse.limitation')}</h3>
          <p className="mb-6">{t('termsOfUse.limitationText')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('termsOfUse.indemnification')}</h2>
          <p className="mb-6">{t('termsOfUse.indemnificationText')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('termsOfUse.termination')}</h2>
          <h3 className="text-xl font-semibold mb-2">{t('termsOfUse.suspensionTermination')}</h3>
          <p className="mb-6">{t('termsOfUse.suspensionTerminationText')}</p>
          <h3 className="text-xl font-semibold mb-2">{t('termsOfUse.effectOfTermination')}</h3>
          <p className="mb-6">{t('termsOfUse.effectOfTerminationText')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('termsOfUse.changesToTerms')}</h2>
          <h3 className="text-xl font-semibold mb-2">{t('termsOfUse.modification')}</h3>
          <p className="mb-6">{t('termsOfUse.modificationText')}</p>
          <h3 className="text-xl font-semibold mb-2">{t('termsOfUse.acceptanceOfChanges')}</h3>
          <p className="mb-6">{t('termsOfUse.acceptanceOfChangesText')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('termsOfUse.disputeResolution')}</h2>
          <h3 className="text-xl font-semibold mb-2">{t('termsOfUse.informalResolution')}</h3>
          <p className="mb-6">{t('termsOfUse.informalResolutionText')}</p>
          <h3 className="text-xl font-semibold mb-2">{t('termsOfUse.arbitration')}</h3>
          <p className="mb-6">{t('termsOfUse.arbitrationText')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('termsOfUse.entireAgreement')}</h2>
          <p className="mb-6">{t('termsOfUse.entireAgreementText')}</p>

          <h2 className="text-2xl font-semibold mb-4 custom-heading">{t('termsOfUse.contactUs')}</h2>
          <p className="mb-6">
            {t('termsOfUse.contactUsText')}{' '}
            <a href="mailto:info@disruptives.io" className="custom-link">
              {t('termsOfUse.email')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
