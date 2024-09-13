import React, { useState } from "react";
import Button from "../../globals/Button";
import DeleteUserModal from "./DeleteUserModal";

export default function UserDetails() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <section className="p-3 flex flex-col gap-y-3">
      <h2 className="text-2xl font-bold text-center">Konto</h2>
      <Button
        classNameColor="bg-red-500"
        className="mx-auto hover:bg-black"
        onClick={() => setShowDeleteModal(true)}>
        Ta bort konto
      </Button>
      {showDeleteModal && <DeleteUserModal {...{ setShowDeleteModal }} />}
    </section>
  );
}
