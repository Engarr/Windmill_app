import { redirect } from 'react-router-dom';

export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate as string);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};

export const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return 'EXPIRED';
  }
  return token;
};

export const getUserId = () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    return null;
  }
  return userId;
};

export const tokenLoader = () => {
  return getAuthToken();
};
