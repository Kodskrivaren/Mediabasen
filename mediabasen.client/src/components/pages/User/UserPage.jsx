import React, { lazy, useContext, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import { Routes, Route } from "react-router-dom";
import UserIndex from "./UserIndex";
import LoadPage from "../LoadPage";

const UserOrders = lazy(() => import("./UserOrders"));
const UserDetails = lazy(() => import("./UserDetails"));

export default function UserPage() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userContext.user) {
      navigate("/login");
    }
  }, [userContext]);

  return (
    <section className="text-white relative p-3 gap-y-4 flex flex-col">
      <Routes>
        <Route index element={<UserIndex />} />
        <Route
          path="orders"
          element={
            <Suspense fallback={<LoadPage />}>
              <UserOrders />
            </Suspense>
          }
        />
        <Route
          path="details"
          element={
            <Suspense fallback={<LoadPage />}>
              <UserDetails />
            </Suspense>
          }
        />
      </Routes>
    </section>
  );
}
