import fetchHelper from "../utils/fetchHelper";

async function login(credentials) {
  const response = await fetchHelper("/Auth/Login", "POST", credentials);

  if (response.status < 400) {
    return { success: true, data: await response.json() };
  }

  return { success: false, data: await response.json() };
}

export default { login };
