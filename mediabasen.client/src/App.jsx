import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/globals/Footer";
import Header from "./components/globals/Header";
import LandingPage from "./components/pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route index element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
