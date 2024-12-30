export const saveUser = (userData: any): void => {
  localStorage.setItem(`user_${userData.id}`, JSON.stringify(userData));
};

export const saveLabTest = (userId: string, testData: any): void => {
  const tests = getLabTests(userId);
  tests.push({ ...testData, id: Date.now().toString() });
  localStorage.setItem(`lab_tests_${userId}`, JSON.stringify(tests));
};

export const getLabTests = (userId: string): any[] => {
  const tests = localStorage.getItem(`lab_tests_${userId}`);
  return tests ? JSON.parse(tests) : [];
};

export const saveHealthRecord = (userId: string, recordData: any): void => {
  const records = getHealthRecords(userId);
  records.push({ ...recordData, id: Date.now().toString() });
  localStorage.setItem(`health_records_${userId}`, JSON.stringify(records));
};

export const getHealthRecords = (userId: string): any[] => {
  const records = localStorage.getItem(`health_records_${userId}`);
  return records ? JSON.parse(records) : [];
};