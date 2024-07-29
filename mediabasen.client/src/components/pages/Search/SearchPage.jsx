import React from "react";
import { useParams } from "react-router-dom";

export default function SearchPage() {
  const params = useParams();

  console.log(params);

  return (
    <section>
      <h2>Sök produkter</h2>
    </section>
  );
}
