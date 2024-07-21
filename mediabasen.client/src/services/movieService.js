import formatIds from "../utils/formatHelper";

async function addMovie(movie) {
  const queries = encodeURI(getQueries(movie));

  const formData = new FormData();

  movie.Images.forEach((image) => {
    formData.append(`Images`, image);
  });

  const response = await fetch(`/api/Movie/AddMovie?${queries}`, {
    method: "POST",
    body: formData,
  });

  if (response.status < 400) {
    return await response.json();
  }
}

async function updateMovie(movie) {
  const queries = encodeURI(`Id=${movie.Id}&` + getQueries(movie));

  const formData = new FormData();

  movie.Images.forEach((image) => {
    formData.append(`Images`, image);
  });

  const response = await fetch(`/api/Movie/UpdateMovie?${queries}`, {
    method: "PATCH",
    body: formData,
  });

  if (response.status < 400) {
    return await response.json();
  }
}

function getQueries(movie) {
  return `Name=${movie.Name}&Description=${movie.Description}&Price=${
    movie.Price
  }&ReleaseDate=${movie.ReleaseDate}&Discount=${movie.Discount}&DirectorId=${
    movie.DirectorId
  }&FormatId=${movie.FormatId}&${formatIds(
    movie.ActorIds,
    "ActorIds"
  )}&${formatIds(movie.GenreIds, "GenreIds")}`;
}

export default { addMovie, updateMovie };
