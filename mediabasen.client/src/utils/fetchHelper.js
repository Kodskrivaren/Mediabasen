export default function fetchHelper(url, method, body) {
  const fetchOptions = {
    headers: {},
    method,
  };

  if (method !== "GET") {
    fetchOptions.body = JSON.stringify(body);
    fetchOptions.headers["Content-Type"] = "application/json";
  }

  return fetch("/api" + url, fetchOptions);
}
