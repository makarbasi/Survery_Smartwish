import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import StoreInterest from './pages/StoreInterest.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/interest" element={<StoreInterest />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  </Router>
);
