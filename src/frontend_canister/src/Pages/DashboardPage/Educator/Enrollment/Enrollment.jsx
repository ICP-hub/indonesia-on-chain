// Enrollment.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CSVLink } from 'react-csv';
import DataTable from 'react-data-table-component';
import EnrollData from "../../../../../assets/enroll-data.json";
import EnrolledStudent from "../../../../Components/EducatorComponents/enrollments/EnrolledStudent";
import CompletedStudent from "../../../../Components/EducatorComponents/enrollments/CompletedStudent";
import { Tab, Tabs } from "@mui/material";
import { useAuth } from "../../../../Components/utils/useAuthClient";

const TabContent = [
    {
        id: 0,
        title: "students_enrolled"
    }, {
        id: 1,
        title: "students_completed"
    }
];

const Enrollment = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(0);
    const [filterText, setFilterText] = useState('');
    const [users, setUsers] = useState([]);
    const { actor } = useAuth();

    const renderStudents = () => {
        switch (activeTab) {
            case 0:
                return <EnrolledStudent data={EnrollData.students_enrolled} />;
            case 1:
                return <CompletedStudent data={EnrollData.students_completed} />;
            default:
                return <EnrolledStudent data={EnrollData.students_enrolled} />;
        }
    };

    const handleTabs = (e, index) => {
        setActiveTab(index);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await actor.get_all_users();
                console.log("Fetched all users:", users);
                setUsers(users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [actor]);

    const filteredUsers = users.filter(user => {
        const searchText = filterText.toLowerCase();
        return (
            user.name?.toLowerCase().includes(searchText) ||
            user.email?.toLowerCase().includes(searchText) ||
            user.role?.toLowerCase().includes(searchText)
        );
    });

    const cleanedUsers = filteredUsers.map(user => {
        const { nationalIdProof, profileImage, ...cleanedUser } = user;
        return cleanedUser;
    });

    const columns = [
        {
            name: t('enrollstudentList.name'),
            selector: row => row.name,
            sortable: true,
        },
        {
            name: t('enrollstudentList.email'),
            selector: row => row.email,
            sortable: true,
        },
        {
            name: t('enrollstudentList.phone'),
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: t('enrollstudentList.national_id'),
            selector: row => row.nationalId,
            sortable: true,
        },
        {
            name: t('enrollstudentList.completed_course'),
            selector: row => row.completedCourse,
            sortable: true,
        },
        {
            name: t('enrollstudentList.role'),
            selector: row => row.role,
            sortable: true,
        },
        {
            name: t('enrollstudentList.ongoing_courses'),
            selector: row => row.ongoingCourse,
            sortable: true,
        },
    ];

    return (
        <div className="w-full p-3 md:px-14">
            <div className="w-full p-3 bg-white rounded-md md:p-8">
                <div className="flex flex-row my-3">
                    <div className="flex items-center flex-1 gap-1">
                        <input
                            type="text"
                            className="block w-full py-2 pr-3 bg-white border rounded-md shadow-sm placeholder:italic placeholder:text-slate-400 border-slate-300 pl-9 focus:outline-none focus:border-gray-400 focus:ring-gray-400 focus:ring-1 sm:text-sm"
                            placeholder={t('enrollstudentList.search_placeholder')}
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                        />
                        <button
                            className="w-full rounded border focus:outline-none bg-[#907EFF] hover:bg-[#8171e9] text-sm text-white font-medium"
                            type="button"
                            style={{ width: "100px", height: "38px" }}
                            onClick={() => setFilterText('')}
                        >
                            {t('enrollstudentList.clear_button')}
                        </button>
                    </div>
                    <div className="flex justify-end flex-1">
                        <CSVLink data={cleanedUsers} filename="users-data.csv">
                            <button className="w-full rounded p-2 border focus:outline-none bg-[#907EFF] hover:bg-[#8171e9] text-sm text-white font-medium">
                                {t('enrollstudentList.download_csv_button')}
                            </button>
                        </CSVLink>
                    </div>
                </div>
                <DataTable
                    title={t('enrollstudentList.list_of_students')}
                    columns={columns}
                    data={filteredUsers}
                    progressPending={!users.length}
                    striped
                    highlightOnHover
                    pagination
                />
            </div>
        </div>
    );
};

export default Enrollment;
