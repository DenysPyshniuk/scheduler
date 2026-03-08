import React from "react";

const classnames = require("classnames");

// BUTTON COMPONENT:
export default function Button(props) {
  const buttonClass = classnames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
