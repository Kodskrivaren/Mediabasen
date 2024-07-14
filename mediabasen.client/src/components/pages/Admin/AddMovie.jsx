import React, { useState } from "react";
import Input from "../../globals/Input";
import useSearchHook from "../../../hooks/useSearchHook";
import AddNameModal from "./AddNameModal";
import NameList from "./NameList";
import AddedList from "./AddedList";
import Button from "../../globals/Button";
import movieService from "../../../services/movieService";
import Modal from "../../globals/Modal";
import nameService from "../../../services/nameService";
import AddBaseForm from "./AddBaseForm";

export default function AddMovie() {
  const [directorNotFound, setDirectorNotFound] = useState(undefined);
  const [actorNotFound, setActorNotFound] = useState(undefined);
  const [directorId, setDirectorId] = useState(undefined);
  const [selectedFormat, setSelectedFormat] = useState(undefined);
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [result, setResult] = useState();

  const {
    search: directorNameSearch,
    setSearch: setDirectorNameSearch,
    setPreventSearch: preventDirectorSearch,
    searchResult: directorNameSearchResult,
    setSearchResult: setDirectorNameSearchResult,
  } = useSearchHook({
    setNotFound: setDirectorNotFound,
    searchFunction: nameService.findNames,
  });

  const {
    search: actorNameSearch,
    setSearch: setActorNameSearch,
    setPreventSearch: preventActorSearch,
    searchResult: actorNameSearchResult,
    setSearchResult: setActorNameSearchResult,
  } = useSearchHook({
    setNotFound: setActorNotFound,
    searchFunction: nameService.findNames,
  });

  async function postMovie(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const objectValues = Object.fromEntries(formData);

    objectValues.DirectorId = directorId;
    objectValues.Id = 0;
    objectValues.ActorIds = selectedActors;
    objectValues.Images = imageFiles;
    objectValues.GenreIds = selectedGenres;
    objectValues.FormatId = selectedFormat.id;

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

  return (
    <>
      <h2 className="text-white">Lägg till film</h2>
      <form className="flex flex-col gap-3 max-w-96" onSubmit={postMovie}>
        <AddBaseForm
          {...{
            selectedGenres,
            setSelectedGenres,
            imageFiles,
            setImageFiles,
            selectedFormat,
            setSelectedFormat,
          }}
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
          keyPrefix="actors"
        />
        <Button classNameColor="bg-accent" className="w-fit" type="submit">
          Lägg till film
        </Button>
      </form>
      {actorNameSearchResult.length === 0 && actorNotFound && (
        <AddNameModal
          {...{
            setNameSearch: setActorNameSearch,
            preventNameSearch: preventActorSearch,
            nameNotFound: actorNotFound,
            setNameNotFound: setActorNotFound,
          }}
        />
      )}
      {directorNameSearchResult.length === 0 && directorNotFound && (
        <AddNameModal
          {...{
            setNameSearch: setDirectorNameSearch,
            preventNameSearch: preventDirectorSearch,
            nameNotFound: directorNotFound,
            setNameNotFound: setDirectorNotFound,
          }}
        />
      )}
      {result && (
        <Modal setClose={setResult} closeValue={undefined}>
          Filmen har lagts till!
        </Modal>
      )}
    </>
  );
}
