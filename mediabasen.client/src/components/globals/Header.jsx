import { List, ListItem } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-around pt-10 pb-10 bg-dark text-bright">
      <List className="flex gap-5">
        <ListItem>
          <Link to={"/"}>Hem</Link>
        </ListItem>
        <ListItem>
          <a>Kontakt</a>
        </ListItem>
      </List>
      <h1>Mediabasen</h1>
      <ul className="flex gap-5">
        <li>Cart</li>
        <li>Profile</li>
      </ul>
    </header>
  );
}
