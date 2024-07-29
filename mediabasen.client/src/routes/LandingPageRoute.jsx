import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const LandingPage = lazy(() => import("../components/pages/LandingPage"));

export default function LandingPageRoute() {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense>
            <LandingPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
