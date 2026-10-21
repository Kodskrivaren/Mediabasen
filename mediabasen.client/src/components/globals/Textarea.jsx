import React from "react";

export default function Textarea({
  classNames,
  name,
  placeholder,
  state,
  setState,
}) {
  return (
    <textarea
      className={`p-3 outline-hidden rounded${
        classNames ? ` ${classNames}` : ""
      }`}
      name={name}
      placeholder={placeholder}
      value={state !== undefined ? state : undefined}
      onChange={(e) => {
        if (setState) {
          setState(e.target.value);
        }
      }}
    />
  );
}
