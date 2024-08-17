import React, { useState } from "react";
import Button from "../../globals/Button";
import productService from "../../../services/productService";
import LoadSpinner from "../../globals/LoadSpinner";

export default function UploadProducts() {
  const [file, setFile] = useState();
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setServerMessage("");
    setLoading(true);
    const response = await productService.uploadProducts(file);

    if (response) {
      setServerMessage("Klart!");
    } else {
      setServerMessage("Något gick fel...");
    }
    setLoading(false);
  }

  function onFileChange(e) {
    setFile(e.target.files[0]);
  }

  return (
    <form className="text-white flex flex-col gap-y-3" onSubmit={onSubmit}>
      <h3>Ladda upp produkter</h3>
      <input type="file" onChange={onFileChange} />
      <Button type="submit" disabled={file === undefined || loading}>
        {loading ? <LoadSpinner className={"mx-auto h-8 w-8"} /> : "Ladda upp"}
      </Button>
      <p>{serverMessage}</p>
    </form>
  );
}
