import React from "react";
import Modal from "../../globals/Modal";
import Input from "../../globals/Input";
import Button from "../../globals/Button";
import formatService from "../../../services/formatService";
import useCapitalizeFirstCharHook from "../../../hooks/capitalizeFirstCharHook";

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
        classNames={"text-black"}
      />
      <div className="flex flex-row justify-between">
        <Button
          classNameColor="bg-accent"
          onClick={() => addFormat(setNameSearch, preventNameSearch)}>
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
