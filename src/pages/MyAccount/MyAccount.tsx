import { json, redirect } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import UserProfil from '../../components/UserProfil/UserProfil';
import { useRouteLoaderData } from 'react-router-dom';

const MyAccount = () => {
  const token = useRouteLoaderData('root');

  return <>{token ? <UserProfil /> : <AuthForm />}</>;
};

export default MyAccount;

export async function action({ request }: { request: Request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';
  const method = mode === 'login' ? 'POST' : 'PUT';

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data: FormData = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
    repeatPassword: data.get('repeatPassword'),
  };

  const url = import.meta.env.VITE_REACT_APP_API_URL + 'auth/';

  const response = await fetch(url + mode, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  const resData = await response.json();

  if (response.status === 422 || response.status === 401) {
    const errors = resData.errors;
    return errors;
  }
  if (!response.ok) {
    throw json(
      { message: 'Nie można uwierzytelnić użytkownika.' },
      {
        status: 500,
      }
    );
  }
  const token: string = resData.token;
  localStorage.setItem('token', token);
  const userId: string = resData.userId;
  localStorage.setItem('userId', userId);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 24);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}
