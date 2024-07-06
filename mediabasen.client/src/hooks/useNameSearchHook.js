import { useState, useEffect } from "react";
import nameService from "../services/nameService";

export default function useNameSearchHook({ setNotFound }) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [preventSearch, setPreventSearch] = useState(false);

  useEffect(() => {
    if (search === "") return;

    if (preventSearch) {
      setPreventSearch(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      const result = await nameService.findNames(search);

      setSearchResult(result);

      if (result.length === 0) {
        setNotFound(search);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  return { search, setSearch, setPreventSearch, searchResult, setSearchResult };
}
