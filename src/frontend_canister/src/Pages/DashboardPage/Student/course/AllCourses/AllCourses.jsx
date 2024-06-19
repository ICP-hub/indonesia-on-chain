import React from 'react'
import { useTranslation } from 'react-i18next';
const AllCourses = () => {
    const { t } = useTranslation('DynamicCertificate');
    return (
        <div>{t('AllCourses')}</div>
    )
}

export default AllCourses