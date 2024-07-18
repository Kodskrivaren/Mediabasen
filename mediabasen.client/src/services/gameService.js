import formatIds from "../utils/formatHelper";

async function addGame(game) {
  const queries = encodeURI(
    `Name=${game.Name}&Description=${game.Description}&Price=${
      game.Price
    }&ReleaseDate=${game.ReleaseDate}&Discount=${game.Discount}&DeveloperId=${
      game.DeveloperId
    }&PublisherId=${game.PublisherId}&FormatId=${game.FormatId}&${formatIds(
      game.GenreIds,
      "GenreIds"
    )}`
  );

  const formData = new FormData();

  game.Images.forEach((image) => {
    formData.append(`Images`, image);
  });

  const response = await fetch(`/api/Game/AddGame?${queries}`, {
    method: "POST",
    body: formData,
  });

  if (response.status < 400) {
    return await response.json();
  }
}

export default { addGame };
