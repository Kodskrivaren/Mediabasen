import { useState, useEffect } from "react";

export default function useScreenXHook() {
  const [screenX, setScreenX] = useState(0);

  useEffect(() => {
    setScreenX(window.innerWidth);
    function onScreenChange() {
      setScreenX(window.innerWidth);
    }

    window.addEventListener("resize", onScreenChange);

    return () => {
      window.removeEventListener("resize", onScreenChange);
    };
  }, [setScreenX]);

  return screenX;
}
