import React, { useEffect, useState } from "react";
import Star from "../../assets/icons/star-outline.webp";

export default function ReviewStars({ setStarValue, starValue }) {
  const [fillPercentage, setFillPercentage] = useState(0);

  function setRatingScore(e) {
    const rect = e.target.getBoundingClientRect();
    const posX = e.clientX - rect.left;
    setStarValue((5 / e.currentTarget.width) * posX);
  }

  useEffect(() => {
    setFillPercentage(Math.round((starValue / 5) * 100));
  }, [starValue]);

  return (
    <img
      className="w-full bg-acc"
      onClick={(e) => {
        if (setStarValue) {
          setRatingScore(e);
        }
      }}
      src={Star}
      style={{
        backgroundImage: `linear-gradient(to right, rgb(87 162 239) 0%, rgb(87 162 239) ${fillPercentage}%,transparent ${
          fillPercentage + 0.01
        }%, transparent 100%)`,
      }}
    />
  );
}
