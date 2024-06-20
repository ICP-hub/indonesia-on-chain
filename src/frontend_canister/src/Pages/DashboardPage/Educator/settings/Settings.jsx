import React from 'react'
import { useTranslation } from 'react-i18next';
const Settings = () => {
    const { t } = useTranslation('EditProfile');
    return (
        <div>{t('Settings')}</div>
    )
}

export default Settings