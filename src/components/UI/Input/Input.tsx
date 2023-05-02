import classes from './Input.module.scss';

const Input = (props: {
  type: string;
  text: string;
  data: string;
  error?: string;

  onChange?: () => void;
}) => {
  return (
    <div className={`${classes.inputBox} ${props.error ? classes.error : ''}`}>
      <input
        type={props.type}
        placeholder={props.text}
        id={props.data}
        name={props.data}
        className={classes.input}
      />
      <label htmlFor={props.data} className={classes.label}>
        {props.text}
      </label>
    </div>
  );
};

export default Input;
