import React, { useEffect } from "react";
import Modal from "../../globals/Modal";
import Input from "../../globals/Input";
import Button from "../../globals/Button";
import genreService from "../../../services/genreService";

export default function AddGenreModal({
  setNameSearch,
  preventNameSearch,
  nameNotFound,
  setNameNotFound,
}) {
  async function addGenre(setSearchState, preventSearch) {
    const result = await genreService.addGenre(nameNotFound);

    setSearchState(result.name.name);
    setNameNotFound(undefined);
    preventSearch(true);
  }

  useEffect(() => {
    const nameSplit = nameNotFound.split(" ");

    const newName = nameSplit
      .map((part) => {
        const firstChar = part[0].toUpperCase();

        const rest = part.substring(1, part.length).toLowerCase();

        return firstChar + rest;
      })
      .join(" ");

    setNameNotFound(newName);
  }, []);

  return (
    <Modal setClose={setNameNotFound} closeValue={undefined}>
      <h3 className="text-center text-2xl">Ingen genre hittades!</h3>
      <p>Vill du lägga till genren?</p>
      <Input
        state={nameNotFound}
        setState={setNameNotFound}
        classNames={"text-black"}
      />
      <div className="flex flex-row justify-between">
        <Button
          classNameColor="bg-accent"
          onClick={() => addGenre(setNameSearch, preventNameSearch)}>
          Lägg Till
        </Button>
        <Button
          classNameColor="bg-red-500"
          onClick={() => setNameNotFound(undefined)}>
          Avbryt
        </Button>
      </div>
    </Modal>
  );
}
