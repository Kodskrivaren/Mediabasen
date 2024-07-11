import fetchHelper from "../utils/fetchHelper";

async function findFormats(search) {
  const response = await fetchHelper(
    `/Format/FindFormats?search=${search}`,
    "GET"
  );

  if (response.status < 400) {
    return await response.json();
  }
}

async function addFormat(Name) {
  const response = await fetchHelper("/Format/AddFormat", "POST", {
    Id: 0,
    Name,
  });

  if (response.status < 400) {
    return await response.json();
  }
}

export default { findFormats, addFormat };
