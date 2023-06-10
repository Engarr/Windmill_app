import { useState } from 'react';
import classes from './ResetPage.module.scss';
import SendCode from '../../components/ResetComponents/SendCode';
import VerifyCode from '../../components/ResetComponents/VerifyCode';
import AddNewPassword from '../../components/ResetComponents/addNewPassword';

const ResetPage = () => {
  const [email, setEmail] = useState<string>('');
  const [newPawsswordData, setNewPawsswordData] = useState({
    newPassword: '',
    repeatNewPassword: '',
  });
  const [userId, setUserId] = useState('');
  const [mode, setMode] = useState('sendEmail');

  let content;

  if (mode === 'sendEmail') {
    content = <SendCode email={email} setEmail={setEmail} setMode={setMode} />;
  } else if (mode === 'sendCode') {
    content = <VerifyCode setMode={setMode} setUserId={setUserId} />;
  } else if (mode === 'resetPassword') {
    content = (
      <AddNewPassword
        setMode={setMode}
        setNewPawsswordData={setNewPawsswordData}
        newPawsswordData={newPawsswordData}
        userId={userId}
      />
    );
  }
  return <div className={classes.mainContainer}>{content}</div>;
};

export default ResetPage;
