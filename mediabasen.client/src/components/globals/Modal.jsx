import React from "react";

export default function Modal(props) {
  function onClick(e) {
    if (e.target.className.includes("gmodal") && props.setClose) {
      props.setClose(props.closeValue);
    }
  }

  return (
    <div
      onClick={onClick}
      className="gmodal fixed flex justify-center items-center flex-col top-0 bottom-0 left-0 right-0 z-50 bg-primary bg-opacity-50">
      <div className="flex flex-col gap-4 max-w-96 text-white rounded h-fit p-8 bg-dark shadow-modal shadow-black">
        {props.children}
      </div>
    </div>
  );
}
