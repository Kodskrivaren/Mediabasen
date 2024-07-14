import React, { useState } from "react";
import Textarea from "../../globals/Textarea";
import Input from "../../globals/Input";
import useSearchHook from "../../../hooks/useSearchHook";
import genreService from "../../../services/genreService";
import AddGenreModal from "./AddGenreModal";
import AddedList from "./AddedList";
import formatService from "../../../services/formatService";
import AddFormatModal from "./AddFormatModal";
import NameList from "./NameList";

export default function AddBaseForm({
  selectedGenres,
  setSelectedGenres,
  imageFiles,
  setImageFiles,
  selectedFormat,
  setSelectedFormat,
}) {
  const [discount, setDiscount] = useState(0);
  const [genreNotFound, setGenreNotFound] = useState(undefined);
  const [formatNotFound, setFormatNotFound] = useState(undefined);

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

  const {
    search: formatSearch,
    setSearch: setFormatSearch,
    setPreventSearch: preventFormatSearch,
    searchResult: formatSearchResult,
    setSearchResult: setFormatSearchResult,
  } = useSearchHook({
    setNotFound: setFormatNotFound,
    searchFunction: formatService.findFormats,
  });

  function onGenreClick(clickedName) {
    const foundName = selectedGenres.find((name) => name.id === clickedName.id);
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

  function onFormatClick(clickedName) {
    setFormatSearch("");
    setFormatSearchResult([]);
    setSelectedFormat(clickedName);
  }

  return (
    <>
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
      <label className="text-white">Utgivet:</label>
      <Input name="ReleaseDate" type="date" />
      <label className="text-white">
        Format: {selectedFormat ? selectedFormat.name : "Inget format valt!"}
      </label>
      <Input
        placeholder={"Sök på format..."}
        state={formatSearch}
        setState={setFormatSearch}
      />
      {formatSearchResult.length !== 0 && (
        <NameList
          nameSearchResult={formatSearchResult}
          onNameClick={onFormatClick}
          listKeyPrefix="format"
          nameProp="name"
        />
      )}
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
      {genreSearchResult.length === 0 && genreNotFound && (
        <AddGenreModal
          {...{
            setNameSearch: setGenreSearch,
            preventNameSearch: preventGenreSearch,
            nameNotFound: genreNotFound,
            setNameNotFound: setGenreNotFound,
            setSelectedGenres: setSelectedGenres,
          }}
        />
      )}
      {formatSearchResult.length === 0 && formatNotFound && (
        <AddFormatModal
          {...{
            setNameSearch: setFormatSearch,
            preventNameSearch: preventFormatSearch,
            nameNotFound: formatNotFound,
            setNameNotFound: setFormatNotFound,
            setSelectedFormat: setSelectedFormat,
          }}
        />
      )}
    </>
  );
}
