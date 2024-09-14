import React, { useContext, useState } from "react";
import Textarea from "../../globals/Textarea";
import productService from "../../../services/productService";
import ReviewStars from "../../globals/ReviewStars";
import UserContext from "../../../contexts/UserContext";
import ButtonPrimary from "../../globals/ButtonPrimary";

export default function ReviewForm({ product, setProduct }) {
  const userCtx = useContext(UserContext);
  const [starValue, setStarValue] = useState(0);

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const objectValues = Object.fromEntries(formData);

    objectValues.ProductId = product.id;

    const data = await productService.postReview(objectValues);
    if (data) {
      setProduct((old) => {
        if (!old.reviews) {
          old.reviews = [];
        }

        data.username = userCtx.user.name;

        old.reviews.push(data);

        return JSON.parse(JSON.stringify(old));
      });
    }
  }

  return (
    <form
      className="bg-dark w-fit p-3 flex flex-col gap-y-3 rounded max-w-xl"
      onSubmit={onSubmit}>
      <h4 className="font-bold text-lg">Skriv en recension</h4>
      <div className="relative flex max-w-xs">
        <ReviewStars {...{ setStarValue, starValue }} />
      </div>
      <input
        className="bg-dark text-accent"
        type="range"
        value={starValue}
        step={0.01}
        max={5.0}
        min={0.0}
        name="Rating"
        onChange={(e) => setStarValue(e.target.value)}
      />
      <Textarea
        classNames={"text-black"}
        name={"Content"}
        placeholder={"Berätta vad du tycker..."}
      />
      <ButtonPrimary type="submit">Publicera</ButtonPrimary>
    </form>
  );
}
