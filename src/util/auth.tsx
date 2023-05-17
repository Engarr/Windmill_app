import { redirect } from 'react-router-dom';
import { useGetUserIdQuery } from '../store/apiSlice';

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
export const idLoader = async () => {
  const token = getAuthToken();
  if (!token) {
    return null;
  }
  let url = import.meta.env.VITE_REACT_APP_API_URL;
  const resposne = await fetch(url + `feed/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await resposne.json();
  const userId = user.userId;

  return userId;
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
