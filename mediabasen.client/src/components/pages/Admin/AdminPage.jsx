import React from "react";
import { Routes, Route } from "react-router-dom";
import AddMovie from "./AddMovie";
import AdminLinks from "./AdminLinks";
import AddMusic from "./AddMusic";

export default function AdminPage() {
  return (
    <section className="p-3">
      <h2 className="text-white font-bold text-lg">Admin Sida</h2>
      <Routes>
        <Route path="/" element={<AdminLinks />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/addmusic" element={<AddMusic />} />
      </Routes>
    </section>
  );
}
