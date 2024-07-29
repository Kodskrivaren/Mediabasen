import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import(".././components/pages/Auth/LoginPage"));
const RegisterPage = lazy(() =>
  import(".././components/pages/Auth/RegisterPage")
);

export default function AuthRoutes() {
  return (
    <Routes>
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
    </Routes>
  );
}
