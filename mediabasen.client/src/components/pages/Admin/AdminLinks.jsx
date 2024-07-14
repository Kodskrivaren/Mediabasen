import React from "react";
import { Link } from "react-router-dom";

export default function AdminLinks() {
  return (
    <ul>
      <li>
        <Link className="text-accent" to={"/admin/addmovie"}>
          Lägg till film
        </Link>
      </li>
      <li>
        <Link className="text-accent" to={"/admin/addmusic"}>
          Lägg till musik
        </Link>
      </li>
    </ul>
  );
}
