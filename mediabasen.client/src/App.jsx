import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/globals/Footer";
import Header from "./components/globals/Header";
const LandingPage = lazy(() => import("./components/pages/LandingPage"));
const AdminPage = lazy(() => import("./components/pages/Admin/AdminPage"));
const LoginPage = lazy(() => import("./components/pages/Auth/LoginPage"));
const RegisterPage = lazy(() => import("./components/pages/Auth/RegisterPage"));
const UserPage = lazy(() => import("./components/pages/User/UserPage"));
const DetailPage = lazy(() => import("./components/pages/Detail/DetailPage"));
const CartPage = lazy(() => import("./components/pages/Cart/CartPage"));
import UserContext from "./contexts/UserContext";
import userService from "./services/userService";
import CartContext from "./contexts/CartContext";
import NotifyContext from "./contexts/NotifyContext";
import Notification from "./components/globals/Notification";

function App() {
  const [user, setUser] = useState();
  const [cart, setCart] = useState();
  const [note, setNote] = useState();

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
    <NotifyContext.Provider value={{ note, setNote }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Header />
            {note && <Notification />}
            <main className="flex-grow">
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
                  path="/cart"
                  element={
                    <Suspense>
                      <CartPage />
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
      </CartContext.Provider>
    </NotifyContext.Provider>
  );
}

export default App;
