import { Form } from 'react-router-dom';

const AccountManage = () => {
  return (
    <div>
      <h4>Zarządzaj kontem:</h4>
      <Form action="/logout" method="post">
        <button type="submit">Logout</button>
      </Form>
    </div>
  );
};

export default AccountManage;
