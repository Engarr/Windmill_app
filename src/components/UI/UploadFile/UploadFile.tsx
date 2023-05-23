import React from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import classes from './UploadFile.module.scss';

interface PropsType {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imageSrcs: string | null;
}

const UploadFile = ({ onChange, imageSrcs }: PropsType) => {
  let content;

  if (imageSrcs) {
    content = (
      <div className={classes[`photoBox__customFileUpload--addedImg`]}>
        <img src={imageSrcs} alt="Selected" height={200} />
      </div>
    );
  } else {
    content = (
      <p>
        <AiOutlineCloudUpload
          className={classes[`photoBox__customFileUpload--icon`]}
        />
        <span>Choose Photo</span>
      </p>
    );
  }

  return (
    <div className={classes.photoBox}>
      <label htmlFor="image" className={classes.photoBox__customFileUpload}>
        {content}
      </label>
      <input id="image" type="file" name="image" onChange={onChange} />
    </div>
  );
};

export default UploadFile;
