import classes from './Input.module.scss';

interface Propstype {
  type: string;
  text: string;
  data: string;
  error?: string;
  step?: number;
  defaultValue?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  text,
  data,
  error,
  step,
  defaultValue,
  onChange,
}: Propstype) => {
  return (
    <div className={`${classes.inputBox} ${error ? classes.error : ''}`}>
      <input
        type={type}
        placeholder={text}
        id={data}
        name={data}
        className={classes.input}
        value={defaultValue}
        onChange={onChange}
        step={step}
      />
      <label htmlFor={data} className={classes.label}>
        {error ? `${text}${error}` : text}
      </label>
    </div>
  );
};

export default Input;
