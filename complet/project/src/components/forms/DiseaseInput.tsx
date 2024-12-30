import React from 'react';
import { Plus } from 'lucide-react';

interface DiseaseInputProps {
  diseases: string[];
  onChange: (diseases: string[]) => void;
}

export default function DiseaseInput({ diseases, onChange }: DiseaseInputProps) {
  const addDisease = () => {
    onChange([...diseases, '']);
  };

  const updateDisease = (index: number, value: string) => {
    const newDiseases = [...diseases];
    newDiseases[index] = value;
    onChange(newDiseases);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Diseases</h3>
      {diseases.map((disease, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={disease}
            onChange={(e) => updateDisease(index, e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Disease name"
          />
          {index === diseases.length - 1 && (
            <button
              type="button"
              onClick={addDisease}
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