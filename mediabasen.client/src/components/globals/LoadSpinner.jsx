import React from "react";
import LoadArrow from "../../assets/icons/load-arrow.svg?react";

export default function LoadSpinner({ className }) {
  return (
    <LoadArrow
      className={`w-10 h-10 block animate-spin fill-white ${
        className ? className : ""
      }`}
    />
  );
}
