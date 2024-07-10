import fetchHelper from "../utils/fetchHelper";

async function findNames(query) {
  const response = await fetchHelper(`/Name/FindName?query=${query}`, "GET");

  const json = await response.json();

  return json;
}

async function addName(nameToAdd) {
  const response = await fetchHelper(`/Name/AddName`, "POST", {
    id: 0,
    fullname: nameToAdd,
  });

  const json = await response.json();

  return json;
}

export default { findNames, addName };
