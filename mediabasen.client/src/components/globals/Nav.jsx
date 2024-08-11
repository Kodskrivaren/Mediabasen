import { useEffect, useState } from "react";
import NavLink from "./NavLink";
import productService from "../../services/productService";

export default function Navbar() {
  const [screenX, setScreenX] = useState(0);
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    setScreenX(window.innerWidth);
    function onScreenChange() {
      setScreenX(window.innerWidth);
    }

    window.addEventListener("resize", onScreenChange);

    return () => {
      window.removeEventListener("resize", onScreenChange);
    };
  }, [setScreenX]);

  useEffect(() => {
    async function fetchAndSetProductTypes() {
      const result = await productService.getProductTypes();

      if (result) {
        setProductTypes(result);
      }
    }

    fetchAndSetProductTypes();
  }, []);

  return (
    <nav
      className={`relative z-10${
        screenX <= 768 ? " max-w-full overflow-x-scroll" : ""
      }`}>
      <ul
        className={`flex text-white gap-line justify-center w-fit mx-auto max-w-7xl bg-middle${
          screenX > 768 ? " -mt-10" : ""
        }`}>
        {productTypes.map((productType) => (
          <NavLink
            key={`nav-link-${productType.id}`}
            {...{
              isMobile: false,
              productType,
            }}
          />
        ))}
      </ul>
    </nav>
  );
}
