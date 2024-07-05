import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/globals/Footer";
import Header from "./components/globals/Header";
import LandingPage from "./components/pages/LandingPage";
import AdminPage from "./components/pages/Admin/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
