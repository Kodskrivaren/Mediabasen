import { useState, useContext, useEffect } from "react";
import CartLogo from "./../../assets/icons/cart-outline.svg?react";
import UserLogo from "./../../assets/icons/person-outline.svg?react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import cartService from "../../services/cartService";
import CartContext from "../../contexts/CartContext";
import Navbar from "./Nav";
import MainLogo from "./../../assets/icons/Logga_TP.png";

export default function Header() {
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function onScreenChange() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", onScreenChange);

    return () => {
      window.removeEventListener("resize", onScreenChange);
    };
  }, []);

  useEffect(() => {
    async function tryGetCart() {
      const data = await cartService.getCart();

      cartContext.setCart(data);
    }

    tryGetCart();
  }, []);

  return (
    <header className="bg-dark">
      <section className="flex justify-between p-3 text-bright mx-auto max-w-7xl">
        <Link to={"/"}>
          <img src={MainLogo} className="w-10 mx-auto" />
          {width > 768 && <h1 className="text-2xl font-bold">Mediabasen</h1>}
        </Link>
        <ul className="flex gap-5">
          <li className="relative flex-grow-0 h-fit">
            <Link to={"/cart"}>
              <CartLogo className="w-8 -scale-x-100" />
              {cartContext.cart && (
                <div className="absolute -bottom-2 -left-2 bg-accent w-6 h-6 flex flex-col justify-center align-middle rounded-full">
                  <p className="block font-bold text-center w-fit flex-grow-0 mx-auto flex-shrink-0">
                    {cartContext.cart.cartProducts.length}
                  </p>
                </div>
              )}
            </Link>
          </li>
          <li>
            <Link
              to={userContext.user ? "/user" : "/login"}
              className="text-center">
              <UserLogo className="w-8 mx-auto" />
              <p className="text-sm">
                {userContext.user
                  ? userContext.user.name.split(" ")[0]
                  : "Logga in"}
              </p>
            </Link>
          </li>
        </ul>
      </section>
      <Navbar />
    </header>
  );
}
