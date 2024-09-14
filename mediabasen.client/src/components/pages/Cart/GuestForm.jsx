import React, { useContext, useState } from "react";
import Link from "../../globals/Link";
import Input from "../../globals/Input";
import Form from "../../globals/Form";
import LoadSpinner from "../../globals/LoadSpinner";
import orderService from "../../../services/orderService";
import CartContext from "../../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../globals/ButtonPrimary";

export default function GuestForm({ calculateTotalPrice }) {
  const { setCart } = useContext(CartContext);
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setPlacingOrder(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    var result = await orderService.placeOrderAsGuest(data);

    if (result) {
      setCart(undefined);
      navigate("/order", { state: result });
    }

    setPlacingOrder(false);
  }

  return (
    <Form className="flex flex-col gap-y-3 w-full max-w-md" onSubmit={onSubmit}>
      <p>
        Fyll i formuläret med dina uppgifter. Om du redan har ett konto så kan
        du <Link to={"/login"}>logga in</Link> så kopplas ordern till ditt konto
        och du slipper fylla i formuläret.
      </p>
      <Input
        className="text-black"
        placeholder={"Fullständigt namn"}
        name={"name"}
        required={true}
      />
      <Input
        className="text-black"
        placeholder={"Email"}
        name={"email"}
        type={"email"}
        required={true}
      />
      <Input
        className="text-black"
        placeholder={"Adress"}
        name={"adress"}
        autocomplete={"shipping street-address"}
        type={"adress"}
        required={true}
      />
      <div className="flex flex-shrink w-full gap-x-3 justify-between">
        <Input
          className="text-black w-1/2"
          placeholder={"Postnummer"}
          name={"postalCode"}
          required={true}
        />
        <Input
          className="text-black w-1/2"
          placeholder={"Stad"}
          name={"city"}
          required={true}
        />
      </div>
      <Input
        className="text-black"
        placeholder={"Telefon"}
        name={"phoneNumber"}
        type={"phone"}
        required={true}
      />
      <p className="font-bold text-xl">Totalt: {calculateTotalPrice()} kr</p>
      <ButtonPrimary
        className="w-fit mx-auto hover:bg-middle"
        disabled={placingOrder}
        type="submit">
        {placingOrder ? (
          <LoadSpinner className={"h-8 w-8 mx-8"} />
        ) : (
          "Lägg Beställning"
        )}
      </ButtonPrimary>
    </Form>
  );
}
