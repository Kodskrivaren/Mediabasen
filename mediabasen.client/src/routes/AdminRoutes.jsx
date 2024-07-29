import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AdminPage = lazy(() => import("../components/pages/Admin/AdminPage"));

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Suspense>
            <AdminPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
