import React from "react";
import Link from "../globals/Link";

export default function AboutUs() {
  return (
    <section className="text-white flex flex-col gap-y-2 p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl text-center font-bold">Om oss</h2>
      <p className="text-lg">
        Detta är inte en riktig webshop. Detta är en sida som skapats av Filip
        för att kunna demonstrera sina färdigheter i React och ASP .NET Core.
      </p>
      <p className="text-lg">
        Kolla gärna runt på sidan och leta produkter och testa olika funktioner
        som att t.ex lägga saker i varukorgen och lägga en beställning. Du
        kommer inte bli debiterad för någon order eller bli betalningsskyldig.
      </p>
      <p className="text-lg">
        Källkoden till frontend och backend kan du ta del av på denna länk:{" "}
        <Link
          to={"https://github.com/Kodskrivaren/Mediabasen"}
          target="_blank"
          rel="noopener noreferrer">
          Mediabasen
        </Link>
      </p>
    </section>
  );
}
