import classes from './Input.module.scss';

const Input = (props: {
  type: string;
  text: string;
  data: string;
  onChange?: () => void;
}) => {
  return (
    <div className={classes.inputBox}>
      <input
        type={props.type}
        placeholder={props.text}
        id={props.data}
        className={classes.input}
      />
      <label htmlFor="name" className={classes.label}>
        {props.text}
      </label>
    </div>
  );
};

export default Input;
