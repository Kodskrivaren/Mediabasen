import React, { useState } from "react";
import Button from "../../globals/Button";
import productService from "../../../services/productService";

export default function UploadProducts() {
  const [file, setFile] = useState();
  const [serverMessage, setServerMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setServerMessage("");
    const response = await productService.uploadProducts(file);

    if (response) {
      setServerMessage("Klart!");
    } else {
      setServerMessage("Något gick fel...");
    }
  }

  function onFileChange(e) {
    setFile(e.target.files[0]);
  }

  return (
    <form className="text-white flex flex-col gap-y-3" onSubmit={onSubmit}>
      <h3>Ladda upp produkter</h3>
      <input type="file" onChange={onFileChange} />
      <Button type="submit" disabled={file === undefined}>
        Ladda upp
      </Button>
      <p>{serverMessage}</p>
    </form>
  );
}
