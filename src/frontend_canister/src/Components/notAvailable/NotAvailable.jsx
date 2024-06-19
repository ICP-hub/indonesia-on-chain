import React from 'react'
import { MdWarning } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
const NotAvailable = ({ Type }) => {
    const { t } = useTranslation();
    return (
        <div className='w-full text-xl text-center'>
            {

                <div className='flex flex-col items-center justify-center h-full font-poppins'>
                    <div className='w-75 h-75'>
                        <img src="https://storage.googleapis.com/ioc-data/nodatafound2.svg" className='w-full h-full drop-shadow-lg' />
                    </div>

                    {
                        Type === "Process" ? (
                            <div className='text-2xl font-bold text-gray-600 font-poppins'>
                                <p> { t('NotAvailable.showhere')}</p>
                            </div>
                        ) : Type === "Complete" ? (
                            <div className='text-2xl font-bold text-gray-600 font-poppins'>
                                {console.log('take tests section')}
                                <p> { t('NotAvailable.appearhere')}</p>
                            </div>
                        ) : Type === "Certificates" ? (
                            <div className='text-2xl font-bold text-gray-600 font-poppins'>
                                <p>{ t('NotAvailable.Certificateshere')}</p>
                            </div>
                        ) : Type === "Notfound" ? (
                            <div className='text-2xl font-bold text-gray-600 font-poppins'>
                                <p>{ t('NotAvailable.nofound')}</p>
                            </div>
                        ): (
                            <div className='text-2xl font-bold text-gray-600 font-poppins'>
                                <p>{ t('NotAvailable.Courseshere')}</p>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}

export default NotAvailable
