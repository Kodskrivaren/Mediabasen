import fetchHelper from "../utils/fetchHelper";

async function getUserDetails() {
  const response = await fetchHelper("/User/UserDetails", "GET");

  if (response.status < 400) {
    return await response.json();
  }
}

async function createAccount(formValues) {
  const response = await fetchHelper("/User/CreateUser", "POST", formValues);

  if (response.status < 400) {
    return { success: true, data: await response.json() };
  } else {
    return { success: false, data: await response.json() };
  }
}

export default { getUserDetails, createAccount };
