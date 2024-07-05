import React from "react";

export default function Button(props) {
  const { className, classNameColor } = props;

  return (
    <button
      className={`${
        classNameColor ? classNameColor : "bg-dark"
      } w-20 text-bright p-2 rounded-lg hover:bg-middle transition-colors duration-200${
        className ? ` ${className}` : ""
      }`}
      type={props.type ? props.type : "button"}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
}
