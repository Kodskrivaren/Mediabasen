import { useEffect } from "react";

export default function useCapitalizeFirstCharHook({ name, setName }) {
  useEffect(() => {
    const nameSplit = name.split(" ");

    const newName = nameSplit
      .map((part) => {
        const firstChar = part[0].toUpperCase();

        const rest = part.substring(1, part.length);

        return firstChar + rest;
      })
      .join(" ");

    setName(newName);
  }, []);
}
