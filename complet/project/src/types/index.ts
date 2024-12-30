export interface User {
  id: string;
  name: string;
  age: number;
  dob: Date;
  mobile: string;
  height: number;
  weight: number;
  BloodGroup: string;
  aadharNumber: string;
  diseases: string[];
  medications: Medication[];
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

export interface LabTest {
  id: string;
  date: Date;
  description: string;
  imageUrl: string;
}

export interface HealthRecord {
  id: string;
  date: Date;
  session: string;
  condition: string;
  notes: string;
}