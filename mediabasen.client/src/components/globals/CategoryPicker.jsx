import Button from "./Button";

export default function CategoryPicker() {
  return (
    <ul className="flex justify-center gap-5 pt-3 pb-3 bg-light">
      <li>
        <Button>Böcker</Button>
      </li>
      <li>
        <Button>Filmer</Button>
      </li>
      <li>
        <Button>Spel</Button>
      </li>
      <li>
        <Button>Musik</Button>
      </li>
    </ul>
  );
}
