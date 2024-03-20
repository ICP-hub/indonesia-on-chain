import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';
import Loader from './Components/Loader/Loader';
import { checkLoginOnStart } from './Components/Reducers/InternetIdentityReducer';
const LandingPage = lazy(() => import('./Pages/LandingPage/LandingPage'));
const SignUpRoles = lazy(() => import('./Pages/SignUp/SignUpRoles'));
const Error404 = lazy(() => import('./Pages/Error404Page/Error404'));
const StudentDashboardPage = lazy(() => import('./Pages/DashboardPage/StudentDashboard'));
const StudentProfile = lazy(() => import('./Pages/StudentPages/StudentProfile'))
const App = () => {

    const { isAuthenticated } = useSelector((state) => state.internet);
    console.log("isAuthenticated before",isAuthenticated);
    const { role } = useSelector((state) => state.users) // import here role from redux store.
  
  useEffect(()=>{
       checkLoginOnStart()
  },[])
  
    if (!isAuthenticated) {    
        console.log("isAuthenticated check", isAuthenticated)
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
                    {AppRoutes.map((route, index) => {
                        const CheckComponent =
                            route?.allowedRoles.includes(role)
                                ? route?.page
                                : window.location.pathname === '/'
                                    ? StudentDashboardPage
                                    : window.location.pathname.includes('signup-role')
                                        ? SignUpRoles
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