import classes from './Textarea.module.scss';

interface PropsType {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
  error?: string;
  text: string;
}

const Textarea = ({ onChange, defaultValue, error, text }: PropsType) => {
  return (
    <div className={`${classes.textareaBox} ${error ? classes.error : ''}`}>
      <textarea
        name="message"
        id="message"
        placeholder={text}
        className={classes.textarea}
        onChange={onChange}
        value={defaultValue}
      />
      <label htmlFor="message" className={classes.label}>
        {text}
      </label>
    </div>
  );
};

export default Textarea;
