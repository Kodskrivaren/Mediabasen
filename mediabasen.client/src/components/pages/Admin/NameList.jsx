import React from "react";

export default function NameList({
  nameSearchResult,
  onNameClick,
  listKeyPrefix,
  nameProp = "fullname",
}) {
  return (
    <div className="-mt-4 relative h-0">
      <ul className="absolute w-full bg-white rounded-b p-2">
        {nameSearchResult.map((name) => (
          <li
            key={`${listKeyPrefix}-${name.id}`}
            className="hover:bg-slate-300">
            <button
              className="w-full h-full p-1"
              type="button"
              onClick={() => onNameClick(name)}>
              <p className="text-left">{name[nameProp]}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
