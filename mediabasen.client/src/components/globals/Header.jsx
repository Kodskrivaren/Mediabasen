import { useContext } from "react";
import CartLogo from "./../../assets/icons/cart-outline.svg?react";
import UserLogo from "./../../assets/icons/person-outline.svg?react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

export default function Header() {
  const userContext = useContext(UserContext);

  return (
    <header className="flex justify-between p-3 bg-dark text-bright">
      <h1 className="text-2xl font-bold">Mediabasen</h1>
      <ul className="flex gap-5">
        <li>
          <CartLogo className="w-8 -scale-x-100" />
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
    </header>
  );
}
