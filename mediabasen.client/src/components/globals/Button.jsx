import React from "react";

export default function Button(props) {
  const { className, classNameColor } = props;

  return (
    <button
      className={`${
        classNameColor ? classNameColor : "bg-dark"
      } w-20 text-bright p-2 rounded-lg hover:bg-dark transition-colors disabled:text-gray-500 duration-200${
        className ? ` ${className}` : ""
      } disabled:bg-dark`}
      type={props.type ? props.type : "button"}
      onClick={props.onClick}
      disabled={props.disabled !== undefined ? props.disabled : false}>
      {props.children}
    </button>
  );
}
