import React, { useContext, useEffect, useState } from "react";
import Form from "../../globals/Form";
import Input from "../../globals/Input";
import Button from "../../globals/Button";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../../services/userService";
import UserContext from "../../../contexts/UserContext";

function getErrorMessage(key) {
  switch (key) {
    case "Email":
      return "Ogiltig email adress!";
    case "PasswordTooShort":
      return "Lösenordet måste vara minst 6 tecken långt!";
    case "PasswordRequiresNonAlphanumeric":
      return "Lösenordet kräver en symbol!";
    case "PasswordRequiresDigit":
      return "Lösenordet kräver en siffra!";
    case "PasswordRequiresUpper":
      return "Lösenordet kräver en stor bokstav!";
    case "DuplicateEmail":
      return "Det existerar redan ett konto med den email adressen!";
    case "PhoneNumber":
      return "Telefonumret är inte giltigt!";
    case "$.postalCode":
    case "postalCode":
      return "Postnumret är inte giltigt!";
    case "DuplicateUserName":
    default:
      return "";
  }
}

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData);
    if (formValues.password !== confirmPassword)
      return setErrorMessage("Lösenorden matchar inte!");
    const result = await userService.createAccount(formValues);

    if (result.success) {
      userContext.setUser(result.data);
      navigate("/");
    } else {
      if (result.data.errors) {
        const errors = result.data.errors;
        if (Array.isArray(errors)) {
          setErrorMessage(
            errors.map((error) => getErrorMessage(error.code)).join("\n")
          );
        } else {
          const keys = Object.keys(errors);
          setErrorMessage(keys.map((key) => getErrorMessage(key)).join("\n"));
        }
      } else {
        setErrorMessage(result.data.message);
      }
    }
  }

  useEffect(() => {
    if (userContext.user) {
      navigate("/user");
    }
  }, [userContext]);

  return (
    <section className="text-white p-3 flex justify-center flex-row">
      <Form onSubmit={onSubmit} className="flex-shrink-0 mt-10 w-10/12">
        <h2 className="text-3xl text-center">Bli medlem</h2>
        <label htmlFor="name">Fullständigt namn:</label>
        <Input
          id={"name"}
          name={"name"}
          className={"text-black"}
          placeholder={"Fullständigt namn..."}
        />
        <label htmlFor="email">Email:</label>
        <Input
          id={"email"}
          name={"email"}
          className={"text-black"}
          placeholder={"Email..."}
          type="mail"
        />
        <label htmlFor="adress">Adress:</label>
        <Input
          id={"adress"}
          name={"adress"}
          className={"text-black"}
          placeholder={"Adress..."}
        />
        <label htmlFor="postalCode">Postnummer:</label>
        <Input
          id={"postalCode"}
          name={"postalCode"}
          className={"text-black"}
          placeholder={"Postnummer..."}
        />
        <label htmlFor="city">Stad</label>
        <Input
          id={"city"}
          name={"city"}
          className={"text-black"}
          placeholder={"Stad..."}
        />
        <label htmlFor="phoneNumber">Telefonummer</label>
        <Input
          id={"phoneNumber"}
          name={"phoneNumber"}
          className={"text-black"}
          placeholder={"Telefon..."}
        />
        <label htmlFor="password">Lösenord</label>
        <Input
          id={"password"}
          name={"password"}
          className={"text-black"}
          placeholder={"Lösenord..."}
          type="password"
        />
        <label htmlFor="confirmPassword">Bekräfta Lösenord</label>
        <Input
          id={"confirmPassword"}
          className={"text-black"}
          placeholder={"Bekräfta Lösenord..."}
          state={confirmPassword}
          setState={setConfirmPassword}
          type="password"
        />
        <p className="text-red-200">
          {errorMessage.split("\n").map((text, index) => (
            <React.Fragment key={`error-msg-${index}`}>
              {text}
              <br />
            </React.Fragment>
          ))}
        </p>
        <Button
          classNameColor="bg-accent w-fit"
          type="submit"
          className="mx-auto">
          Bli medlem
        </Button>
        <p className="text-center">Är du redan medlem?</p>
        <Link className="text-center text-accent" to={"/login"}>
          Logga in här
        </Link>
      </Form>
    </section>
  );
}
