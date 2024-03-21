import React, { lazy } from 'react';
const Error404 = lazy(() => import('./Pages/Error404Page/Error404'));
const LandingPage = lazy(() => import('./Pages/LandingPage/LandingPage'));
// import LandingPage from './Pages/LandingPage/LandingPage';
const SignUpRoles = lazy(() => import('./Pages/SignUp/SignUpRoles'));
const SignUpStudent = lazy(() => import('./Pages/SignUp/SignUpStudent'));
const SignUpEducator = lazy(() => import('./Pages/SignUp/SignUpEducator'));
const StudentProfile = lazy(() => import('./Pages/StudentPages/StudentProfile'));
const StudentDashboardPage = lazy(() => import('./Pages/DashboardPage/StudentDashboardPage'));
const EducatorDashboardPage = lazy(() => import('./Pages/DashboardPage/EducatorDashboard'));
const CourseDashboardPage = lazy(() => import('./Pages/CourseDashboard/CoursePage'));
const AllCourses = lazy(() => import('./Pages/CourseDashboard/AllCourses'));





const AppRoutes =[
    {
        path: "/",
        page: <LandingPage/>,
        allowedRoles: ["student", "educator", "No Role"]
    },
    {
        path: "/signup-role",
        page: <SignUpRoles />,
        allowedRoles: ["student", "educator", "No Role"]
    },
    {
        path: "/signup-student",
        page: <SignUpStudent />,
        allowedRoles: ["student", "educator", "No Role"]
    },
    {
        path: "/signup-educator",
        page: <SignUpEducator />,
        allowedRoles: ["student", "educator", "No Role"]
    },
    {
        path: "/student-dashboard",
        page: <StudentDashboardPage />,
        allowedRoles:["student"]
    },
    {
        path: "/student-profile",
        page: < StudentProfile/>,
        allowedRoles: ["student"]
    },
    {
        path: "/educator-dashboard",
        page: <EducatorDashboardPage />,
        allowedRoles: ["educator"]
    },
    {
        path: "/course-page",
        page: <CourseDashboardPage />,
        allowedRoles: ["student", "educator" ]  // can be viewed by anyone but only
    }

    
    
]



// const AppRoutes = [
//     { path: "/*", page: Error404, allowedRoles: studentAndEducatorRole },
//     // { path: "/", page: EducatorDashboardPage, allowedRoles: studentAndEducatorRole },
//     { path: "/*", page: LandingPage, allowedRoles: studentAndEducatorRole },
//     { path: "/signup-role", page: SignUpRoles, allowedRoles: studentAndEducatorRole },
//     { path: "/signup-student", page: SignUpStudent, allowedRoles: studentAndEducatorRole },
//     { path: "/signup-educator", page: SignUpEducator, allowedRoles: studentAndEducatorRole },
//     { path: "/student-dashboard", page: StudentDashboardPage, allowedRoles: studentRole },
//     { path: "/student-profile", page: StudentDashboardPage, allowedRoles: studentRole },
//     { path: "/educator-dashboard", page: EducatorDashboardPage, allowedRoles: educatorRole },
//     { path: "/course-page", page: CourseDashboardPage, allowedRoles: studentAndEducatorRole },
// ]
export default AppRoutes;
