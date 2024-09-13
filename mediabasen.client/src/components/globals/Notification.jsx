import React, { useContext, useEffect } from "react";
import NotifyContext from "../../contexts/NotifyContext";

export default function Notifications() {
  const { notes, setNotes } = useContext(NotifyContext);

  useEffect(() => {
    let timeoutId;

    if (notes && notes.length > 0) {
      timeoutId = setTimeout(() => {
        setNotes(notes.filter((note, index) => index > 0));
      }, 5500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [notes]);

  return (
    <div className="fixed z-50 text-white  right-3 top-5 ">
      {notes.map((note, i) => (
        <p
          key={`note-${note}-${i}`}
          className={`max-w-60 relative shadow-black shadow-note bg-middle p-3 pr-8 rounded mb-3`}>
          {note}
          <button
            className="absolute top-1 right-1 rounded-full bg-dark w-8 h-8"
            onClick={() => setNotes(notes.filter((note, index) => index != i))}>
            X
          </button>
        </p>
      ))}
    </div>
  );
}
