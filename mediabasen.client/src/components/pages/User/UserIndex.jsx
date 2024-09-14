import React, { useContext } from "react";
import authService from "../../../services/authService";
import UserContext from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import ButtonSecondary from "../../globals/ButtonSecondary";

export default function UserIndex() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  async function onLogoutClick() {
    const result = await authService.logout();

    if (result) {
      userContext.setUser(undefined);
      navigate("/");
    }
  }

  function onAdminClick() {
    navigate("/admin");
  }

  function isAdmin() {
    if (!userContext.user) return false;

    if (!userContext.user.roles.includes("Admin")) return false;

    return true;
  }

  return (
    <>
      <h2 className="text-xl font-bold text-center">Din profil</h2>
      {isAdmin() && (
        <ButtonSecondary className="w-fit mx-auto" onClick={onAdminClick}>
          Admin-vyn
        </ButtonSecondary>
      )}
      <ButtonSecondary
        className="w-fit mx-auto"
        onClick={() => navigate("/user/orders")}>
        Mina Ordrar
      </ButtonSecondary>
      <ButtonSecondary
        className="w-fit mx-auto"
        onClick={() => navigate("/user/details")}>
        Konto
      </ButtonSecondary>
      <ButtonSecondary className="w-fit mx-auto" onClick={onLogoutClick}>
        Logga ut
      </ButtonSecondary>
    </>
  );
}
