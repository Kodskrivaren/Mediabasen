import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadPage from "../components/pages/LoadPage";
import PlacedOrder from "../components/pages/Order/PlacedOrder";

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
const AboutUs = lazy(() => import("../components/pages/AboutUs"));
const Contact = lazy(() => import("../components/pages/Contact"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={<LoadPage />}>
            <LandingPage />
          </Suspense>
        }
      />
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<LoadPage />}>
            <AdminPage />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<LoadPage />}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<LoadPage />}>
            <RegisterPage />
          </Suspense>
        }
      />
      <Route
        path="/detail/*"
        element={
          <Suspense fallback={<LoadPage />}>
            <DetailPage />
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense fallback={<LoadPage />}>
            <CartPage />
          </Suspense>
        }
      />
      <Route
        path="/user/*"
        element={
          <Suspense fallback={<LoadPage />}>
            <UserPage />
          </Suspense>
        }
      />
      <Route
        path="/search"
        element={
          <Suspense fallback={<LoadPage />}>
            <SearchPage />
          </Suspense>
        }
      />
      <Route
        path="/aboutus"
        element={
          <Suspense fallback={<LoadPage />}>
            <AboutUs />
          </Suspense>
        }
      />
      <Route
        path="/contact"
        element={
          <Suspense fallback={<LoadPage />}>
            <Contact />
          </Suspense>
        }
      />
      <Route
        path="/order"
        element={
          <Suspense fallback={<LoadPage />}>
            <PlacedOrder />
          </Suspense>
        }
      />
    </Routes>
  );
}
