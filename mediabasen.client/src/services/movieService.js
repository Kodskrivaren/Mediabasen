import fetchHelper from "../utils/fetchHelper";
import axios from "axios";

async function fetchNewMovies() {
  const response = await fetchHelper("/product/getproducts", "GET");

  const json = await response.json();

  return json;
}

async function addMovie(movie) {
  const queries = encodeURI(
    `Name=${movie.Name}&Description=${movie.Description}&Discount=${
      movie.Discount
    }&DirectorId=${movie.DirectorId}&${formatIds(
      movie.ActorIds,
      "ActorIds"
    )}&${formatIds(movie.GenreIds, "GenreIds")}`
  );

  const formData = new FormData();

  movie.Images.forEach((image) => {
    formData.append(`Images`, image);
  });

  const response = await axios.post(`/api/Movie/AddMovie?${queries}`, formData);

  if (response.status < 400) {
    return await response.data;
  }
}

function formatIds(Ids, prefix) {
  return Ids.map((name) => `${prefix}=${name.id}`).join("&");
}

export default { fetchNewMovies, addMovie };
