import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import LabTests from './pages/LabTests';
import HealthRecords from './pages/HealthRecords';
import Doctor from './pages/doctor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="lab-tests" element={<LabTests />} />
          <Route path="health-records" element={<HealthRecords />} />
          <Route path="doctor" element={<Doctor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;