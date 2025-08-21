import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.jsx';
import StoreInterest from './pages/StoreInterest.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import './styles/index.css';

// Initial debug logging
console.log('🚀 APP STARTING:', {
  timestamp: new Date().toISOString(),
  url: window.location.href,
  userAgent: navigator.userAgent,
  environment: {
    nodeEnv: import.meta.env.MODE,
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD
  }
});

// Debug component to log route changes
function RouteDebugger() {
  const location = useLocation();
  
  console.log('🔍 ROUTE DEBUG:', {
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    fullPath: location.pathname + location.search + location.hash,
    timestamp: new Date().toISOString()
  });
  
  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <Router>
      <RouteDebugger />
                     <Routes>
                 <Route path="/" element={<App />} />
                 <Route path="/interest" element={<StoreInterest />} />
                 <Route path="/admin" element={
                   <ProtectedRoute>
                     <AdminDashboard />
                   </ProtectedRoute>
                 } />
                 <Route path="/admin/login" element={<AdminLogin />} />
               </Routes>
    </Router>
  </ErrorBoundary>
);
