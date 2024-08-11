import Link from "./Link";

export default function Footer() {
  const date = new Date();

  return (
    <footer className="bg-dark text-white px-2">
      <section className="flex justify-between pt-5 pb-5 mx-auto max-w-7xl">
        <ul>
          <li>
            <Link to={"/aboutus"}>Om oss</Link>
          </li>
          <li>
            <Link to={"/contact"}>Kontakt</Link>
          </li>
        </ul>
        <p className="block my-auto">
          Copyright © {date.getFullYear()} Filip Blomqvist
        </p>
        <section>
          <img />
          <img />
        </section>
      </section>
    </footer>
  );
}
