import AuthForm from '../../components/AuthForm/AuthForm';

const MyAccount = () => {
  return <AuthForm />;
};

export default MyAccount;

interface Data {
  name: string;
  password: string;
}

export async function action({ request }: { request: Request }): Promise<null> {
  const data: FormData = await request.formData();
  
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };


  return null;
}
