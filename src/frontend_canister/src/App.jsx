import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';
import Loader from './Components/Loader/Loader';
import UserBasedRoute from "./UserBasedRoute";
const LandingPage = lazy(() => import('./Pages/LandingPage/LandingPage'));

const App = () => {

    const { isAuthenticated } = useSelector((state) => state.internet);
    console.log("App.jsx->  ",isAuthenticated);
    const path = window.location.pathname;
    const { role } = useSelector((state) => state.users) // import here role from redux store.
    if (!isAuthenticated) {

        return (
            <>
                <Suspense fallback={<Loader />}>
                    <LandingPage />
                </Suspense>
            </>
        )
    }

    console.log(role);
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