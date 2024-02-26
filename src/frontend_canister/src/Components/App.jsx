import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Navbar = lazy(() => import('./layouts/Navbar'));
const Error404 = lazy(() => import('./utils/Error404'));
const Login = lazy(() => import('./Auth/Login'));
const Dashboard = lazy(() => import('./Home/Dashboard'));

const App = () => {

  const { isAuthenticated } = useSelector((state) => state.internet);
  if (!isAuthenticated) {
    return (
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <Login />
        </Suspense>
      </>
    )
  }
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Routes>
          <Route path="/*" element={<Error404 />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
