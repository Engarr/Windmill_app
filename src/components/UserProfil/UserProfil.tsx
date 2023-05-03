import { useState, useEffect } from 'react';
import { useRouteLoaderData } from 'react-router-dom';

const UserProfil = () => {
  const token = useRouteLoaderData('root') as string;
  const [userData, setUserData] = useState({});

  const fetchUser = async () => {
    let url = import.meta.env.VITE_REACT_APP_API_URL;
    const resposne = await fetch(url + `feed/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await resposne.json();
    setUserData(user);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  
  return <div>UserProfil</div>;
};

export default UserProfil;
