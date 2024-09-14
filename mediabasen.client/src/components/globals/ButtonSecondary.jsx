// classNameColor = "bg-accent";
import React from "react";
import Button from "./Button";

export default function ButtonSecondary(props) {
  const { className } = props;

  return (
    <Button
      className={className ? "hover:bg-black " + className : "hover:bg-black"}
      classNameColor={"bg-dark"}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.children}
    </Button>
  );
}
