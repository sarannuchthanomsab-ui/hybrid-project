import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Home = lazy(() => import('../page/lazy/Home'));
const About = lazy(() => import('../page/lazy/About'));
const NotFound = lazy(() => import('../page/lazy/NotFound'));
const Customer = lazy(() => import('../page/Customer'));
const Products = lazy(() => import('../page/Products'));
const Login = lazy(() => import('../page/login'));

const auth_user_id = localStorage.getItem("auth_user_id");

export const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>

      {/* NOT LOGGED IN → force everything to Login */}
      {auth_user_id === null ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          {/* LOGGED IN → public entry redirects to /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/products/:type" element={<Products />} />
          

          {/* If logged in but route doesn't exist */}
          <Route path="*" element={<NotFound />} />
        </>
      )}

    </Routes>
  </Suspense>
);
