import React, { lazy } from 'react';
const Error404 = lazy(() => import('./Pages/Error404Page/Error404'));
const LandingPage = lazy(() => import('./Pages/LandingPage/LandingPage'));
const SignUpPage = lazy(() => import('./Pages/SignUpPage/SignUpPage'));
const StudentDashboardPage = lazy(() => import('./Pages/DashboardPage/StudentDashboardPage'));
const EducatorDashboardPage = lazy(() => import('./Pages/DashboardPage/EducatorDashboardPage'));

const studentRole = ["student"];
const educatorRole = ["educator"];
const studentAndEducatorRole = ["student", "educator"];

const AppRoutes = [
    { path: "/*", page: Error404, allowedRoles: studentAndEducatorRole },
    { path:"/", page: LandingPage, allowedRoles: studentAndEducatorRole },
    { path:"/signup", page: SignUpPage, allowedRoles: studentAndEducatorRole },
    { path:"/student-dashboard", page: StudentDashboardPage, allowedRoles: studentAndEducatorRole },
    { path:"/educator-dashboard", page: EducatorDashboardPage, allowedRoles: educatorRole },
]

export default AppRoutes;
