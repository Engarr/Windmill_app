import { useRouteLoaderData } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import UserProfil from '../../components/UserProfil/UserProfil';

const MyAccount = () => {
  const token = useRouteLoaderData('root');

  let content;
  if (token) {
    content = <UserProfil />;
  } else {
    content = <AuthForm />;
  }

  return <div>{content}</div>;
};

export default MyAccount;
