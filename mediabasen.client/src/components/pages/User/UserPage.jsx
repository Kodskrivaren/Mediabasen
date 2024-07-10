import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import Button from "../../globals/Button";
import authService from "../../../services/authService";

export default function UserPage() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userContext.user) {
      navigate("/login");
    }
  }, [userContext]);

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
    <section className="text-white p-3">
      <h2 className="">Din profil</h2>
      {isAdmin() && (
        <Button className="w-fit" onClick={onAdminClick}>
          Admin-vyn
        </Button>
      )}
      <Button onClick={onLogoutClick}>Logga ut</Button>
    </section>
  );
}
