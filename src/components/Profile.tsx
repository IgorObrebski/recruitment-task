import React, { FC } from "react";
import "./Profile.css";

interface Props {
  name: string;
  eyeColor?: string;
}

export const Profile: FC<Props> = ({ name, eyeColor }) => {
  console.log(name);
  console.log(eyeColor);

  return (
    <div className='profile'>
      <div>
        <img
          src='https://picsum.photos/534/383'
          alt='img'
          className='img'
        ></img>
        <div className='name'>{name}</div>
        <div>
          <span>age:</span> <br />
          <span>eye color: {eyeColor}</span>
        </div>
      </div>
    </div>
  );
};
