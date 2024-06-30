import React from "react";

export default function Button(props) {
  return (
    <button className="bg-dark w-20 text-bright p-2 rounded-lg">
      {props.children}
    </button>
  );
}
