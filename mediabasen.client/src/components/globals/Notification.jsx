import React, { useContext, useEffect } from "react";
import NotifyContext from "../../contexts/NotifyContext";

export default function Notification() {
  const { note, setNote } = useContext(NotifyContext);

  useEffect(() => {
    let timeoutId;

    if (note) {
      timeoutId = setTimeout(() => {
        setNote(undefined);
      }, 5500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout();
      }
    };
  }, [note]);

  return (
    <div className="fixed text-white max-w-60 shadow-black shadow-note right-3 translate-x-full top-5 bg-middle p-3 rounded animate-note">
      {note}
    </div>
  );
}
