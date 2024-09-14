import React, { useState } from "react";
import Input from "../../globals/Input";
import useSearchHook from "../../../hooks/useSearchHook";
import AddNameModal from "./AddNameModal";
import NameList from "./NameList";
import gameService from "../../../services/gameService";
import Modal from "../../globals/Modal";
import nameService from "../../../services/nameService";
import AddBaseForm from "./AddBaseForm";
import ButtonPrimary from "../../globals/ButtonPrimary";

export default function AddGame() {
  const [developerNotFound, setDeveloperNotFound] = useState(undefined);
  const [developerId, setDeveloperId] = useState(undefined);

  const [publisherNotFound, setPublisherNotFound] = useState(undefined);
  const [publisherId, setPublisherId] = useState(undefined);

  const [selectedFormat, setSelectedFormat] = useState(undefined);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [result, setResult] = useState();

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

  async function postGame(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const objectValues = Object.fromEntries(formData);

    objectValues.Id = 0;
    objectValues.Images = imageFiles;
    objectValues.GenreIds = selectedGenres;
    objectValues.FormatId = selectedFormat.id;
    objectValues.PublisherId = publisherId;
    objectValues.DeveloperId = developerId;

    const result = await gameService.addGame(objectValues);

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
      <h2 className="text-white">Lägg till spel</h2>
      <form className="flex flex-col gap-3 max-w-96" onSubmit={postGame}>
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
          Lägg till spelet
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
      {result && (
        <Modal setClose={setResult} closeValue={undefined}>
          Spelet har lagts till!
        </Modal>
      )}
    </>
  );
}
