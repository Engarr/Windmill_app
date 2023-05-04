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

export const tokenLoader = () => {
  return getAuthToken();
};
