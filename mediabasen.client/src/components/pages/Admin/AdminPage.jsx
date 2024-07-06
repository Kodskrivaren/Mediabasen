import React from "react";
import { Routes, Route } from "react-router-dom";
import AddMovie from "./AddMovie";

export default function AdminPage() {
  return (
    <section className="p-3">
      <h2 className="text-white font-bold text-lg">Admin Sida</h2>
      <Routes>
        <Route path="/addmovie" element={<AddMovie />} />
      </Routes>
    </section>
  );
}
