import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/globals/Footer";
import Header from "./components/globals/Header";
import UserContext from "./contexts/UserContext";
import userService from "./services/userService";
import CartContext from "./contexts/CartContext";
import NotifyContext from "./contexts/NotifyContext";
import Notification from "./components/globals/Notification";
import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import LandingPageRoute from "./routes/LandingPageRoute";
import DetailRoutes from "./routes/DetailRoutes";
import CartRoute from "./routes/CartRoute";

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
            <main className="flex-grow w-full mx-auto max-w-7xl">
              <AuthRoutes />
              <AdminRoutes />
              <LandingPageRoute />
              <DetailRoutes />
              <CartRoute />
            </main>
            <Footer />
          </BrowserRouter>
        </UserContext.Provider>
      </CartContext.Provider>
    </NotifyContext.Provider>
  );
}

export default App;
