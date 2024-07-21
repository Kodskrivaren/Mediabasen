import React, { useState, useEffect } from "react";
import movieService from "../../../../services/movieService";
import EditBaseForm from "./EditBaseForm";
import Button from "../../../globals/Button";
import useBasicEditPropsHook from "../../../../hooks/useBasicEditPropsHook";
import nameService from "../../../../services/nameService";
import useSearchHook from "../../../../hooks/useSearchHook";
import Input from "../../../globals/Input";
import NameList from "../NameList";
import Modal from "../../../globals/Modal";
import AddNameModal from "../AddNameModal";
import AddedList from "../AddedList";

export default function EditMovie({ product }) {
  const [directorNotFound, setDirectorNotFound] = useState(undefined);
  const [directorId, setDirectorId] = useState(0);

  const [selectedActors, setSelectedActors] = useState([]);
  const [actorNotFound, setActorNotFound] = useState(undefined);

  const [result, setResult] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState();
  const [imageFiles, setImageFiles] = useState([]);

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

  async function onSaveChangesClick() {
    const updatedProduct = { Id: product.id };

    updatedProduct.Name = name;
    updatedProduct.Description = description;
    updatedProduct.Price = price;
    updatedProduct.Discount = discount;
    updatedProduct.ReleaseDate = releaseDate;
    updatedProduct.Images = imageFiles;
    updatedProduct.FormatId = selectedFormat.id;
    updatedProduct.GenreIds = selectedGenres;

    updatedProduct.DirectorId = directorId;
    updatedProduct.ActorIds = selectedActors;

    const data = await movieService.updateMovie(updatedProduct);

    setResult(data);
  }

  useBasicEditPropsHook({
    product,
    setImageFiles,
    setSelectedGenres,
    setName,
    setDescription,
    setPrice,
    setDiscount,
    setReleaseDate,
    setSelectedFormat,
  });

  useEffect(() => {
    if (!product) return;
    setDirectorId(product.directorNameId);
    setDirectorNameSearch(product.director.fullname);
    preventDirectorSearch(true);

    setSelectedActors(product.actors || []);
  }, [product]);

  function onNameClick(
    name,
    setNameState,
    setNameId,
    preventSearch,
    setNameSearchResult
  ) {
    setNameState(name.fullname);
    setNameId(name.id);
    preventSearch(true);
    setNameSearchResult([]);
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
      <h2 className="text-white">Redigera produkt - Musik</h2>
      {product && (
        <>
          <EditBaseForm
            {...{
              name,
              setName,
              description,
              setDescription,
              price,
              setPrice,
              discount,
              setDiscount,
              releaseDate,
              setReleaseDate,
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
                onNameClick(
                  name,
                  setDirectorNameSearch,
                  setDirectorId,
                  preventDirectorSearch,
                  setDirectorNameSearchResult
                )
              }
              listKeyPrefix="author"
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
          <Button
            classNameColor="bg-accent"
            className="w-fit"
            onClick={onSaveChangesClick}>
            Spara ändringar
          </Button>
        </>
      )}
      {directorNameSearchResult.length === 0 && directorNotFound && (
        <AddNameModal
          {...{
            setNameSearch: setDirectorNameSearch,
            preventNameSearch: preventDirectorSearch,
            nameNotFound: directorNotFound,
            setNameNotFound: setDirectorNotFound,
            setNameId: setDirectorId,
          }}
        />
      )}
      {actorNameSearchResult.length === 0 && actorNotFound && (
        <AddNameModal
          {...{
            setNameSearch: setActorNameSearch,
            preventNameSearch: preventActorSearch,
            nameNotFound: actorNotFound,
            setNameNotFound: setActorNotFound,
            setName: (name) => setSelectedActors((old) => [...old, name]),
          }}
        />
      )}
      {result && (
        <Modal setClose={setResult} closeValue={undefined}>
          Ändringarna har sparats!
        </Modal>
      )}
    </>
  );
}
