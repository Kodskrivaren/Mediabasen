import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const DetailPage = lazy(() => import("../components/pages/Detail/DetailPage"));

export default function DetailRoutes() {
  return (
    <Routes>
      <Route
        path="/detail/*"
        element={
          <Suspense>
            <DetailPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
