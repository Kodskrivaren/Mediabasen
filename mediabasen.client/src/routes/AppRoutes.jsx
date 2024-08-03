import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const SearchPage = lazy(() => import("../components/pages/Search/SearchPage"));
const LandingPage = lazy(() => import("../components/pages/LandingPage"));
const UserPage = lazy(() => import("../components/pages/User/UserPage"));
const DetailPage = lazy(() => import("../components/pages/Detail/DetailPage"));
const CartPage = lazy(() => import("../components/pages/Cart/CartPage"));
const LoginPage = lazy(() => import(".././components/pages/Auth/LoginPage"));
const RegisterPage = lazy(() =>
  import(".././components/pages/Auth/RegisterPage")
);
const AdminPage = lazy(() => import("../components/pages/Admin/AdminPage"));

export default function AppRoutes() {
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
      <Route
        path="/admin/*"
        element={
          <Suspense>
            <AdminPage />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense>
            <RegisterPage />
          </Suspense>
        }
      />
      <Route
        path="/detail/*"
        element={
          <Suspense>
            <DetailPage />
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense>
            <CartPage />
          </Suspense>
        }
      />
      <Route
        path="/user/*"
        element={
          <Suspense>
            <UserPage />
          </Suspense>
        }
      />
      <Route
        path="/search"
        element={
          <Suspense>
            <SearchPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
