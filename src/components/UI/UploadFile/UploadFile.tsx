import React from 'react';
import classes from './UploadFile.module.scss';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const UploadFile = (props: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imageSrcs: string | null;
}) => {
  return (
    <div className={classes.photoBox}>
      
        <label htmlFor="image" className={classes.photoBox__customFileUpload}>
          {props.imageSrcs ? (
            <div className={classes[`photoBox__customFileUpload--addedImg`]}>
              <img src={props.imageSrcs} alt="Selected" height={200} />
            </div>
          ) : (
            <p>
              <AiOutlineCloudUpload
                className={classes[`photoBox__customFileUpload--icon`]}
              />
              <span>Choose Photo</span>
            </p>
          )}
        </label>
        <input id="image" type="file" name="image" onChange={props.onChange} />
      
    </div>
  );
};

export default UploadFile;
