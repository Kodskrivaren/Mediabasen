import React from "react";
import Button from "./Button";

export default function ButtonPrimary(props) {
  const { className } = props;

  return (
    <Button
      className={className ? "hover:bg-light " + className : "hover:bg-light"}
      classNameColor={"bg-accent"}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.children}
    </Button>
  );
}
