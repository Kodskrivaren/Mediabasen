import React, { useEffect, useState } from "react";
import FilterSelect from "../../globals/FilterSelect";
import productService from "../../../services/productService";
import searchHelper from "../../../utils/searchHelper";

export default function GenreFilters({
  selectedProductTypeId,
  params,
  setParams,
}) {
  const [selectedGenreId, setSelectedGenreId] = useState(0);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchAndSetGenres() {
      const result = await productService.getGenresByProductTypeId(
        selectedProductTypeId
      );

      setGenres(result.results);
    }

    if (selectedProductTypeId > 0) {
      fetchAndSetGenres();
    } else {
      setGenres([]);
    }
  }, [selectedProductTypeId]);

  function onChange(e) {
    const newValue = Number(e.target.value);

    if (newValue > 0) {
      params.set(searchHelper.searchQueries.genreId, newValue);
    } else {
      params.delete(searchHelper.searchQueries.genreId);
    }

    setParams(params);

    setSelectedGenreId(newValue);
  }

  return (
    <FilterSelect
      value={selectedGenreId}
      onChange={onChange}
      disabled={selectedProductTypeId === 0}>
      <option>Välj genre</option>
      {genres.map((genre) => (
        <option value={genre.id}>{genre.name}</option>
      ))}
    </FilterSelect>
  );
}
