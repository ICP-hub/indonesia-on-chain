import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';
import Loader from './Components/Loader/Loader';
import UserBasedRoute from "./UserBasedRoute";
// import EducatorDashboard from './Pages/DashboardPage/Educator/EducatorDashboard';
// import StudentDashboard from './Pages/DashboardPage/Student/StudentDashboard';
const LandingPage = lazy(() => import('./Pages/LandingPage/LandingPage'));

const App = () => {

    const { isAuthenticated } = useSelector((state) => state.internet);
    console.log("App.jsx->  ", isAuthenticated);
    const path = window.location.pathname;
    const { role } = useSelector((state) => state.users)
    if (!isAuthenticated) {
        return (
            <>
                <Suspense fallback={<Loader />}>
                    <LandingPage />
                </Suspense>
            </>
        )
    }
    console.log(AppRoutes, "AppRoutes");
    return (
        <>
            <Suspense fallback={<Loader />}>
                {/* <Navbar /> */}
                <Routes>
                    {AppRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <UserBasedRoute
                                    component={route.page}
                                    allowedUser={route.allowedRoles}
                                />
                            }
                        />
                    ))}
                </Routes>
            </Suspense>
        </>
    );
};

export default App;