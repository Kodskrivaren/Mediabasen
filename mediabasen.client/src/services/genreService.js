import fetchHelper from "../utils/fetchHelper";

async function findGenres(search) {
  const response = await fetchHelper(
    `/Genre/FindGenres?search=${search}`,
    "GET"
  );

  if (response.status < 400) {
    return await response.json();
  }
}

async function addGenre(Name) {
  const response = await fetchHelper("/Genre/AddGenre", "POST", {
    Id: 0,
    Name,
  });

  if (response.status < 400) {
    return await response.json();
  }
}

export default { findGenres, addGenre };
