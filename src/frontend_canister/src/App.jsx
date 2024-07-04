import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Components/Loader/Loader';
import UserBasedRoute from "./UserBasedRoute";
import { AuthProvider, useAuth } from './Components/utils/useAuthClient';
import Alert from './Components/hooks/Alert';
import AppRoutes from './AppRoutes';
import PrivacyPolicy from './Components/Home/PrivacyPolicy';
import TermsOfUse from './Components/Home/TermAndCondition';

// Lazy load LandingPage component
const LandingPage = lazy(() => import('./Pages/LandingPage/LandingPage'));

const App = () => {
    const { isAuthenticated } = useAuth();
    const { show, type, text } = useSelector((state) => state.alert);
    const { role } = useSelector((state) => state.users);

    useEffect(() => {
        // Any effect you might need
    }, [isAuthenticated]);

    return (
        <div>
            <div className='sticky top-16 z-50'>
                {show && <Alert type={type} text={text} />}
            </div>
            <Suspense fallback={<Loader />}>
                <Routes>
                    {/* Public routes accessible without authentication */}
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfUse />} />

                    {/* Private routes */}
                    {isAuthenticated && AppRoutes.map((route, index) => (
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

                    {/* Landing page route */}
                    <Route path="/" element={<LandingPage />} />
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
