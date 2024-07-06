export default function fetchHelper(url, method, body, noContentType) {
  const fetchOptions = {
    headers: {},
    method,
  };

  if (method !== "GET") {
    fetchOptions.body = noContentType ? body : JSON.stringify(body);
    fetchOptions.headers["Content-Type"] = noContentType
      ? undefined
      : "application/json";
  }

  return fetch("/api" + url, fetchOptions);
}
