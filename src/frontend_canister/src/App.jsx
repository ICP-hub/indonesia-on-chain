import React, { lazy, Suspense, useEffect } from 'react';
import './Components/App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';
import Loader from './Components/Loader/Loader';
import UserBasedRoute from './UserBasedRoute';
import { AuthProvider, useAuth } from './Components/utils/useAuthClient';
import Alert from './Components/hooks/Alert';
import MainLayout from './Pages/LandingPage/Layout';
import TermsOfUse from './Components/Home/TermAndCondition';
import PrivacyPolicy from './Components/Home/PrivacyPolicy';

const LandingPage = lazy(() => import('./Pages/LandingPage/LandingPage'));

const App = () => {
    const { isAuthenticated } = useAuth();
    const { show, type, text } = useSelector((state) => state.alert);

    // Example: Fetching user role from Redux state
    const { role } = useSelector((state) => state.users);

    useEffect(() => {
        
    }, [isAuthenticated]);

    const renderCommonRoutes = () => (
        <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="terms" element={<TermsOfUse />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
        </Route>
    );

    return (
        <div>
            <div className="sticky z-50 top-16">
                {show && <Alert type={type} text={text} />}
            </div>
            <Suspense fallback={<Loader />}>
                <Routes>
                    {renderCommonRoutes()}
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
                </Routes>
            </Suspense>
            <ToastContainer />
        </div>
    );
};

const AppWithAuthProvider = () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);

export default AppWithAuthProvider;
