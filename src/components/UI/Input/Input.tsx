import classes from './Input.module.scss';

const Input = (props: {
  type: string;
  text: string;
  data: string;
  error?: string;
  step?: number;
  defaultValue?: number | string;
  style?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => string;
}) => {
  return (
    <div className={`${classes.inputBox} ${props.error ? classes.error : ''}`}>
      <input
        type={props.type}
        placeholder={props.text}
        id={props.data}
        name={props.data}
        className={classes.input}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        step={props.step}
      />
      <label htmlFor={props.data} className={classes.label}>
        {props.text}
      </label>
    </div>
  );
};

export default Input;
