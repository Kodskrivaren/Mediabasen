import React from "react";
import Modal from "../../globals/Modal";
import Input from "../../globals/Input";
import genreService from "../../../services/genreService";
import useCapitalizeFirstCharHook from "../../../hooks/capitalizeFirstCharHook";
import ButtonPrimary from "../../globals/ButtonPrimary";
import ButtonSecondary from "../../globals/ButtonSecondary";

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
        <ButtonPrimary
          onClick={() => addGenre(setNameSearch, preventNameSearch)}>
          Lägg Till
        </ButtonPrimary>
        <ButtonSecondary onClick={() => setNameNotFound(undefined)}>
          Avbryt
        </ButtonSecondary>
      </div>
    </Modal>
  );
}
