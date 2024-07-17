export default function Footer() {
  const date = new Date();

  return (
    <footer className="bg-dark text-white">
      <section className="flex justify-between pt-5 pb-5 mx-auto max-w-7xl">
        <ul>
          <li>Om oss</li>
          <li>Kontakt</li>
        </ul>
        <p className="block my-auto">
          Copyright © {date.getFullYear()} Mediabasen
        </p>
        <section>
          <img />
          <img />
        </section>
      </section>
    </footer>
  );
}
