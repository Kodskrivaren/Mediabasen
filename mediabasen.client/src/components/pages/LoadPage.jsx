import React from "react";
import LoadSpinner from "../globals/LoadSpinner";

export default function LoadPage() {
  return (
    <div className="flex justify-center py-8">
      <LoadSpinner />
    </div>
  );
}
