import React, {useState} from "react";

const Input = ({ title, onChangeText, errors }) => {
    const label = title[0].toUpperCase()+title.slice(1,title.length)
  return (
    <>
      <div id={title} className="form-group">
        <label htmlFor={title}>{label} </label>
        <input
          onChange={onChangeText}
          type="text"
          className="form-control"
        />
      </div>
      {errors && <div className="alert alert-danger">{errors}</div>}
    </>
  );
};

export default Input;
