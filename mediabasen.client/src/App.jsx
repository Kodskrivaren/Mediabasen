import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/globals/Footer";
import Header from "./components/globals/Header";
import UserContext from "./contexts/UserContext";
import CartContext from "./contexts/CartContext";
import NotifyContext from "./contexts/NotifyContext";
import Notifications from "./components/globals/Notification";
import useGetUserDetailsHook from "./hooks/useGetUserDetailsHook";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [user, setUser] = useState();
  const [userLoaded, setUserLoaded] = useState(false);
  const [cart, setCart] = useState();
  const [notes, setNotes] = useState([]);

  function addNote(note) {
    setNotes([...notes, note]);
  }

  useGetUserDetailsHook(setUser, setUserLoaded);

  return (
    <NotifyContext.Provider value={{ notes, setNotes, addNote }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <UserContext.Provider
          value={{ user, setUser, userLoaded, setUserLoaded }}>
          <BrowserRouter>
            <Header />
            <Notifications />
            <main className="flex-grow w-full mx-auto max-w-7xl">
              <AppRoutes />
            </main>
            <Footer />
          </BrowserRouter>
        </UserContext.Provider>
      </CartContext.Provider>
    </NotifyContext.Provider>
  );
}

export default App;
