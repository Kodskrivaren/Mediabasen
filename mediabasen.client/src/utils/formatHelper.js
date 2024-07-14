export default function formatIds(Ids, prefix) {
  return Ids.map((name) => `${prefix}=${name.id}`).join("&");
}
