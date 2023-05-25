import { redirect } from 'react-router-dom';

export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem('expiration');
  if (!storedExpirationDate) {
    localStorage.removeItem('token');
    return null;
  }
  const expirationDate = new Date(storedExpirationDate as string);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};

export const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    localStorage.removeItem('token');
    return null;
  }
  const tokenDuration = getTokenDuration();
  if (!tokenDuration) {
    return null;
  }
  if (tokenDuration < 0) {
    localStorage.removeItem('token');
    return 'EXPIRED';
  }
  return token;
};

export function checkOutLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect('/auth');
  }

  return null;
}
export const tokenLoader = () => {
  return getAuthToken();
};
