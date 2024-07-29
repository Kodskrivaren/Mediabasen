import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const SearchPage = lazy(() => import("../components/pages/Search/SearchPage"));

export default function SearchRoute() {
  return (
    <Routes>
      <Route
        path="/search"
        element={
          <Suspense>
            <SearchPage />
          </Suspense>
        }></Route>
    </Routes>
  );
}
