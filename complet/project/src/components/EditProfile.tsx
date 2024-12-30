import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import DiseaseInput from './forms/DiseaseInput';
import MedicationInput from './forms/MedicationInput';
import { saveUser } from '../utils/storage';
import "react-datepicker/dist/react-datepicker.css";
import '../style/EditProfile.css';

interface EditProfileProps {
  user: any;
  onClose: () => void;
}

export default function EditProfile({ user, onClose }: EditProfileProps) {
  const [formData, setFormData] = useState({
    ...user,
    dob: new Date(user.dob)
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUser(formData);
    onClose();
  };

  return (
    <div className="edit-profile-overlay">
      <div className="edit-profile-modal">
        <h2 className="edit-profile-title">Edit Profile</h2>
        
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="edit-profile-grid">
            <div>
              <label className="edit-profile-label">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="edit-profile-input"
                required
              />
            </div>
            
            <div>
              <label className="edit-profile-label">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                className="edit-profile-input"
                required
              />
            </div>

            <div>
              <label className="edit-profile-label">Height (cm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                className="edit-profile-input"
                required
              />
            </div>

            <div>
              <label className="edit-profile-label">Weight (kg)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                className="edit-profile-input"
                required
              />
            </div>
            <div>
              <label className="edit-profile-label">Blood Group:</label>
              <input
                type="text"
                value={formData.BloodGroup}
                onChange={(e) => setFormData(prev => ({ ...prev, BloodGroup: e.target.value }))}
                className="edit-profile-input"
                required
              />
            </div>
            <div>
              <label className="edit-profile-label">Mobile Number</label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                className="edit-profile-input"
                required
              />
            </div>

            <div>
              <label className="edit-profile-label">Date of Birth</label>
              <DatePicker
                selected={formData.dob}
                onChange={(date) => setFormData(prev => ({ ...prev, dob: date || new Date() }))}
                className="edit-profile-input"
              />
            </div>
          </div>

          <DiseaseInput 
            diseases={formData.diseases}
            onChange={(diseases) => setFormData(prev => ({ ...prev, diseases }))}
          />

          <MedicationInput
            medications={formData.medications}
            onChange={(medications) => setFormData(prev => ({ ...prev, medications }))}
          />

          <div className="edit-profile-actions">
            <button
              type="button"
              onClick={onClose}
              className="edit-profile-cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="edit-profile-save-btn"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
