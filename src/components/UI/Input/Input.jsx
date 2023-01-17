import React, { useRef, useImperativeHandle, forwardRef } from "react";
import styles from "./Input.module.css";

const andle = (activate) => {
  return {
    focus: activate,
  };
};

const Input = forwardRef((props, ref) => {
  const inputRef = useRef();
  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => andle(activate));
  //   useImperativeHandle(ref, () => {
  //     return {
  //       focus: activate,
  //     };
  //   });

  return (
    <>
      <div
        className={`${styles.control} ${
          props.isValid === false ? styles.invalid : ""
        }`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
          ref={inputRef}
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
    </>
  );
});

export default Input;
