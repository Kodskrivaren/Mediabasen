import React from "react";

export default function Textarea({ classNames, name, placeholder }) {
  return (
    <textarea
      className={`p-3 outline-none rounded${
        classNames ? ` ${classNames}` : ""
      }`}
      name={name}
      placeholder={placeholder}
    />
  );
}
