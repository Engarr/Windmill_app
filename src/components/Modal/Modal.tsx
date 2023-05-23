import classes from './Modal.module.scss';

interface PropsType {
  show: boolean;
  handler: () => void;
}

const Modal = ({ show, handler }: PropsType) => {
  if (!show) return null;

  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  return <div className={classes.backdrop} onClick={handler} />;
};

export default Modal;
