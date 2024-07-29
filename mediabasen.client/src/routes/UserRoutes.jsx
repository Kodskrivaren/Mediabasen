import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const UserPage = lazy(() => import("../components/pages/User/UserPage"));

export default function UserRoutes() {
  return (
    <Routes>
      <Route
        path="/user/*"
        element={
          <Suspense>
            <UserPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
