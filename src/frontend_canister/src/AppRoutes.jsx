import React, { lazy } from 'react';
const Error404 = lazy(() => import('./Pages/Error404Page/Error404'));
const LandingPage = lazy(() => import('./Pages/LandingPage/LandingPage'));
const SignUpRoles = lazy(() => import('./Pages/SignUp/SignUpRoles'));
const SignUpStudent = lazy(() => import('./Pages/SignUp/SignUpStudent'));
const SignUpEducator = lazy(() => import('./Pages/SignUp/SignUpEducator'));
const StudentDashboardPage = lazy(() => import('./Pages/DashboardPage/StudentDashboardPage'));
const EducatorDashboardPage = lazy(() => import('./Pages/DashboardPage/EducatorDashboardPage'));
const CourseDashboardPage = lazy(() => import('./Pages/CourseDashboard/CoursePage'));

const studentRole = ["student"];
const educatorRole = ["educator"];
const studentAndEducatorRole = ["student", "educator"];

const AppRoutes = [
    { path: "/*", page: Error404, allowedRoles: studentAndEducatorRole },
    { path: "/", page: LandingPage, allowedRoles: studentAndEducatorRole },
    { path: "/signup-role", page: SignUpRoles, allowedRoles: studentAndEducatorRole },
    { path: "/signup-student", page: SignUpStudent, allowedRoles: studentAndEducatorRole },
    { path: "/signup-educator", page: SignUpEducator, allowedRoles: studentAndEducatorRole },
    { path: "/student-dashboard", page: StudentDashboardPage, allowedRoles: studentRole },
    { path: "/student-profile", page: StudentDashboardPage, allowedRoles: studentRole },
    { path: "/educator-dashboard", page: EducatorDashboardPage, allowedRoles: educatorRole },
    { path: "/course-page", page: CourseDashboardPage, allowedRoles: studentAndEducatorRole },
]
export default AppRoutes;
