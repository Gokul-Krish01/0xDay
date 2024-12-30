import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import DiseaseInput from '../components/forms/DiseaseInput';
import MedicationInput from '../components/forms/MedicationInput';
import QRDisplay from '../components/QRDisplay';
import { generateUserId } from '../utils/auth';
import { saveUser } from '../utils/storage';
import "react-datepicker/dist/react-datepicker.css";
import AllergiesInput from '../components/forms/AllergiesInput';
import '../style/Register.css'; 
import { Bold } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);
  const [userId, setUserId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dob: new Date(),
    mobile: '',
    height: '',
    weight: '',
    BloodGroup:'',
    address: '',
    aadharNumber: '',
    otp: '',
    diseases: [''],
    allergies: [''],
    
    medications: [{ name: '', dosage: '', frequency: '' }],
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [sessionId, setSessionId] = useState('');

  const apiKey = '23ec3bc9-c637-11ef-8b17-0200cd936042';

  const sendMessageOTP = () => {
    const phone = formData.mobile.trim();
    if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    fetch(`https://2factor.in/API/V1/${apiKey}/SMS/${phone}/AUTOGEN`)
      .then(response => response.json())
      .then(data => {
        if (data.Status === 'Success') {
          setSessionId(data.Details);
          setIsOtpSent(true);
          alert('OTP sent successfully!');
        } else {
          alert('Failed to send OTP. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error sending OTP. Check console for details.');
      });
  };

  const verifyMessageOTP = () => {
    const otp = formData.otp.trim();
    if (!otp || !sessionId) {
      alert('Please enter the OTP and request a new one if the session has expired.');
      return;
    }

    fetch(`https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sessionId}/${otp}`)
      .then(response => response.json())
      .then(data => {
        if (data.Status === 'Success') {
          alert('OTP verified successfully!');
        } else {
          alert('Invalid OTP. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error verifying OTP. Check console for details.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserId = generateUserId();
    setUserId(newUserId);

    const userData = {
      ...formData,
      id: newUserId,
    };

    saveUser(userData);
    setShowQR(true);
  };

  if (showQR) {
    return (
      <div className="containers">
        <div className="card">
          <h2>Registration Successful!</h2>
          <p>Your User ID: <span>{userId}</span></p>
          <QRDisplay value={userId} title="Your QR Code" />
          <button onClick={() => navigate('/login')} className="btn-primary">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="containers">
      <form onSubmit={handleSubmit} className="form">
      <h1 style={{ fontSize: 'xx-large', textAlign: 'center', marginBottom: '16px',fontWeight:'Bold' }}>Register</h1>

        <div className="form-grid">
          <div>
            <label>Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required />
          </div>
          <div>
            <label>Age</label>
            <input type="number" value={formData.age} onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))} required />
          </div>
          <div>
            <label>Height (cm)</label>
            <input type="number" value={formData.height} onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))} required />
          </div>
          <div>
            <label>Weight (kg)</label>
            <input type="number" value={formData.weight} onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))} required />
          </div>
          <div>
            <label>Blood Group (ve)</label>
            <input type="text" value={formData.BloodGroup} onChange={(e) => setFormData(prev => ({ ...prev, BloodGroup: e.target.value }))} required />
          </div>
          <div>
            <label>Date of Birth</label>
            <DatePicker selected={formData.dob} onChange={(date) => setFormData(prev => ({ ...prev, dob: date || new Date() }))} />
          </div>
          
          <div>
            <label>Mobile Number</label>
            <input type="tel" value={formData.mobile} onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))} required />
            {!isOtpSent ? (
              <button type="button" onClick={sendMessageOTP} className="btn-secondary">Send OTP</button>
            ) : (
              <>
                <label>OTP</label>
                <input type="text" value={formData.otp} onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value }))} required />
                <button type="button" onClick={verifyMessageOTP} className="btn-secondary">Verify OTP</button>
              </>
            )}
          </div>
          <div>
          <label style={{ }}>Address</label>

            <textarea value={formData.address} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} required></textarea>
          </div>
          <div>
            <label>Aadhar Number</label>
            <input type="text" value={formData.aadharNumber} onChange={(e) => setFormData(prev => ({ ...prev, aadharNumber: e.target.value }))} required />
          </div>
        </div>
        <div style={{display: 'flex', width: '100%'}}>
        <DiseaseInput diseases={formData.diseases} onChange={(diseases) => setFormData(prev => ({ ...prev, diseases }))}  />
        <AllergiesInput allergies={formData.allergies} onChange={(allergies) => setFormData(prev => ({ ...prev, allergies }))} />
        </div>
        
        <MedicationInput medications={formData.medications} onChange={(medications) => setFormData(prev => ({ ...prev, medications }))} />

        <button type="submit" className="btn-primary">Register</button>
        <div className="form-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </form>
    </div>
  );
}
