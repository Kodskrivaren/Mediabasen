import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import { Routes, Route } from "react-router-dom";
import UserIndex from "./UserIndex";
import UserOrders from "./UserOrders";

export default function UserPage() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userContext.user) {
      navigate("/login");
    }
  }, [userContext]);

  return (
    <section className="text-white p-3">
      <Routes>
        <Route index element={<UserIndex />} />
        <Route path="orders" element={<UserOrders />} />
      </Routes>
    </section>
  );
}
