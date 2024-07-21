import formatIds from "../utils/formatHelper";

async function addMusic(music) {
  const queries = encodeURI(getQueries(music));

  const formData = new FormData();

  music.Images.forEach((image) => {
    formData.append(`Images`, image);
  });

  const response = await fetch(`/api/Music/AddMusic?${queries}`, {
    method: "POST",
    body: formData,
  });

  if (response.status < 400) {
    return await response.json();
  }
}

async function updateMusic(music) {
  const queries = encodeURI(`Id=${music.Id}&` + getQueries(music));

  const formData = new FormData();

  music.Images.forEach((image) => {
    formData.append(`Images`, image);
  });

  const response = await fetch(`/api/Music/UpdateMusic?${queries}`, {
    method: "PATCH",
    body: formData,
  });

  if (response.status < 400) {
    return await response.json();
  }
}

function getQueries(music) {
  return `Name=${music.Name}&Description=${music.Description}&Price=${
    music.Price
  }&ReleaseDate=${music.ReleaseDate}&Discount=${music.Discount}&ArtistId=${
    music.ArtistId
  }&LabelId=${music.LabelId}&PublisherId=${music.PublisherId}&FormatId=${
    music.FormatId
  }&${formatIds(music.GenreIds, "GenreIds")}`;
}

export default { addMusic, updateMusic };
