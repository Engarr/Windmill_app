import React from 'react';
import { Oval } from 'react-loader-spinner';
import classes from './Spiner.module.scss';

interface PropsType {
  message: string;
}
const Spinner = ({ message }: PropsType) => {
  return (
    <div className={classes.Spiner}>
      <Oval
        height={80}
        width={80}
        color="rgb(231, 157, 20)"
        wrapperStyle={{}}
        wrapperClass=""
        visible
        ariaLabel="oval-loading"
        secondaryColor="rgb(252, 194, 141, 0.4)"
        strokeWidth={5}
        strokeWidthSecondary={3}
      />
      <p className={classes.text}>{message}</p>
    </div>
  );
};

export default Spinner;
