import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const CartPage = lazy(() => import("../components/pages/Cart/CartPage"));

export default function CartRoute() {
  return (
    <Routes>
      <Route
        path="/cart"
        element={
          <Suspense>
            <CartPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
