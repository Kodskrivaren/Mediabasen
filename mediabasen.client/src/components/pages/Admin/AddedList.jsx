import React from "react";
import ButtonSecondary from "../../globals/ButtonSecondary";

export default function AddedList({
  title,
  nothingAddedText,
  entityDisplayProperty,
  list,
  setList,
  keyPrefix,
}) {
  return (
    <>
      <p className="text-white">{title}:</p>
      <ul className="flex flex-col gap-4 overflow-y-scroll h-40 rounded bg-dark p-3">
        {list.length === 0 && (
          <li>
            <p className="text-white">{nothingAddedText}</p>
          </li>
        )}
        {list.map((listItem, index) => (
          <li
            key={`${keyPrefix}-${index}`}
            className="text-white flex flex-row justify-between">
            <p>{listItem[entityDisplayProperty]}</p>
            <ButtonSecondary
              className="bg-middle"
              onClick={() => setList(list.filter((item) => item !== listItem))}>
              Ta bort
            </ButtonSecondary>
          </li>
        ))}
      </ul>
    </>
  );
}
