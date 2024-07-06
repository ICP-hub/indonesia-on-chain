import React, { lazy, Suspense, useEffect } from 'react';
import "./Components/App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';
import Loader from './Components/Loader/Loader';
import UserBasedRoute from "./UserBasedRoute";
import { AuthProvider } from './Components/utils/useAuthClient';
// import EducatorDashboard from './Pages/DashboardPage/Educator/EducatorDashboard';
// import StudentDashboard from './Pages/DashboardPage/Student/StudentDashboard';
const LandingPage = lazy(() => import('./Pages/LandingPage/LandingPage'));
import Alert from './Components/hooks/Alert'
import { useAuth } from './Components/utils/useAuthClient';


const App = () => {
    const { isAuthenticated } = useAuth();
    const { show, type, text } = useSelector((state) => state.alert)
    const { role } = useSelector((state) => state.users)

    useEffect(() => {
    }, [isAuthenticated]);
    if (!isAuthenticated) {
        return (
            <>
                <Suspense fallback={<Loader />}>
                    <LandingPage />
                </Suspense>
            </>
        )
    }
    // console.log(AppRoutes, "AppRoutes");
    return (
        <div>
            <div className='sticky z-50 top-16'>
                {show && <Alert type={type} text={text} />}
            </div>
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
            <ToastContainer />
        </div>
    );
};

export default () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);