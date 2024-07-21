import React from "react";
import ReviewStars from "../../globals/ReviewStars";

export default function Reviews({ reviews }) {
  return (
    <ul className="max-w-xl">
      {reviews.map((review) => (
        <li>
          <section className="bg-dark flex flex-col gap-y-3 p-3">
            <h4 className="text-xl font-bold">{review.username}</h4>
            <div className="w-1/3">
              <ReviewStars {...{ starValue: review.rating }} />
            </div>
            <p>{review.content}</p>
          </section>
        </li>
      ))}
    </ul>
  );
}
