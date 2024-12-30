import React, { useState, useEffect } from 'react';
import '../style/HealthRecords.css'; 

export default function HealthRecord() {
  const [healthRecords, setHealthRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRecord, setNewRecord] = useState({
    bp: '',
    heartRate: '',
    sugarLevel: '',
    reason: '',
    medicines: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const mockData = [
      { id: 1, bp: '120/80', heartRate: 72, sugarLevel: 95, reason: 'Routine Checkup', medicines: 'None', date: '2024-12-25' },
      { id: 2, bp: '130/90', heartRate: 80, sugarLevel: 110, reason: 'Fatigue', medicines: 'Vitamin D, Paracetamol', date: '2024-12-20' },
    ];
    setHealthRecords(mockData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setHealthRecords((prev) => [...prev, { ...newRecord, id: prev.length + 1 }]);
    setShowForm(false);
    setNewRecord({
      bp: '',
      heartRate: '',
      sugarLevel: '',
      reason: '',
      medicines: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleDeleteRecord = (id) => {
    const updatedRecords = healthRecords.filter((record) => record.id !== id);
    setHealthRecords(updatedRecords);
  };

  return (
    <div className="container">
      <h2 className="title">Health Records</h2>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="table-header">
              <th className="table-cell">Date</th>
              <th className="table-cell">BP</th>
              <th className="table-cell">Heart Rate</th>
              <th className="table-cell">Sugar Level</th>
              <th className="table-cell">Reason</th>
              <th className="table-cell">Medicines</th>
              <th className="table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {healthRecords.map((record) => (
              <tr key={record.id}>
                <td className="table-cell">{record.date}</td>
                <td className="table-cell">{record.bp}</td>
                <td className="table-cell">{record.heartRate} bpm</td>
                <td className="table-cell">{record.sugarLevel} mg/dL</td>
                <td className="table-cell">{record.reason}</td>
                <td className="table-cell">{record.medicines}</td>
                <td className="table-cell">
                  <button
                    onClick={() => handleDeleteRecord(record.id)}
                    className="action-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={() => setShowForm(true)} className="add-button">Add New Health Record</button>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="form-container">
          <h3 className="form-title">Add New Record</h3>
          <div className="input-group">
            <div>
              <label>Blood Pressure</label>
              <input type="text" name="bp" value={newRecord.bp} onChange={handleInputChange} placeholder="e.g., 120/80" className="input-field" required />
            </div>
            <div>
              <label>Heart Rate</label>
              <input type="number" name="heartRate" value={newRecord.heartRate} onChange={handleInputChange} placeholder="e.g., 72" className="input-field" required />
            </div>
            <div>
              <label>Sugar Level</label>
              <input type="number" name="sugarLevel" value={newRecord.sugarLevel} onChange={handleInputChange} placeholder="e.g., 95" className="input-field" required />
            </div>
            <div>
              <label>Date</label>
              <input type="date" name="date" value={newRecord.date} onChange={handleInputChange} className="input-field" required />
            </div>
            <div>
              <label>Reason</label>
              <textarea name="reason" value={newRecord.reason} onChange={handleInputChange} placeholder="e.g., Routine Checkup" className="textarea" required />
            </div>
            <div>
              <label>Medicines</label>
              <textarea name="medicines" value={newRecord.medicines} onChange={handleInputChange} placeholder="e.g., Paracetamol" className="textarea" />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => setShowForm(false)} className="cancel-button">Cancel</button>
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      )}
    </div>
  );
}
