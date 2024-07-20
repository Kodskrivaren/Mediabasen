import formatIds from "../utils/formatHelper";

async function updateGame(game) {
  const queries = `Id=${game.Id}&` + getEncodedQueries(game);

  const formData = new FormData();

  game.Images.forEach((image) => {
    formData.append(`Images`, image);
  });

  const response = await fetch(`/api/Game/UpdateGame?${queries}`, {
    method: "PATCH",
    body: formData,
  });

  if (response.status < 400) {
    return await response.json();
  }
}

async function addGame(game) {
  const queries = getEncodedQueries(game);

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

function getEncodedQueries(game) {
  return encodeURI(
    `Name=${game.Name}&Description=${game.Description}&Price=${
      game.Price
    }&ReleaseDate=${game.ReleaseDate}&Discount=${game.Discount}&DeveloperId=${
      game.DeveloperId
    }&PublisherId=${game.PublisherId}&FormatId=${game.FormatId}&${formatIds(
      game.GenreIds,
      "GenreIds"
    )}`
  );
}

export default { addGame, updateGame };
