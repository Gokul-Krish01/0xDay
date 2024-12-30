import React from 'react';
import { Plus } from 'lucide-react';
import { Medication } from '../../types';

interface MedicationInputProps {
  medications: Medication[];
  onChange: (medications: Medication[]) => void;
}

export default function MedicationInput({ medications, onChange }: MedicationInputProps) {
  const addMedication = () => {
    onChange([...medications, { name: '', dosage: '', frequency: '' }]);
  };

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    const newMedications = [...medications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    onChange(newMedications);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Medications</h3>
      {medications.map((medication, index) => (
        <div key={index} className="grid grid-cols-3 gap-2">
          <input
            type="text"
            value={medication.name}
            onChange={(e) => updateMedication(index, 'name', e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Medicine name"
          />
          <input
            type="text"
            value={medication.dosage}
            onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Dosage"
          />
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={medication.frequency}
              onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Frequency"
            />
            {index === medications.length - 1 && (
              <button
                type="button"
                onClick={addMedication}
                className="p-2 text-blue-600 hover:text-blue-800"
              >
                <Plus className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}