import React, { useEffect } from "react";
import Modal from "../../globals/Modal";
import Input from "../../globals/Input";
import nameService from "../../../services/nameService";
import ButtonPrimary from "../../globals/ButtonPrimary";
import ButtonSecondary from "../../globals/ButtonSecondary";

export default function AddNameModal({
  setNameSearch,
  preventNameSearch,
  nameNotFound,
  setNameNotFound,
  setNameId,
  setName,
}) {
  async function addName(setSearchState, preventSearch) {
    const result = await nameService.addName(nameNotFound);

    setSearchState(result.name.fullname);
    setNameNotFound(undefined);
    preventSearch(true);
    if (setNameId) {
      setNameId(result.name.id);
    }
    if (setName) {
      setName(result.name);
    }
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
      <h3 className="text-center text-2xl">Inget namn hittades!</h3>
      <p>Vill du lägga till namnet?</p>
      <Input
        state={nameNotFound}
        setState={setNameNotFound}
        className={"text-black"}
      />
      <div className="flex flex-row justify-between">
        <ButtonSecondary
          className="bg-middle"
          onClick={() => setNameNotFound(undefined)}>
          Avbryt
        </ButtonSecondary>
        <ButtonPrimary
          onClick={() => addName(setNameSearch, preventNameSearch)}>
          Lägg Till
        </ButtonPrimary>
      </div>
    </Modal>
  );
}
