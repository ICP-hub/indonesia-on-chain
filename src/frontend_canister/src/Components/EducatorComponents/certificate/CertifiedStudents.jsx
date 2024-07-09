import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import DataTable from 'react-data-table-component';
import { useAuth } from '../../utils/useAuthClient';
import { useTranslation } from 'react-i18next';

const CertifiedStudents = () => {
    const { t } = useTranslation();
    const [courseStats, setCourseStats] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const { actor, contentActor } = useAuth();

    // Normalize course data function
    const normalizeCourseData = (course) => {
        try {
            const certificates = course.certificates || [];
            const keyValData = certificates.flatMap(cert => cert.metadata.flatMap(meta => meta.key_val_data));
            const courseIdObj = keyValData.find(kv => kv.key === "courseId");
            const courseTitleObj = keyValData.find(kv => kv.key === "courseTitle");
            const totalStudents = course.total_students ? Number(course.total_students) : 0;
            const totalCertificates = course.total_certificates ? Number(course.total_certificates) : 0;

            return {
                title: courseTitleObj ? courseTitleObj.val.TextContent : "Unknown Title",
                courseId: courseIdObj ? courseIdObj.val.TextContent : "Unknown ID",
                total_students: totalStudents,
                total_certificates: totalCertificates,
                certificates: course.certificates.map(cert => ({
                    id: cert.id,
                    key_val_data: cert.metadata.key_val_data
                }))
            };
        } catch (error) {
            console.error("Error normalizing course data:", error);
            return null;
        }
    };

    // Fetch courses from the API
    const fetchCourses = async () => {
        setLoading(true);
        try {
            const allCourseIdsResponse = await contentActor.getallCourse();
            const allCourseIds = allCourseIdsResponse.leaf.keyvals.map(item => ({ courseId: item[0][1] }));

            const coursesData = await Promise.all(
                allCourseIds.map(async ({ courseId }) => {
                    try {
                        const courseResponse = await contentActor.get_stats_educator(courseId.courseId);
                        console.log(`data fetching stats for course ID ${courseId.courseId}:`, courseResponse);
                        return normalizeCourseData(courseResponse);
                    } catch (error) {
                        console.error(`Error fetching stats for course ID ${courseId.courseId}:`, error);
                        return null;
                    }
                })
            );

            const filteredCoursesData = coursesData.filter(course => course !== null);
            setCourseStats(filteredCoursesData);
        } catch (error) {
            console.error("Error occurred while fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [actor, contentActor]);

    const filteredData = courseStats.filter(course => {
        const searchText = filterText.toLowerCase();
        return (
            course.title?.toLowerCase().includes(searchText) ||
            course.courseId?.toString().toLowerCase().includes(searchText) ||
            course.total_students?.toString().toLowerCase().includes(searchText) ||
            course.total_certificates?.toString().toLowerCase().includes(searchText)
        );
    });

    const columns = [
        { name: t('listofMintedCertificate.sno'), selector: (_, index) => index + 1, sortable: true },
        { name: t('listofMintedCertificate.course_title'), selector: row => row.title, sortable: true },
        { name: t('listofMintedCertificate.course_id'), selector: row => row.courseId, sortable: true },
        { name: t('listofMintedCertificate.total_students'), selector: row => row.total_students, sortable: true },
        { name: t('listofMintedCertificate.total_certificates'), selector: row => row.total_certificates, sortable: true },
    ];

    return (
        <div className="w-full mt-2 overflow-auto">
            <div className="flex flex-row my-3">
                <div className="flex flex-1 items-center gap-1">
                    <input
                        type="text"
                        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-400 focus:ring-gray-400 focus:ring-1 sm:text-sm"
                        placeholder={t('listofMintedCertificate.search_placeholder')}
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                    />
                    <button
                        className="w-full rounded border focus:outline-none bg-[#907EFF] hover:bg-[#8171e9] text-sm text-white font-medium"
                        type="button"
                        style={{ width: "100px", height: "38px" }}
                        onClick={() => setFilterText('')}
                    >
                        {t('listofMintedCertificate.clear_button')}
                    </button>
                </div>
                <div className="flex flex-1 justify-end">
                    <CSVLink data={filteredData} filename="course-data.csv">
                        <button className="w-full rounded p-2 border focus:outline-none bg-[#907EFF] hover:bg-[#8171e9] text-sm text-white font-medium">
                            {t('listofMintedCertificate.download_csv_button')}
                        </button>
                    </CSVLink>
                </div>
            </div>
            <DataTable
                title={t('listofMintedCertificate.list_of_certificates')}
                columns={columns}
                data={filteredData}
                progressPending={loading}
                striped
                highlightOnHover
                pagination
            />
        </div>
    );
}

export default CertifiedStudents;
