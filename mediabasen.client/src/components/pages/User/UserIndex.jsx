import React, { useContext } from "react";
import Button from "../../globals/Button";
import authService from "../../../services/authService";
import UserContext from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

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
      <h2 className="text-xl font-bold">Din profil</h2>
      {isAdmin() && (
        <Button className="w-fit" onClick={onAdminClick}>
          Admin-vyn
        </Button>
      )}
      <Button onClick={() => navigate("/user/orders")}>Mina Ordrar</Button>
      <Button onClick={onLogoutClick}>Logga ut</Button>
    </>
  );
}
