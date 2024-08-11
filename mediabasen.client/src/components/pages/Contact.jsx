import React from "react";
import Link from "../globals/Link";

export default function Contact() {
  return (
    <section className="text-white max-w-3xl flex flex-col gap-y-2 p-8 mx-auto">
      <h2 className="text-center text-2xl font-bold">Kontakt</h2>
      <ul>
        <li>
          <p>Filip Blomqvist</p>
        </li>
        <li>
          <Link to={"mailto:filip.blomqvist.fkb@hotmail.com"}>
            filip.blomqvist.fkb@hotmail.com
          </Link>
        </li>
      </ul>
    </section>
  );
}
