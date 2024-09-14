import React, { useState } from "react";
import DeleteUserModal from "./DeleteUserModal";
import ButtonDanger from "../../globals/ButtonDanger";

export default function UserDetails() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <section className="p-3 flex flex-col gap-y-3">
      <h2 className="text-2xl font-bold text-center">Konto</h2>
      <ButtonDanger
        className="mx-auto hover:bg-black"
        onClick={() => setShowDeleteModal(true)}>
        Ta bort konto
      </ButtonDanger>
      {showDeleteModal && <DeleteUserModal {...{ setShowDeleteModal }} />}
    </section>
  );
}
