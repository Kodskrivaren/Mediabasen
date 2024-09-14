import React, { useContext, useState } from "react";
import Modal from "../../globals/Modal";
import userService from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import LoadSpinner from "../../globals/LoadSpinner";
import ButtonSecondary from "../../globals/ButtonSecondary";
import ButtonDanger from "../../globals/ButtonDanger";

export default function DeleteUserModal({ setShowDeleteModal }) {
  const { setUser } = useContext(UserContext);
  const [deletingUser, setDeletingUser] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const navigate = useNavigate();

  async function onConfirmDeleteUser() {
    setDeletingUser(true);
    setServerMessage("");

    const response = await userService.deleteUser();

    if (response.success) {
      setUser(undefined);
      navigate("/");
    } else {
      setServerMessage("Något gick fel!");
    }

    setDeletingUser(false);
  }

  return (
    <Modal setClose={setShowDeleteModal} closeValue={false}>
      <h3 className="text-center font-bold text-xl">Är du säker?</h3>
      <p>
        Genom att ta bort ditt konto så tas alla dina ordrar och recensioner
        bort. Detta går inte att ångra!
      </p>
      <div className="flex justify-between">
        <ButtonSecondary
          className="bg-middle"
          onClick={() => setShowDeleteModal(false)}>
          Nej
        </ButtonSecondary>
        <ButtonDanger disabled={deletingUser} onClick={onConfirmDeleteUser}>
          {deletingUser ? <LoadSpinner className={"w-6 h-6 mx-auto"} /> : "Ja"}
        </ButtonDanger>
      </div>
      <p>{serverMessage}</p>
    </Modal>
  );
}
