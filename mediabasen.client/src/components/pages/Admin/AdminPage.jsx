import React from "react";
import { Routes, Route } from "react-router-dom";
import AddMovie from "./AddMovie";
import AdminLinks from "./AdminLinks";
import AddMusic from "./AddMusic";
import AddGame from "./AddGame";
import AddBook from "./AddBook";
import SearchEdit from "./Edit/SearchEdit";
import EditPage from "./Edit/EditPage";
import UploadProducts from "./UploadProducts";

export default function AdminPage() {
  return (
    <section className="p-3">
      <h2 className="text-white font-bold text-lg">Admin Sida</h2>
      <Routes>
        <Route path="/" element={<AdminLinks />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/addmusic" element={<AddMusic />} />
        <Route path="/addgame" element={<AddGame />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/searchedit" element={<SearchEdit />} />
        <Route path="/edit/*" element={<EditPage />} />
        <Route path="/uploadproducts" element={<UploadProducts />} />
      </Routes>
    </section>
  );
}
