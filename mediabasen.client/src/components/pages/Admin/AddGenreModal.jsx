import React from "react";
import Modal from "../../globals/Modal";
import Input from "../../globals/Input";
import Button from "../../globals/Button";
import genreService from "../../../services/genreService";
import useCapitalizeFirstCharHook from "../../../hooks/capitalizeFirstCharHook";

export default function AddGenreModal({
  setNameSearch,
  preventNameSearch,
  nameNotFound,
  setNameNotFound,
  setSelectedGenres,
}) {
  async function addGenre(setSearchState, preventSearch) {
    const result = await genreService.addGenre(nameNotFound);

    setSearchState(result.name);
    setSelectedGenres((oldValues) => [...oldValues, result.data]);
    setNameNotFound(undefined);
    preventSearch(true);
  }

  useCapitalizeFirstCharHook({ name: nameNotFound, setName: setNameNotFound });

  return (
    <Modal setClose={setNameNotFound} closeValue={undefined}>
      <h3 className="text-center text-2xl">Ingen genre hittades!</h3>
      <p>Vill du lägga till genren?</p>
      <Input
        state={nameNotFound}
        setState={setNameNotFound}
        className={"text-black"}
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
