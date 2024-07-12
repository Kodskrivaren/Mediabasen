import fetchHelper from "../utils/fetchHelper";

async function fetchNewMovies() {
  const response = await fetchHelper("/product/getproducts", "GET");

  const json = await response.json();

  return json;
}

async function addMovie(movie) {
  const queries = encodeURI(
    `Name=${movie.Name}&Description=${movie.Description}&Price=${
      movie.Price
    }&Discount=${movie.Discount}&DirectorId=${movie.DirectorId}&FormatId=${
      movie.FormatId
    }&${formatIds(movie.ActorIds, "ActorIds")}&${formatIds(
      movie.GenreIds,
      "GenreIds"
    )}`
  );

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

function formatIds(Ids, prefix) {
  return Ids.map((name) => `${prefix}=${name.id}`).join("&");
}

export default { fetchNewMovies, addMovie };
