import React, { useState } from "react";
import Input from "../../globals/Input";
import Textarea from "../../globals/Textarea";
import useNameSearchHook from "../../../hooks/useNameSearchHook";
import AddNameModal from "./AddNameModal";
import NameList from "./NameList";
import AddedList from "./AddedList";
import Button from "../../globals/Button";
import movieService from "../../../services/movieService";
import Modal from "../../globals/Modal";

export default function AddMovie() {
  const [nameNotFound, setNameNotFound] = useState(undefined);
  const [directorId, setDirectorId] = useState(undefined);
  const [discount, setDiscount] = useState(0);
  const [selectedActors, setSelectedActors] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [result, setResult] = useState();

  const {
    search: directorNameSearch,
    setSearch: setDirectorNameSearch,
    setPreventSearch: preventDirectorSearch,
    searchResult: directorNameSearchResult,
    setSearchResult: setDirectorNameSearchResult,
  } = useNameSearchHook({
    setNotFound: setNameNotFound,
  });

  const {
    search: actorNameSearch,
    setSearch: setActorNameSearch,
    setPreventSearch: preventActorSearch,
    searchResult: actorNameSearchResult,
    setSearchResult: setActorNameSearchResult,
  } = useNameSearchHook({
    setNotFound: setNameNotFound,
  });

  async function postMovie(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const objectValues = Object.fromEntries(formData);

    objectValues.DirectorId = directorId;
    objectValues.Id = 0;
    objectValues.ActorIds = selectedActors;
    objectValues.Images = imageFiles;

    const result = await movieService.addMovie(objectValues);

    if (result) {
      setResult(result);
    }
  }

  function onDirectorNameClick(name, setNameState, preventSearch) {
    setNameState(name.fullname);
    setDirectorId(name.id);
    preventSearch(true);
    setDirectorNameSearchResult([]);
  }

  function onActorNameClick(clickedName) {
    const foundName = selectedActors.find((name) => name.id === clickedName.id);
    if (foundName !== undefined) return;
    setActorNameSearch("");
    setActorNameSearchResult([]);
    setSelectedActors([...selectedActors, clickedName]);
  }

  function onFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFiles([...imageFiles, file]);
  }

  return (
    <>
      <h2 className="text-white">Lägg till film</h2>
      <form className="flex flex-col gap-3 max-w-96" onSubmit={postMovie}>
        <Input name="Name" placeholder="Namn..." />
        <Textarea name="Description" placeholder="Beskrivning..." />
        <Input name="Price" placeholder="Pris..." />
        <label className="text-white">Rea {discount}%</label>
        <input
          name="Discount"
          type="range"
          min={0}
          max={100}
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <label className="text-white">Regissör</label>
        <Input
          placeholder={"Sök på namn..."}
          state={directorNameSearch}
          setState={setDirectorNameSearch}
        />
        {directorNameSearchResult.length !== 0 && (
          <NameList
            nameSearchResult={directorNameSearchResult}
            onNameClick={(name) =>
              onDirectorNameClick(
                name,
                setDirectorNameSearch,
                preventDirectorSearch
              )
            }
            listKeyPrefix="director"
          />
        )}
        <label className="text-white">Skådespelare</label>
        <Input
          placeholder={"Sök på namn..."}
          state={actorNameSearch}
          setState={setActorNameSearch}
        />
        {actorNameSearchResult.length !== 0 && (
          <NameList
            nameSearchResult={actorNameSearchResult}
            onNameClick={onActorNameClick}
            listKeyPrefix="actor"
          />
        )}
        <AddedList
          title="Tillagda skådespelare"
          nothingAddedText="Inga skådespelare är tillagda!"
          entityDisplayProperty="fullname"
          list={selectedActors}
          setList={setSelectedActors}
        />
        <label className="text-white">Bilder</label>
        <input className="text-white" type="file" onChange={onFileChange} />
        <AddedList
          title={"Tillagda bilder"}
          nothingAddedText="Inga bilder är tillagda!"
          entityDisplayProperty="name"
          list={imageFiles}
          setList={setImageFiles}
        />
        <Button classNameColor="bg-accent" className="w-fit" type="submit">
          Lägg till film
        </Button>
      </form>
      {actorNameSearchResult.length === 0 && nameNotFound && (
        <AddNameModal
          {...{
            setNameSearch: setActorNameSearch,
            preventNameSearch: preventActorSearch,
            nameNotFound,
            setNameNotFound,
          }}
        />
      )}
      {result && (
        <Modal setClose={setResult} closeValue={undefined}>
          Movie added
        </Modal>
      )}
    </>
  );
}
