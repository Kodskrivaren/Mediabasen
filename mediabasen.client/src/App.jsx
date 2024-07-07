import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/globals/Footer";
import Header from "./components/globals/Header";
import LandingPage from "./components/pages/LandingPage";
import AdminPage from "./components/pages/Admin/AdminPage";
import LoginPage from "./components/pages/User/LoginPage";
import UserContext from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
