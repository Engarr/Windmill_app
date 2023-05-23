import classes from './Empty.module.scss';
import errorImg from '../../assets/404.jpg';

interface PropsType {
  message: string;
  width: number;
}

const Empty = ({ message, width }: PropsType) => {
  return (
    <div className={classes.empty}>
      <p>{message} </p>

      <img src={errorImg} alt="empty bag" width={width} />
    </div>
  );
};

export default Empty;
