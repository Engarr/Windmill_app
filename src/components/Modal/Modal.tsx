import ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

const Modal = (props: { show: boolean; handler: () => void }) => {
  if (!props.show) return null;
  return <div className={classes.backdrop} onClick={props.handler}></div>;
};

export default Modal;
