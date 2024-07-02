import CartLogo from "./../../assets/icons/cart-outline.svg?react";
import UserLogo from "./../../assets/icons/person-outline.svg?react";

export default function Header() {
  return (
    <header className="flex justify-between p-3 bg-dark text-bright">
      <h1 className="text-2xl font-bold">Mediabasen</h1>
      <ul className="flex gap-5">
        <li>
          <CartLogo className="w-8 -scale-x-100" />
        </li>
        <li>
          <UserLogo className="w-8" />
        </li>
      </ul>
    </header>
  );
}
