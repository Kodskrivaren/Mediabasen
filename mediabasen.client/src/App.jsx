import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/globals/Footer";
import Header from "./components/globals/Header";
const LandingPage = lazy(() => import("./components/pages/LandingPage"));
const AdminPage = lazy(() => import("./components/pages/Admin/AdminPage"));
const LoginPage = lazy(() => import("./components/pages/Auth/LoginPage"));
const RegisterPage = lazy(() => import("./components/pages/Auth/RegisterPage"));
const UserPage = lazy(() => import("./components/pages/User/UserPage"));
import UserContext from "./contexts/UserContext";
import userService from "./services/userService";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    async function tryGetUserDetails() {
      const result = await userService.getUserDetails();

      if (result) {
        setUser(result);
      }
    }

    tryGetUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route index element={<LandingPage />} />
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
              path="/user/*"
              element={
                <Suspense>
                  <UserPage />
                </Suspense>
              }
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
