import Link from "./Link";
import GithubLogo from "../../assets/icons/github-mark-white.png";

export default function Footer() {
  const date = new Date();

  return (
    <footer className="bg-dark text-white px-2">
      <section className="flex align-middle gap-y-10 justify-center pt-5 pb-5 mx-auto max-w-7xl flex-col md:flex-row md:justify-between">
        <ul className="flex flex-col flex-grow-0 gap-y-2 md:gap-y-1 w-fit mx-auto md:mx-0">
          <li>
            <Link to={"/aboutus"}>Om oss</Link>
          </li>
          <li>
            <Link to={"/contact"}>Kontakt</Link>
          </li>
        </ul>
        <p className="block my-auto w-fit mx-auto md:mx-0">
          Copyright © {date.getFullYear()} Filip Blomqvist
        </p>
        <section className="flex-grow-0 w-fit mx-auto md:mx-0">
          <Link
            to={"https://github.com/Kodskrivaren/Mediabasen"}
            target={"_blank"}>
            <img src={GithubLogo} className="w-16 h-16 mx-auto" />
          </Link>
        </section>
      </section>
    </footer>
  );
}
