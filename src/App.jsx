import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import About from './pages/About';
import Services from './pages/Services';
import Facilities from './pages/Facilities';
import Legal from './pages/Legal';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import HealthCorner from './pages/HealthCorner';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/health-corner" element={<HealthCorner />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/super-admin-dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<div className="container section text-center"><h1>404 - Page Not Found</h1></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
