import React from "react";

export default function FilterSelect({ value, onChange, children, disabled }) {
  return (
    <select
      className="bg-dark rounded-lg p-3 text-white flex flex-wrap justify-center gap-x-3 transition-colors hover:bg-black"
      value={value}
      onChange={onChange}
      disabled={disabled !== undefined ? disabled : false}>
      {children}
    </select>
  );
}
