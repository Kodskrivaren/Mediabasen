import React from "react";

export default function Input({
  classNames,
  name,
  placeholder,
  state,
  setState,
}) {
  return (
    <input
      className={`p-3 outline-none rounded${
        classNames ? ` ${classNames}` : ""
      }`}
      name={name}
      placeholder={placeholder}
      value={state}
      onChange={(e) => {
        if (setState) {
          setState(e.target.value);
        }
      }}
    />
  );
}
