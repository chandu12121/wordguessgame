import React from "react";

const Input = ({ type, value, onChange, maxLength, className, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className={`input-field ${className}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
