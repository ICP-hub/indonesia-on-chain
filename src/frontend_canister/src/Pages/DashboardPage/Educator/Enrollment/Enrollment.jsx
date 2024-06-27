import EnrollData from "../../../../../assets/enroll-data.json";
import EnrolledStudent from "../../../../Components/EducatorComponents/enrollments/EnrolledStudent";
import CompletedStudent from "../../../../Components/EducatorComponents/enrollments/CompletedStudent";
import { Tab, Tabs } from "@mui/material";
import { useAuth } from "../../../../Components/utils/useAuthClient";
import  { useState, useEffect } from 'react';
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
    const [activeTab, setActiveTab] = React.useState(0);

    const renderStudents = () => {
        switch (activeTab) {
            case 0:
                return <EnrolledStudent data={EnrollData.students_enrolled} />
            case 1:
                return <CompletedStudent data={EnrollData.students_completed} />
            default:
                return <EnrolledStudent data={EnrollData.students_enrolled} />
        }
    }

    const handleTabs = (e, index) => {
        setActiveTab(index);
    }


    //fetch list of enrolled student
    const [courseStats, setCourseStats] = useState([]);
    const { actor, contentActor } = useAuth();
    const fetchCourses = async () => {
        try {
            const allCourseIdsResponse = await contentActor.getallCourse(); 
            console.log("Fetch all course IDs response: list of enrolled student", allCourseIdsResponse);

            const allCourseIds = allCourseIdsResponse.leaf.keyvals
                .filter(item => item[0] && item[0][1])
                .map((keyval) => keyval[0][1]);

            console.log("Extracted course IDs: list of enrolled student", allCourseIds);

            if (Array.isArray(allCourseIds)) {
                const coursesData = await Promise.all(
                    allCourseIds.map(async (value) => {
                        try {
                            const courseStats = await contentActor.get_stats_educator(value.courseId);
                            console.log(`Course ID: ${value.courseId}, Stats: `, courseStats);
                            return {
                                ...courseStats,
                                id: value.courseId
                            };
                        } catch (error) {
                            console.error(`Error fetching stats for course ID: list of enrolled student `, error);
                            return null;
                        }
                    })
                );

                const filteredCoursesData = coursesData.filter(course => course !== null);

                console.log("Mapped courses data: list of enrolled student", filteredCoursesData);
                setCourseStats(filteredCoursesData);       
            } else {
                console.error("Expected an array of course IDs, but got: list of enrolled student:", allCourseIds);
            }
        } catch (error) {
            console.error("Error occurred while fetching courses: list of enrolled student:", error);
        }
    };

   useEffect(() => {
        fetchCourses();
    }, [actor, contentActor]);

    return (
        <div className="w-full p-3 md:px-14">
            <div className="w-full p-3 bg-white rounded-md md:p-8">
                <div className="flex w-full gap-4 overflow-auto font-medium border-b">
                    {
                        // TabContent.map((item, index) => <span key={index} className={`py-2 text-sm md:text-base border-b ${activeTab === index ? "border-b-[#7B61FF] text-[#7B61FF]" : "border-transparent text-[#373638]"}  cursor-pointer`} onClick={() => setActiveTab(index)}>{item.title}</span>)
                        <Tabs value={activeTab} onChange={handleTabs} sx={{
                            fontSize: '16px',
                            textTransform: "capitalize",
                            "& .MuiTabs-indicator": {
                                backgroundColor: "#7B61FF"
                            }
                        }}>
                            {
                                TabContent.map((item, index) =>
                                    <Tab key={index} label={item.title}
                                        sx={{
                                            textTransform: "capitalize",
                                            color: "#6E7277",
                                            "&.Mui-selected": {
                                                color: "#7B61FF"
                                            }
                                        }} />)
                            }
                        </Tabs>
                    }
                </div>
                <div className="flex flex-row flex-wrap w-full gap-8 mt-4">
                    {
                        renderStudents()
                    }
                </div>
            </div>
        </div>
    )
}

export default Enrollment;
