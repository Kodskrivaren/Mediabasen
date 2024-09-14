import React from "react";
import Button from "./Button";

export default function ButtonDanger(props) {
  const { className } = props;

  return (
    <Button
      className={className ? "hover:bg-black " + className : "hover:bg-black"}
      classNameColor={"bg-red-500"}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.children}
    </Button>
  );
}
