import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';
import Loader from './Components/Loader/Loader';
import UserBasedRoute from "./UserBasedRoute";
import { AuthProvider } from './Components/utils/useAuthClient';
// import EducatorDashboard from './Pages/DashboardPage/Educator/EducatorDashboard';
// import StudentDashboard from './Pages/DashboardPage/Student/StudentDashboard';
const LandingPage = lazy(() => import('./Pages/LandingPage/LandingPage'));
import { useAuth } from './Components/utils/useAuthClient';

const App = () => {
    const { isAuthenticated } = useAuth();
    const { role } = useSelector((state) => state.users)

    useEffect(()=>{
        console.log("app.jsx role",role);
        console.log("auth check app.jsx",isAuthenticated);
    },[isAuthenticated]);
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

export default () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);