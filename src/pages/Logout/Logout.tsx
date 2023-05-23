import { redirect } from 'react-router-dom';

function action() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  return redirect('/');
}

export default action;
