import React, { useState } from "react";
import Input from "../../globals/Input";
import Textarea from "../../globals/Textarea";
import useSearchHook from "../../../hooks/useSearchHook";
import AddNameModal from "./AddNameModal";
import NameList from "./NameList";
import AddedList from "./AddedList";
import Button from "../../globals/Button";
import movieService from "../../../services/movieService";
import Modal from "../../globals/Modal";
import nameService from "../../../services/nameService";
import genreService from "../../../services/genreService";
import AddGenreModal from "./AddGenreModal";

export default function AddMovie() {
  const [nameNotFound, setNameNotFound] = useState(undefined);
  const [genreNotFound, setGenreNotFound] = useState(undefined);
  const [directorId, setDirectorId] = useState(undefined);
  const [discount, setDiscount] = useState(0);
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
    setNotFound: setNameNotFound,
    searchFunction: nameService.findNames,
  });

  const {
    search: actorNameSearch,
    setSearch: setActorNameSearch,
    setPreventSearch: preventActorSearch,
    searchResult: actorNameSearchResult,
    setSearchResult: setActorNameSearchResult,
  } = useSearchHook({
    setNotFound: setNameNotFound,
    searchFunction: nameService.findNames,
  });

  const {
    search: genreSearch,
    setSearch: setGenreSearch,
    setPreventSearch: preventGenreSearch,
    searchResult: genreSearchResult,
    setSearchResult: setGenreSearchResult,
  } = useSearchHook({
    setNotFound: setGenreNotFound,
    searchFunction: genreService.findGenres,
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

  function onGenreClick(clickedName) {
    const foundName = selectedActors.find((name) => name.id === clickedName.id);
    if (foundName !== undefined) return;
    setGenreSearch("");
    setGenreSearchResult([]);
    setSelectedGenres([...selectedGenres, clickedName]);
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
          keyPrefix="actors"
        />
        <label className="text-white">Genrer:</label>
        <Input
          placeholder={"Sök på genrer..."}
          state={genreSearch}
          setState={setGenreSearch}
        />
        {genreSearchResult.length !== 0 && (
          <NameList
            nameSearchResult={genreSearchResult}
            onNameClick={onGenreClick}
            listKeyPrefix="genre"
            nameProp="name"
          />
        )}
        <AddedList
          title="Tillagda genrer"
          nothingAddedText="Inga genrer är tillagda!"
          entityDisplayProperty="name"
          list={selectedGenres}
          setList={setSelectedGenres}
          keyPrefix="genres"
        />
        <label className="text-white">Bilder</label>
        <input className="text-white" type="file" onChange={onFileChange} />
        <AddedList
          title={"Tillagda bilder"}
          nothingAddedText="Inga bilder är tillagda!"
          entityDisplayProperty="name"
          list={imageFiles}
          setList={setImageFiles}
          keyPrefix="images"
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
      {genreSearchResult.length === 0 && genreNotFound && (
        <AddGenreModal
          {...{
            setNameSearch: setGenreSearch,
            preventNameSearch: preventGenreSearch,
            nameNotFound: genreNotFound,
            setNameNotFound: setGenreNotFound,
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
