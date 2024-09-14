import React, { useContext, useEffect, useState } from "react";
import Form from "../../globals/Form";
import Input from "../../globals/Input";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import UserContext from "../../../contexts/UserContext";
import ButtonPrimary from "../../globals/ButtonPrimary";
import Link from "../../globals/Link";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData);
    const result = await authService.login(credentials);

    if (result.success) {
      userContext.setUser(result.data);
    } else {
      setErrorMessage(result.data.message);
    }
  }

  useEffect(() => {
    if (userContext.user) {
      navigate("/user");
    }
  }, [userContext]);

  return (
    <section className="text-white p-3 flex justify-center flex-row">
      <Form onSubmit={onSubmit} className="flex-shrink-0 mt-10">
        <h2 className="text-3xl text-center">Logga in</h2>
        <Input
          name={"email"}
          className={"text-black"}
          placeholder={"Email..."}
        />
        <Input
          name={"password"}
          className={"text-black"}
          placeholder={"Lösenord..."}
          type="password"
        />
        <p className="text-center text-red-200">{errorMessage}</p>
        <ButtonPrimary type="submit" className="mx-auto">
          Logga in
        </ButtonPrimary>
        <p className="text-center">Har du inget konto?</p>
        <Link className="text-center text-accent" to={"/register"}>
          Skapa konto här
        </Link>
      </Form>
    </section>
  );
}
