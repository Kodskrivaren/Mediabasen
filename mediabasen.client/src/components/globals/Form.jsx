import React from "react";

export default function Form(props) {
  return (
    <form
      className={`flex flex-col gap-5 p-3 bg-dark rounded max-w-md${
        props.className ? ` ${props.className}` : ""
      }`}
      onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
}
