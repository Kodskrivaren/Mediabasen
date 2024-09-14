import React, { useState, useEffect } from "react";
import gameService from "../../../../services/gameService";
import EditBaseForm from "./EditBaseForm";
import useBasicEditPropsHook from "../../../../hooks/useBasicEditPropsHook";
import nameService from "../../../../services/nameService";
import useSearchHook from "../../../../hooks/useSearchHook";
import Input from "../../../globals/Input";
import NameList from "../NameList";
import Modal from "../../../globals/Modal";
import AddNameModal from "../AddNameModal";
import ButtonPrimary from "../../../globals/ButtonPrimary";

export default function EditGame({ product }) {
  const [developerNotFound, setDeveloperNotFound] = useState(undefined);
  const [publisherNotFound, setPublisherNotFound] = useState(undefined);
  const [result, setResult] = useState();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState();
  const [imageFiles, setImageFiles] = useState([]);
  const [developerId, setDeveloperId] = useState(0);
  const [publisherId, setPublisherId] = useState(0);

  const {
    search: developerNameSearch,
    setSearch: setDeveloperNameSearch,
    setPreventSearch: preventDeveloperSearch,
    searchResult: developerNameSearchResult,
    setSearchResult: setDeveloperNameSearchResult,
  } = useSearchHook({
    setNotFound: setDeveloperNotFound,
    searchFunction: nameService.findNames,
  });

  const {
    search: publisherNameSearch,
    setSearch: setPublisherNameSearch,
    setPreventSearch: preventPublisherSearch,
    searchResult: publisherNameSearchResult,
    setSearchResult: setPublisherNameSearchResult,
  } = useSearchHook({
    setNotFound: setPublisherNotFound,
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

    updatedProduct.DeveloperId = developerId;
    updatedProduct.PublisherId = publisherId;

    const data = await gameService.updateGame(updatedProduct);

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
    setDeveloperId(product.developerId);
    setDeveloperNameSearch(product.developer.fullname);
    preventDeveloperSearch(true);

    setPublisherId(product.publisherId);
    setPublisherNameSearch(product.publisher.fullname);
    preventPublisherSearch(true);
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

  return (
    <>
      <h2 className="text-white">Redigera produkt - Spel</h2>
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
          <label className="text-white">Utvecklare</label>
          <Input
            placeholder={"Sök på namn..."}
            state={developerNameSearch}
            setState={setDeveloperNameSearch}
          />
          {developerNameSearchResult.length !== 0 && (
            <NameList
              nameSearchResult={developerNameSearchResult}
              onNameClick={(name) =>
                onNameClick(
                  name,
                  setDeveloperNameSearch,
                  setDeveloperId,
                  preventDeveloperSearch,
                  setDeveloperNameSearchResult
                )
              }
              listKeyPrefix="developer"
            />
          )}
          <label className="text-white">Utgivare</label>
          <Input
            placeholder={"Sök på namn..."}
            state={publisherNameSearch}
            setState={setPublisherNameSearch}
          />
          {publisherNameSearchResult.length !== 0 && (
            <NameList
              nameSearchResult={publisherNameSearchResult}
              onNameClick={(name) =>
                onNameClick(
                  name,
                  setPublisherNameSearch,
                  setPublisherId,
                  preventPublisherSearch,
                  setPublisherNameSearchResult
                )
              }
              listKeyPrefix="publisher"
            />
          )}
          <ButtonPrimary className="w-fit" onClick={onSaveChangesClick}>
            Spara ändringar
          </ButtonPrimary>
        </>
      )}
      {developerNameSearchResult.length === 0 && developerNotFound && (
        <AddNameModal
          {...{
            setNameSearch: setDeveloperNameSearch,
            preventNameSearch: preventDeveloperSearch,
            nameNotFound: developerNotFound,
            setNameNotFound: setDeveloperNotFound,
            setNameId: setDeveloperId,
          }}
        />
      )}
      {publisherNameSearchResult.length === 0 && publisherNotFound && (
        <AddNameModal
          {...{
            setNameSearch: setPublisherNameSearch,
            preventNameSearch: preventPublisherSearch,
            nameNotFound: publisherNotFound,
            setNameNotFound: setPublisherNotFound,
            setNameId: setPublisherId,
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
