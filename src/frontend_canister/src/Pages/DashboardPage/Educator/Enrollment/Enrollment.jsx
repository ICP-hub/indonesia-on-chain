import EnrollData from "../../../../../assets/enroll-data.json";
import EnrolledStudent from "../../../../Components/EducatorComponents/enrollments/EnrolledStudent";
import CompletedStudent from "../../../../Components/EducatorComponents/enrollments/CompletedStudent";
import { Tab, Tabs } from "@mui/material";
import { useAuth } from "../../../../Components/utils/useAuthClient";
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';

const TabContent = [
    {
        id: 0,
        title: "Enrolled Students"
    }, {
        id: 1,
        title: "Completed by Students"
    }
]

const Enrollment = () => {
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
    }

    const handleTabs = (e, index) => {
        setActiveTab(index);
    }

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

    // Remove unwanted fields from the data
    const cleanedUsers = filteredUsers.map(user => {
        const { nationalIdProof, profileImage, ...cleanedUser } = user;
        return cleanedUser;
    });

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'NationalId',
            selector: row => row.nationalId,
            sortable: true,
        },
        {
            name: 'Completed Course',
            selector: row => row.completedCourse,
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
        },
        {
            name: 'Ongoing Courses',
            selector: row => row.ongoingCourse,
            sortable: true,
        },
      
        // Add more columns as needed
    ];

    return (
        <div className="w-full p-3 md:px-14">
            <div className="w-full p-3 bg-white rounded-md md:p-8">
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
                            className="w-full rounded border focus:outline-none bg-[#907EFF] hover:bg-[#8171e9] text-sm text-white font-medium"
                            type="button"
                            style={{ width: "100px", height: "38px" }}
                            onClick={() => setFilterText('')}
                        >
                            Clear
                        </button>
                    </div>
                    <div className="flex flex-1 justify-end">
                        <CSVLink data={cleanedUsers} filename="users-data.csv">
                            <button className="w-full rounded p-2 border focus:outline-none bg-[#907EFF] hover:bg-[#8171e9] text-sm text-white font-medium">
                                Download CSV
                            </button>
                        </CSVLink>
                    </div>
                </div>
                <DataTable
                    title="List of Students"
                    columns={columns}
                    data={filteredUsers}
                    progressPending={!users.length}
                    striped
                    highlightOnHover
                    pagination
                />
               
            </div>
        </div>
    )
}

export default Enrollment;
