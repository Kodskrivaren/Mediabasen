import React, { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";

export default function ReviewSection({ product, setProduct }) {
  const userCtx = useContext(UserContext);

  return (
    <section className="text-white p-3 flex flex-col gap-y-3">
      <h3 className="text-2xl font-bold">Recensioner</h3>
      {product.reviews && product.reviews.length > 0 ? (
        <Reviews reviews={product.reviews} />
      ) : (
        <p>Det finns inga recensioner till denna produkt!</p>
      )}
      {userCtx.user &&
      ((product.reviews &&
        product.reviews.length > 0 &&
        product.reviews.find((u) => u.username === userCtx.user.username)) ||
        !product.reviews ||
        (product.reviews && product.reviews.length === 0)) ? (
        <ReviewForm {...{ product, setProduct }} />
      ) : !userCtx.user ? (
        <p>
          <Link to={"/login"}>Logga in</Link> för att skriva en recension
        </p>
      ) : null}
    </section>
  );
}
