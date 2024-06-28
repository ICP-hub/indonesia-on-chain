import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import DataTable from 'react-data-table-component';
import { useAuth } from '../../utils/useAuthClient';

const CertifiedStudents = () => {
    const [courseStats, setCourseStats] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const { actor, contentActor } = useAuth();

    // Normalize course data function
    const normalizeCourseData = (course) => {
        try {
            // const keyValData = course.certificates?.[0]?.metadata?.[0]?.key_val_data || [];
            const certificates = course.certificates || [];
            const keyValData = certificates.flatMap(cert => cert.metadata.flatMap(meta => meta.key_val_data));
            const courseIdObj = keyValData.find(kv => kv.key === "courseId");
            const courseTitleObj = keyValData.find(kv => kv.key === "courseTitle");
            const totalStudents = course.total_students ? Number(course.total_students) : 0;
            const totalCertificates = course.total_certificates ? Number(course.total_certificates) : 0;
console.log("courseIdObj",courseIdObj)
console.log("courseTitleObj",courseTitleObj)
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
        { name: 'SNo.', selector: (_, index) => index + 1, sortable: true },
        { name: 'Course Title', selector: row => row.title, sortable: true },
        { name: 'Course ID', selector: row => row.courseId, sortable: true },
        { name: 'Total Students', selector: row => row.total_students, sortable: true },
        { name: 'Total Certificates', selector: row => row.total_certificates, sortable: true },
    ];

    // const expandedRowRender = (row) => (
    //     <DataTable
    //         columns={[
    //             { name: 'Certificate ID', selector: cert => cert.id, sortable: true },
    //             { name: 'Certificate Data', selector: cert => JSON.stringify(cert.key_val_data), sortable: true }
    //         ]}
    //         data={row.certificates}
    //         noHeader
    //     />
    // );

    return (
        <>
            <div className="w-full mt-2 overflow-auto">
                <div className="flex flex-row my-3">
                    <div className="flex flex-1 items-center gap-1">
                        <input
                            type="text"
                            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-400 focus:ring-gray-400 focus:ring-1 sm:text-sm"
                            placeholder="Search"
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                        />
                        <button
                            className="w-full rounded  border focus:outline-none bg-[#907EFF] hover:bg-[#8171e9] text-sm text-white font-medium"
                            type="button"
                            style={{ width: "100px", height: "38px" }}
                            onClick={() => setFilterText('')}
                        >
                            Clear
                        </button>
                    </div>
                    <div className="flex flex-1 justify-end">
                        <CSVLink data={filteredData} filename="course-data.csv">
                            <button className="w-full rounded p-2 border focus:outline-none bg-[#907EFF] hover:bg-[#8171e9] text-sm text-white font-medium">
                                Download CSV
                            </button>
                        </CSVLink>
                    </div>
                </div>
                <DataTable
                    title="List of Minted Certificates"
                    columns={columns}
                    data={filteredData}
                    progressPending={loading}
                    // expandableRows
                    // expandableRowsComponent={expandedRowRender}
                    striped
                    highlightOnHover
                    pagination
                />
            </div>
        </>
    );
}

export default CertifiedStudents;
