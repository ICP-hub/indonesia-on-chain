import React, { lazy } from 'react';
const Error404 = lazy(() => import('./Pages/Error404Page/Error404'));
const LandingPage = lazy(() => import('./Pages/LandingPage/LandingPage'));
// import LandingPage from './Pages/LandingPage/LandingPage';
const SignUpRoles = lazy(() => import('./Pages/SignUp/SignUpRoles'));
const SignUpStudent = lazy(() => import('./Pages/SignUp/SignUpStudent'));
const SignUpEducator = lazy(() => import('./Pages/SignUp/SignUpEducator'));
const StudentProfile = lazy(() => import('./Pages/DashboardPage/Student/profile/StudentProfile'));
const StudentDashboardPage = lazy(() => import('./Pages/DashboardPage/Student/StudentDashboard'));
const EducatorDashboardPage = lazy(() => import('./Pages/DashboardPage/Educator/EducatorDashboard'));
const CourseDashboardPage = lazy(() => import('./Pages/DashboardPage/Student/course/MyCourses/CoursePage'));
const Certificates = lazy(() => import('../src/Pages/DashboardPage/Student/certificates/MyCertificates'));
const CertificateTest = lazy(() => import('../src/Pages/DashboardPage/Student/CertificateTest/CertificationTest'));
const Courses = lazy(() => import('../src/Components/StudentComponents/Courses'));
const settings = lazy(() => import('./Pages/DashboardPage/Student/settings/Settings'))

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
        path: "/my-profile",
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
        allowedRoles: ["student", "educator" ] 
    }
    ,
    {
        path: "/my-courses",
        page: <Courses />,
        allowedRoles: ["student"] 
    },
    {
        path: "/my-certificates",
        page: <Certificates />,
        allowedRoles: ["student"] 
    },
    {
        path: "/certification-test",
        page: <CertificateTest />,
        allowedRoles: ["student"] 
    }
    



    
    
]

export default AppRoutes;
