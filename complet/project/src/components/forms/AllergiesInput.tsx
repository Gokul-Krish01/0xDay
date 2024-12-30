import React from 'react';
import { Plus } from 'lucide-react';

interface AllergiesInputProps {
  allergies: string[];
  onChange: (allergies: string[]) => void;
}

export default function AllergiesInput({ allergies, onChange }: AllergiesInputProps) {
  const addAllergy = () => {
    onChange([...allergies, '']);
  };

  const updateAllergy = (index: number, value: string) => {
    const newAllergies = [...allergies];
    newAllergies[index] = value;
    onChange(newAllergies);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Allergies</h3>
      {allergies.map((allergy, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={allergy}
            onChange={(e) => updateAllergy(index, e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Allergy name"
          />
          {index === allergies.length - 1 && (
            <button
              type="button"
              onClick={addAllergy}
              className="p-2 text-blue-600 hover:text-blue-800"
            >
              <Plus className="h-5 w-5" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
