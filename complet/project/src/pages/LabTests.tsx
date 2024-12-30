import React, { useState } from 'react';
import { Upload, Plus, Trash2 } from 'lucide-react';
import '../style/LabTests.css'; 

export default function LabTests() {
  const [tests, setTests] = useState<Array<{ id: string; date: Date; description: string; imageUrl: string }>>([]);

  const handleAddTest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newTest = {
      id: Date.now().toString(),
      date: new Date(),
      description: formData.get('description') as string,
      imageUrl: URL.createObjectURL(formData.get('image') as File),
    };

    setTests((prev) => [...prev, newTest]);
    form.reset();
  };

  const handleDeleteTest = (id: string) => {
    setTests((prev) => prev.filter((test) => test.id !== id));
  };

  return (
    <div className="lab-tests-container">
      {/* Form for adding lab test reports */}
      <div className="lab-test-form">
        <h2>Add Lab Test Report</h2>
        <form onSubmit={handleAddTest} className="space-y-4">
          <div>
            <label>Description</label>
            <input type="text" name="description" required />
          </div>
          <div>
            <label>Upload Report</label>
            <input type="file" name="image" accept="image/*" required />
          </div>
          <button type="submit" className="add-button">
            <Plus className="icon h-5 w-5" />
            Add Report
          </button>
        </form>
      </div>

      {/* Displaying lab test reports */}
      <div className="lab-test-grid">
        {tests.map((test) => (
          <div key={test.id} className="lab-test-card">
            <img src={test.imageUrl} alt="Lab Test Report" />
            <div className="card-content">
              <p className="date">{test.date.toLocaleDateString()}</p>
              <p className="description">{test.description}</p>
            </div>
            <button 
              className="delete-button" 
              onClick={() => handleDeleteTest(test.id)}
              aria-label="Delete Report"
            >
              <Trash2 className="icon h-5 w-5" />
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
