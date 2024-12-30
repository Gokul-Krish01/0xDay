import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import '../style/Login.css'; // Import the CSS file

export default function Login() {
  const [loginId, setLoginId] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // Step to manage OTP flow
  const [sessionId, setSessionId] = useState('');
  const navigate = useNavigate();

  const apiKey = '23ec3bc9-c637-11ef-8b17-0200cd936042'; // Replace with your 2Factor API key

  const sendOTP = async () => {
    if (!mobile || mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      const response = await fetch(`https://2factor.in/API/V1/${apiKey}/SMS/${mobile}/AUTOGEN`);
      const data = await response.json();

      if (data.Status === 'Success') {
        setSessionId(data.Details); // Store session ID for OTP verification
        setStep(2); // Switch to OTP input step
        setError('');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Error sending OTP. Check console for details.');
    }
  };

  const verifyOTP = async () => {
    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }

    if (!sessionId) {
      setError('Session ID is missing. Please request a new OTP.');
      return;
    }

    try {
      const response = await fetch(`https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sessionId}/${otp}`);
      const data = await response.json();

      if (data.Status === 'Success') {
        setError('');
        navigate('/profile'); // Navigate to profile page after successful verification
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Error verifying OTP. Check console for details.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="icon-wrapper">
          <LogIn className="login-icon" />
        </div>
        <h2 className="login-title">Login</h2>
        {error && <div className="error-message">{error}</div>}
        {step === 1 && (
          <div>
            <label className="label">Login ID</label>
            <input
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="input"
              placeholder="Enter your login ID"
              required
            />
            <label className="label">Mobile Number</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="input"
              placeholder="Enter your mobile number"
              required
            />
            <button type="button" onClick={sendOTP} className="button">
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="label">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input"
              placeholder="Enter the OTP"
              required
            />
            <button type="button" onClick={verifyOTP} className="button">
              Verify OTP
            </button>
          </div>
        )}

        <div className="footer">
          <p className="footer-text">
            Don't have an account?{' '}
            <Link to="/register" className="register-link">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
