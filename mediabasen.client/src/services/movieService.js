import fetchHelper from "../utils/fetchHelper";

async function fetchNewMovies() {
  const response = await fetchHelper("/product/getproducts", "GET");

  const json = await response.json();

  return json;
}

async function addMovie(movie) {
  const queries = encodeURI(
    `Name=${movie.Name}&Description=${movie.Description}&Discount=${
      movie.Discount
    }&DirectorId=${movie.DirectorId}&${formatActorIds(movie.ActorIds)}`
  );

  const formData = new FormData();

  movie.Images.forEach((image) => {
    formData.append("Images", image, image.name);
  });

  const response = await fetchHelper(
    `/Product/AddMovie?${queries}`,
    "POST",
    formData,
    true
  );

  if (response.status < 400) {
    return await response.json();
  }
}

function formatActorIds(actorIds) {
  return actorIds.map((name) => `ActorIds=${name.id}`).join("&");
}

export default { fetchNewMovies, addMovie };
