import React, { useState } from "react";
import Input from "../../globals/Input";
import useSearchHook from "../../../hooks/useSearchHook";
import AddNameModal from "./AddNameModal";
import NameList from "./NameList";
import bookService from "../../../services/bookService";
import Modal from "../../globals/Modal";
import nameService from "../../../services/nameService";
import AddBaseForm from "./AddBaseForm";
import ButtonPrimary from "../../globals/ButtonPrimary";

export default function AddBook() {
  const [authorNotFound, setAuthorNotFound] = useState(undefined);
  const [authorId, setAuthorId] = useState(undefined);

  const [publisherNotFound, setPublisherNotFound] = useState(undefined);
  const [publisherId, setPublisherId] = useState(undefined);

  const [selectedFormat, setSelectedFormat] = useState(undefined);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [result, setResult] = useState();

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

  async function postBook(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const objectValues = Object.fromEntries(formData);

    objectValues.Id = 0;
    objectValues.Images = imageFiles;
    objectValues.GenreIds = selectedGenres;
    objectValues.FormatId = selectedFormat.id;
    objectValues.PublisherId = publisherId;
    objectValues.AuthorId = authorId;

    const result = await bookService.addBook(objectValues);

    if (result) {
      setResult(result);
    }
  }

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
      <h2 className="text-white">Lägg till bok</h2>
      <form className="flex flex-col gap-3 max-w-96" onSubmit={postBook}>
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
            listKeyPrefix="artist"
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
        <ButtonPrimary className="w-fit" type="submit">
          Lägg till boken
        </ButtonPrimary>
      </form>
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
      {result && (
        <Modal setClose={setResult} closeValue={undefined}>
          Boken har lagts till!
        </Modal>
      )}
    </>
  );
}
