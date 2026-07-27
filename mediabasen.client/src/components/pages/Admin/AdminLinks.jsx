import React from "react";
import { Link } from "react-router";

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
      <li>
        <Link className="text-accent" to={"/admin/addgame"}>
          Lägg till spel
        </Link>
      </li>
      <li>
        <Link className="text-accent" to={"/admin/addbook"}>
          Lägg till bok
        </Link>
      </li>
      <li>
        <Link className="text-accent" to={"/admin/searchedit"}>
          Redigera produkter
        </Link>
      </li>
      <li>
        <Link className="text-accent" to={"/admin/uploadproducts"}>
          Ladda upp produkter
        </Link>
      </li>
    </ul>
  );
}
