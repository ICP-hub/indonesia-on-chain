import React from 'react';
import { reactBeginnerSvg, ModernCss, AdvancedReactPattern } from '../../Components/utils/svgData'
import { useTranslation } from 'react-i18next';
const RecommendedCourses = () => {
    const { t } = useTranslation();
    const recommendedCourses = [
        {
            id: 1,
            title: 'React for Beginners',
            professor: 'John Doe',
            img: reactBeginnerSvg,
        },
        {
            id: 2,
            title: 'Advanced React Patterns',
            professor: 'Jane Smith',
            img: ModernCss,
        },
        {
            id: 3,
            title: 'Modern CSS with Tailwind',
            professor: 'Alice Johnson',
            img: AdvancedReactPattern,
        },
    ];

    return (
        <div className="bg-white rounded-xl shadow-md p-4 m-16">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-[700] font-sans">{t('RecommendedCourses.RecommendedCourses')}</h2>
                <button className="bg-white  text-purple-500 font-[700] font-sans py-2 px-4 rounded">
                {t('RecommendedCourses.SeeAll')}
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recommendedCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-lg p-4">


                        <div className="w-full h-40 object-cover mb-4 rounded-lg items-start">
                            <svg width="100%" height="139" viewBox="0 0 284 139" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="284" height="139" rx="15" fill="#FFF1D8" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 grid-rows-2">{course.title}</h3>
                        <p className="text-gray-600">{t('RecommendedCourses.Professor')}: {course.professor}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedCourses;