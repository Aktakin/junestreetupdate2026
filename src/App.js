import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages for better performance (only loads when needed)
const HomePage = lazy(() => import('./components/HomePage'));
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const BookingsPage = lazy(() => import('./components/BookingsPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const CareersPage = lazy(() => import('./components/CareersPage'));
const AdminPage = lazy(() => import('./components/AdminPage'));

// Loading spinner component
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
  </div>
);

// Layout wrapper to conditionally show Navbar/Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!isAdminPage && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
      {!isAdminPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/admin3082072" element={<AdminPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
