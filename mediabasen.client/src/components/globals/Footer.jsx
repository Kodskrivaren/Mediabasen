export default function Footer() {
  const date = new Date();

  return (
    <footer className="flex justify-around pt-5 pb-5 bg-dark text-white">
      <ul>
        <li>Om oss</li>
        <li>Kontakt</li>
      </ul>
      <p>Copyright © {date.getFullYear()} Medelbasen</p>
      <section>
        <img />
        <img />
      </section>
    </footer>
  );
}
