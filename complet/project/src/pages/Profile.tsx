import React, { useState } from 'react';
import { User, Edit2 } from 'lucide-react';
import QRDisplay from '../components/QRDisplay';
import EditProfile from '../components/EditProfile';
import { getCurrentUser } from '../utils/auth';
import '../style/Profile.css'; 

export default function Profile() {
  const [showEdit, setShowEdit] = useState(false);
  const [user, setUser] = useState(getCurrentUser());

  if (!user) {
    return (
      <div className="text-center py-8">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const handleEditClose = () => {
    setShowEdit(false);
    setUser(getCurrentUser()); // Refresh user data after edit
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button
          onClick={() => setShowEdit(true)}
          className="profile-edit-button"
          title="Edit Profile"
        >
          <Edit2 className="h-5 w-5" />
        </button>
        <div className="profile-icon-wrapper">
          <User className="profile-icon" />
        </div>
        <h2 className="profile-title">Your Profile</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Information Card */}
        <div className="card">
          <h3 className="card-title">Personal Information</h3>
          <div className="card-content">
            <p className="card-item">
              <span>User ID:</span> {user.id}
            </p>
            <p className="card-item">
              <span>Name:</span> {user.name}
            </p>
            <p className="card-item">
              <span>Age:</span> {user.age}
            </p>
            <p className="card-item">
              <span>Mobile:</span> {user.mobile}
            </p>
            <p className="card-item">
              <span>Aadhar:</span> {user.aadharNumber}
            </p>
            <p className="card-item">
              <span>Address:</span> {user.address}
            </p>
            <p className="card-item">
              <span>Date of Birth:</span> {new Date(user.dob).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Health Information Card */}
        <div className="card">
  <h3 className="card-title">Health Information</h3>
  <div className="card-content">
    <p className="card-item">
      <span>Height:</span> {user.height} cm
    </p>
    <p className="card-item">
      <span>Weight:</span> {user.weight} kg
    </p>
    <p className="card-item">
      <span>Blood Group:</span> {user.BloodGroup} ve
    </p>
    <p className="card-item">
      <span>BMI:</span> {((user.weight / (user.height / 100) ** 2) || 0).toFixed(2)}
    </p>
  </div>
</div>


        {/* Diseases Card */}
        <div className="card">
          <h3 className="card-title">Current Diseases</h3>
          <ul className="list-disc list-inside space-y-1">
            {user.diseases.map((disease, index) =>
              disease && <li key={index}>{disease}</li>
            )}
          </ul>
        </div>

        {/* Medications Card */}
        <div className="card">
          <h3 className="card-title">Current Medications</h3>
          <div className="card-content">
            {user.medications.map((med, index) => (
              med.name && (
                <div key={index} className="p-2 bg-gray-50 rounded">
                  <p>
                    <span>Medicine:</span> {med.name}
                  </p>
                  <p>
                    <span>Dosage:</span> {med.dosage}
                  </p>
                  <p>
                    <span>Frequency:</span> {med.frequency}
                  </p>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* QR Code Card */}
      <div className="qr-section">
        <h3 className="card-title">Your QR Code</h3>
        <QRDisplay value={user.id} title="Your QR Code" />
      </div>

      {showEdit && <EditProfile user={user} onClose={handleEditClose} />}
    </div>
  );
}
