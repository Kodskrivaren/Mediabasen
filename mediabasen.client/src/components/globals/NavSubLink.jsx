import React from "react";
import { Link } from "react-router-dom";

export default function NavSubLink({ isMobile }) {
  return (
    <li className={`p-2 w-28 ${isMobile ? "" : "border-t-2"}`}>
      <Link className="flex justify-between">
        <p>Action</p> <p>&#x27A2;</p>
      </Link>
    </li>
  );
}
