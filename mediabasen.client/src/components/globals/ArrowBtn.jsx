import React from "react";

export default function ArrowBtn(props) {
  return (
    <button
      className={`flex justify-center align-middle bg-middle ${
        props.disabled ? "opacity-25" : "opacity-75"
      } rounded-full w-10 h-10 ${props.className || ""}`}
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.children}
    </button>
  );
}
