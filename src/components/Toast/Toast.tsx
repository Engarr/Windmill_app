import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <div>
      <Toaster
        toastOptions={{
          className: '',
          duration: 3000,

          style: {
            background: 'rgb(255,255,255)',
            color: 'rgb(0,0,0)',
            padding: '16px',
            border: '2px solid rgb(252, 194, 141, 0.5)',
          },
          success: {
            iconTheme: {
              primary: 'rgb(231, 157, 20)',
              secondary: 'rgb(255,255,255)',
            },
          },
        }}
      />
    </div>
  );
};

export default Toast;
