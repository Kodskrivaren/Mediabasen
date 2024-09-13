import React, { useState } from "react";
import UserOrderTop from "./UserOrderTop";
import UserOrderBottom from "./UserOrderBottom";

export default function UserOrder({ order }) {
  const [extended, setExtended] = useState(false);

  return (
    <li className="bg-dark rounded mb-3">
      <UserOrderTop {...{ order, extended, setExtended }} />
      <UserOrderBottom {...{ order, extended }} />
    </li>
  );
}
