import React, { useState } from 'react';
import styles from './Input.module.css';

import openEye from 'assets/images/eye_open_ic.png';
import closedEye from 'assets/images/eye_closed_ic.png';

const Input = ({
  placeholder, 
  value,
  disabled,
  comment,
  onChange, 
  type = 'text',
  onIconClick,
  inputMode = 'text',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (evt) => {
    const newValue = evt.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleIconClick = () => {
    if (onIconClick) {
      onIconClick(comment);
    } else if (inputMode === 'password') {
      setShowPassword(!showPassword);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type={showPassword ? 'text' : type}
        placeholder={placeholder}
        className={styles.input}
        disabled={disabled}
        value={value}
        onChange={handleInputChange}
      />
      {inputMode === 'password' && (
        <span className={styles.icon} onClick={handleIconClick}>
          <img src={showPassword ? closedEye : openEye} alt="Toggle password visibility" />
        </span>
      )}
    </div>
  );
};

export default Input;
