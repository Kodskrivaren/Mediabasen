import React from "react";
import Modal from "../../globals/Modal";
import Input from "../../globals/Input";
import formatService from "../../../services/formatService";
import useCapitalizeFirstCharHook from "../../../hooks/capitalizeFirstCharHook";
import ButtonPrimary from "../../globals/ButtonPrimary";
import ButtonSecondary from "../../globals/ButtonSecondary";

export default function AddGenreModal({
  setNameSearch,
  preventNameSearch,
  nameNotFound,
  setNameNotFound,
  setSelectedFormat,
}) {
  async function addFormat(setSearchState, preventSearch) {
    const result = await formatService.addFormat(nameNotFound);
    setSearchState(result.data.name);
    setSelectedFormat(result.data);
    setNameNotFound(undefined);
    preventSearch(true);
  }

  useCapitalizeFirstCharHook({ name: nameNotFound, setName: setNameNotFound });

  return (
    <Modal setClose={setNameNotFound} closeValue={undefined}>
      <h3 className="text-center text-2xl">Inget format hittades!</h3>
      <p>Vill du lägga till formatet?</p>
      <Input
        state={nameNotFound}
        setState={setNameNotFound}
        className={"text-black"}
      />
      <div className="flex flex-row justify-between">
        <ButtonPrimary
          onClick={() => addFormat(setNameSearch, preventNameSearch)}>
          Lägg Till
        </ButtonPrimary>
        <ButtonSecondary onClick={() => setNameNotFound(undefined)}>
          Avbryt
        </ButtonSecondary>
      </div>
    </Modal>
  );
}
