import React from "react";

export default function Input({
  className,
  name,
  placeholder,
  state,
  setState,
  type,
  id,
  onKeyDown,
}) {
  return (
    <input
      id={id}
      className={`p-3 outline-none rounded${className ? ` ${className}` : ""}`}
      name={name}
      placeholder={placeholder}
      value={state}
      type={type ? type : "text"}
      onChange={(e) => {
        if (setState) {
          setState(e.target.value);
        }
      }}
      onKeyDown={(e) => {
        if (onKeyDown) {
          onKeyDown(e);
        }
      }}
    />
  );
}
