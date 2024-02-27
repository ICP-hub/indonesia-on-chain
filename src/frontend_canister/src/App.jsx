import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';
import Loader from './Components/Loader/Loader';
const Navbar = lazy(() => import('./Components/layouts/Navbar'));
const LandingPage = lazy(() => import('./Pages/LandingPage/LandingPage'));
const SignUpPage = lazy(() => import('./Pages/SignUpPage/SignUpPage'));
const Error404 = lazy(() => import('./Pages/Error404Page/Error404'));



const App = () => {

    const { isAuthenticated } = useSelector((state) => state.internet);
    const role = "student" // import here role from redux store.
    if (!isAuthenticated) {
        return (
            <>
                <Suspense fallback={<Loader />}>
                    <Navbar />
                    <LandingPage />
                </Suspense>
            </>
        )
    }
    return (
        <>
            <Suspense fallback={<Loader />}>
                <Navbar />
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const CheckComponent =
                            route?.allowedRoles.includes(role)
                                ? route?.page
                                : window.location.includes('signup')
                                    ? SignUpPage
                                    : Error404
                        return (
                            <Route
                                key={index}
                                path={route?.path}
                                element={<CheckComponent />} />
                        )
                    })}
                </Routes>
            </Suspense>
        </>
    );
};

export default App;
