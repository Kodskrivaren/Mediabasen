import React, { useState, useEffect } from "react";
import musicService from "../../../../services/musicService";
import EditBaseForm from "./EditBaseForm";
import Button from "../../../globals/Button";
import useBasicEditPropsHook from "../../../../hooks/useBasicEditPropsHook";
import nameService from "../../../../services/nameService";
import useSearchHook from "../../../../hooks/useSearchHook";
import Input from "../../../globals/Input";
import NameList from "../NameList";
import Modal from "../../../globals/Modal";
import AddNameModal from "../AddNameModal";

export default function EditMusic({ product }) {
  const [artistNotFound, setArtistNotFound] = useState(undefined);
  const [publisherNotFound, setPublisherNotFound] = useState(undefined);
  const [labelNotFound, setLabelNotFound] = useState(undefined);
  const [result, setResult] = useState();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState();
  const [imageFiles, setImageFiles] = useState([]);
  const [artistId, setArtistId] = useState(0);
  const [labelId, setLabelId] = useState(0);
  const [publisherId, setPublisherId] = useState(0);

  const {
    search: artistNameSearch,
    setSearch: setArtistNameSearch,
    setPreventSearch: preventArtistSearch,
    searchResult: artistNameSearchResult,
    setSearchResult: setArtistNameSearchResult,
  } = useSearchHook({
    setNotFound: setArtistNotFound,
    searchFunction: nameService.findNames,
  });

  const {
    search: labelNameSearch,
    setSearch: setLabelNameSearch,
    setPreventSearch: preventLabelSearch,
    searchResult: labelNameSearchResult,
    setSearchResult: setLabelNameSearchResult,
  } = useSearchHook({
    setNotFound: setLabelNotFound,
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

    updatedProduct.ArtistId = artistId;
    updatedProduct.LabelId = labelId;
    updatedProduct.PublisherId = publisherId;

    const data = await musicService.updateMusic(updatedProduct);

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
    setArtistId(product.artistId);
    setArtistNameSearch(product.artist.fullname);
    preventArtistSearch(true);

    setLabelId(product.labelId);
    setLabelNameSearch(product.label.fullname);
    preventLabelSearch(true);

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
          <label className="text-white">Artist</label>
          <Input
            placeholder={"Sök på namn..."}
            state={artistNameSearch}
            setState={setArtistNameSearch}
          />
          {artistNameSearchResult.length !== 0 && (
            <NameList
              nameSearchResult={artistNameSearchResult}
              onNameClick={(name) =>
                onNameClick(
                  name,
                  setArtistNameSearch,
                  setArtistId,
                  preventArtistSearch,
                  setArtistNameSearchResult
                )
              }
              listKeyPrefix="author"
            />
          )}
          <label className="text-white">Skivbolag</label>
          <Input
            placeholder={"Sök på namn..."}
            state={labelNameSearch}
            setState={setLabelNameSearch}
          />
          {labelNameSearchResult.length !== 0 && (
            <NameList
              nameSearchResult={labelNameSearchResult}
              onNameClick={(name) =>
                onNameClick(
                  name,
                  setLabelNameSearch,
                  setLabelId,
                  preventLabelSearch,
                  setLabelNameSearchResult
                )
              }
              listKeyPrefix="author"
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
          <Button
            classNameColor="bg-accent"
            className="w-fit"
            onClick={onSaveChangesClick}>
            Spara ändringar
          </Button>
        </>
      )}
      {artistNameSearchResult.length === 0 && artistNotFound && (
        <AddNameModal
          {...{
            setNameSearch: setArtistNameSearch,
            preventNameSearch: preventArtistSearch,
            nameNotFound: artistNotFound,
            setNameNotFound: setArtistNotFound,
            setNameId: setArtistId,
          }}
        />
      )}
      {labelNameSearchResult.length === 0 && labelNotFound && (
        <AddNameModal
          {...{
            setNameSearch: setLabelNameSearch,
            preventNameSearch: preventLabelSearch,
            nameNotFound: labelNotFound,
            setNameNotFound: setLabelNotFound,
            setNameId: setLabelId,
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
