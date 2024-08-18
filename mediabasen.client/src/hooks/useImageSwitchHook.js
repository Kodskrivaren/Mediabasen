import { useEffect } from "react";

export default function useImageSwitchHook({ imageContainerRef, index }) {
  useEffect(() => {
    if (imageContainerRef === undefined || !imageContainerRef.current) return;

    imageContainerRef.current.children[index].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [imageContainerRef, index]);
}
