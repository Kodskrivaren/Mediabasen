import React, { useState } from "react";
import Input from "../../globals/Input";
import useSearchHook from "../../../hooks/useSearchHook";
import AddNameModal from "./AddNameModal";
import NameList from "./NameList";
import Button from "../../globals/Button";
import musicService from "../../../services/musicService";
import Modal from "../../globals/Modal";
import nameService from "../../../services/nameService";
import AddBaseForm from "./AddBaseForm";

export default function AddMusic() {
  const [artistNotFound, setArtistNotFound] = useState(undefined);
  const [artistId, setArtistId] = useState(undefined);

  const [publisherNotFound, setPublisherNotFound] = useState(undefined);
  const [publisherId, setPublisherId] = useState(undefined);

  const [labelNotFound, setLabelNotFound] = useState(undefined);
  const [labelId, setLabelId] = useState(undefined);

  const [selectedFormat, setSelectedFormat] = useState(undefined);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [result, setResult] = useState();

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
    search: publisherNameSearch,
    setSearch: setPublisherNameSearch,
    setPreventSearch: preventPublisherSearch,
    searchResult: publisherNameSearchResult,
    setSearchResult: setPublisherNameSearchResult,
  } = useSearchHook({
    setNotFound: setPublisherNotFound,
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

  async function postMusic(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const objectValues = Object.fromEntries(formData);

    objectValues.Id = 0;
    objectValues.Images = imageFiles;
    objectValues.GenreIds = selectedGenres;
    objectValues.FormatId = selectedFormat.id;
    objectValues.LabelId = labelId;
    objectValues.PublisherId = publisherId;
    objectValues.ArtistId = artistId;

    const result = await musicService.addMusic(objectValues);

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
      <h2 className="text-white">Lägg till musik</h2>
      <form className="flex flex-col gap-3 max-w-96" onSubmit={postMusic}>
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
            listKeyPrefix="artist"
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
            listKeyPrefix="label"
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
        <Button classNameColor="bg-accent" className="w-fit" type="submit">
          Lägg till skivan
        </Button>
      </form>
      {publisherNameSearchResult.length === 0 && publisherNotFound && (
        <AddNameModal
          {...{
            setNameSearch: setPublisherNameSearch,
            preventNameSearch: preventPublisherSearch,
            nameNotFound: publisherNotFound,
            setNameNotFound: setPublisherNotFound,
          }}
        />
      )}
      {artistNameSearchResult.length === 0 && artistNotFound && (
        <AddNameModal
          {...{
            setNameSearch: setArtistNameSearch,
            preventNameSearch: preventArtistSearch,
            nameNotFound: artistNotFound,
            setNameNotFound: setArtistNotFound,
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
          }}
        />
      )}
      {result && (
        <Modal setClose={setResult} closeValue={undefined}>
          Skivan har lagts till!
        </Modal>
      )}
    </>
  );
}
