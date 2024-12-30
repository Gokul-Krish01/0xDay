import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Activity, User, TestTube, FileText } from 'lucide-react';
import '../style/Layout.css'; // Import the CSS file

export default function Layout() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    // Check if user is logged in, if not redirect to login
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    navigate('/profile');
  };

  return (
    <div className="layout-container">
      <nav className="layout-nav">
        <div className="layout-nav-container">
          <div className="layout-nav-content">
            <div className="layout-brand">
              <Link to="/" className="layout-brand-link">
                <Activity className="layout-brand-icon" />
                <span className="layout-brand-text">HealthCare</span>
              </Link>
            </div>

            <div className="layout-links">
              <button onClick={handleProfileClick} className="layout-link">
                <User className="layout-icon" />
                Profile
              </button>
              <Link to="/lab-tests" className="layout-link">
                <TestTube className="layout-icon" />
                Lab Tests
              </Link><br></br>
              <Link to="/health-records" className="layout-link" >
                <FileText className="layout-icon"/>
                Health Records
              </Link>
              <br></br>
              <Link to="/doctor" className="layout-link" >
                <FileText className="layout-icon"/>
                ChatBot
              </Link>

              

              
            </div>
          </div>
        </div>
      </nav>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}
