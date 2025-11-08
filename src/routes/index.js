import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('../page/lazy/Home'))
const About = lazy(() => import('../page/lazy/About'))
const NotFound = lazy(() => import('../page/lazy/NotFound'))
const Customer = lazy(() => import('../page/Customer'))
const Products = lazy(() => import('../page/Products'))

export const AppRoutes = () => (
<Suspense fallback={<div>Loading...</div>}>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/home" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/customer" element={<Customer />} />
<Route path="/products/:type" element={<Products />} />
<Route path="*" element={<NotFound />} />
</Routes>
</Suspense>
)