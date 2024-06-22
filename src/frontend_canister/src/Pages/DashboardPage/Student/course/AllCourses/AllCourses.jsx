import React from 'react'
import { useTranslation } from 'react-i18next';
const AllCourses = () => {
    const { t } = useTranslation();
    return (
        <div>{t('DynamicCertificate.AllCourses')}</div>
    )
}

export default AllCourses