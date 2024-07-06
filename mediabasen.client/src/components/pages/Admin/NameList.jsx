import React from "react";

export default function NameList({
  nameSearchResult,
  onNameClick,
  listKeyPrefix,
}) {
  return (
    <div className="-mt-4 relative h-0">
      <ul className="absolute w-full bg-white hover:bg-slate-300 rounded-b p-2">
        {nameSearchResult.map((name) => (
          <li key={`${listKeyPrefix}-${name.id}`}>
            <button
              className="w-full h-full p-1"
              type="button"
              onClick={() => onNameClick(name)}>
              <p className="text-left">{name.fullname}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
