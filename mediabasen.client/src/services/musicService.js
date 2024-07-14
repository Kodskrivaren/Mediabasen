import formatIds from "../utils/formatHelper";

async function addMusic(music) {
  const queries = encodeURI(
    `Name=${music.Name}&Description=${music.Description}&Price=${
      music.Price
    }&ReleaseDate=${music.ReleaseDate}&Discount=${music.Discount}&ArtistId=${
      music.ArtistId
    }&LabelId=${music.LabelId}&PublisherId=${music.PublisherId}&FormatId=${
      music.FormatId
    }&${formatIds(music.GenreIds, "GenreIds")}`
  );

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

export default { addMusic };
