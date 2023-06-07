import classes from './Textarea.module.scss';

interface PropsType {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
  error?: string;
}

const Textarea = ({ onChange, defaultValue, error }: PropsType) => {
  return (
    <div className={`${classes.textareaBox} ${error ? classes.error : ''}`}>
      <textarea
        name="message"
        id="message"
        placeholder="Twoja wiaodmość:"
        className={classes.textarea}
        onChange={onChange}
        value={defaultValue}
      />
      <label htmlFor="message" className={classes.label}>
        Twoja wiadomość:
      </label>
    </div>
  );
};

export default Textarea;
