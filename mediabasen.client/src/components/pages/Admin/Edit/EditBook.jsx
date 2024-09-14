import React, { useState, useEffect } from "react";
import bookService from "../../../../services/bookService";
import EditBaseForm from "./EditBaseForm";
import useBasicEditPropsHook from "../../../../hooks/useBasicEditPropsHook";
import nameService from "../../../../services/nameService";
import useSearchHook from "../../../../hooks/useSearchHook";
import Input from "../../../globals/Input";
import NameList from "../NameList";
import Modal from "../../../globals/Modal";
import AddNameModal from "../AddNameModal";
import ButtonPrimary from "../../../globals/ButtonPrimary";

export default function EditBook({ product }) {
  const [authorNotFound, setAuthorNotFound] = useState(undefined);
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
  const [authorId, setAuthorId] = useState(0);
  const [publisherId, setPublisherId] = useState(0);

  const {
    search: authorNameSearch,
    setSearch: setAuthorNameSearch,
    setPreventSearch: preventAuthorSearch,
    searchResult: authorNameSearchResult,
    setSearchResult: setAuthorNameSearchResult,
  } = useSearchHook({
    setNotFound: setAuthorNotFound,
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

    updatedProduct.AuthorId = authorId;
    updatedProduct.PublisherId = publisherId;

    const data = await bookService.updateBook(updatedProduct);

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
    setAuthorId(product.authorId);
    setAuthorNameSearch(product.author.fullname);
    preventAuthorSearch(true);

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
      <h2 className="text-white">Redigera produkt - Book</h2>
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
          <label className="text-white">Författare</label>
          <Input
            placeholder={"Sök på namn..."}
            state={authorNameSearch}
            setState={setAuthorNameSearch}
          />
          {authorNameSearchResult.length !== 0 && (
            <NameList
              nameSearchResult={authorNameSearchResult}
              onNameClick={(name) =>
                onNameClick(
                  name,
                  setAuthorNameSearch,
                  setAuthorId,
                  preventAuthorSearch,
                  setAuthorNameSearchResult
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
          <ButtonPrimary className="w-fit" onClick={onSaveChangesClick}>
            Spara ändringar
          </ButtonPrimary>
        </>
      )}
      {authorNameSearchResult.length === 0 && authorNotFound && (
        <AddNameModal
          {...{
            setNameSearch: setAuthorNameSearch,
            preventNameSearch: preventAuthorSearch,
            nameNotFound: authorNotFound,
            setNameNotFound: setAuthorNotFound,
            setNameId: setAuthorId,
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
