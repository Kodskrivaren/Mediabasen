import Button from "./Button";

export default function CategoryPicker() {
  return (
    <section className="w-full">
      <ul className="flex justify-center gap-5 bg-light overflow-scroll pl-5 pr-5 pt-3 pb-3 md:overflow-hidden">
        <li className="ml-5">
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
    </section>
  );
}
