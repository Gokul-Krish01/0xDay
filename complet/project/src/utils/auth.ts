export const generateUserId = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const login = (userId: string, password: string): boolean => {
  const storedUser = localStorage.getItem(`user_${userId}`);
  if (!storedUser) return false;

  const user = JSON.parse(storedUser);
  if (user.password !== password) return false;

  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('currentUserId', userId);
  return true;
};

export const logout = (): void => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUserId');
};

export const getCurrentUser = () => {
  const userId = localStorage.getItem('currentUserId');
  if (!userId) return null;

  const userStr = localStorage.getItem(`user_${userId}`);
  return userStr ? JSON.parse(userStr) : null;
};