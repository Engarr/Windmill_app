import classes from './Textarea.module.scss';

const Textarea = () => {
  return (
    <div className={classes.textareaBox}>
      <textarea
        name="message"
        id="message"
        placeholder="Twoja wiaodmość:"
        className={classes.textarea}
      />
      <label htmlFor="message" className={classes.label}>
        Twoja wiadomość:
      </label>
    </div>
  );
};

export default Textarea;
