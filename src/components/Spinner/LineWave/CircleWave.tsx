import { LineWave } from 'react-loader-spinner';
import classes from './CircleWave.module.scss';

const LineWaveLoader = () => {
  return (
    <div className={classes.loading}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default LineWaveLoader;
