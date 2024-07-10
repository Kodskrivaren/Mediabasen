import React from "react";

export default function Input({
  classNames,
  name,
  placeholder,
  state,
  setState,
  type,
  id,
}) {
  return (
    <input
      id={id}
      className={`p-3 outline-none rounded${
        classNames ? ` ${classNames}` : ""
      }`}
      name={name}
      placeholder={placeholder}
      value={state}
      type={type ? type : "text"}
      onChange={(e) => {
        if (setState) {
          setState(e.target.value);
        }
      }}
    />
  );
}
