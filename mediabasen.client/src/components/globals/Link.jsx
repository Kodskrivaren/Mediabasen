import React from "react";
import { Link as RLink } from "react-router-dom";

export default function Link({ className, target, rel, to, children }) {
  return (
    <RLink
      to={to}
      target={target}
      rel={rel}
      className={`text-accent${className ? ` ${className}` : ""}`}>
      {children}
    </RLink>
  );
}
