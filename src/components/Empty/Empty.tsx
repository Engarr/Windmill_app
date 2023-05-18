import React from 'react';
import classes from './Empty.module.scss';
import errorImg from '../../assets/404.jpg';

const Empty = (props: { message: string; width: number }) => {
  return (
    <div className={classes.empty}>
      <p>{props.message} </p>

      <img src={errorImg} alt="empty bag" width={props.width} />
    </div>
  );
};

export default Empty;
