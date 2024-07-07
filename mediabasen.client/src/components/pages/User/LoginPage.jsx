import React, { useContext, useEffect, useState } from "react";
import Form from "../../globals/Form";
import Input from "../../globals/Input";
import Button from "../../globals/Button";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import UserContext from "../../../contexts/UserContext";

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
          classNames={"text-black"}
          placeholder={"Email..."}
        />
        <Input
          name={"password"}
          classNames={"text-black"}
          placeholder={"Lösenord..."}
          type="password"
        />
        <p className="text-center text-red-200">{errorMessage}</p>
        <Button classNameColor="bg-accent" type="submit" className="mx-auto">
          Logga in
        </Button>
        <p className="text-center">Har du inget konto?</p>
        <Link className="text-center text-accent" to={"/register"}>
          Skapa konto här
        </Link>
      </Form>
    </section>
  );
}
