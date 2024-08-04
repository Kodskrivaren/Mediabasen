import { useEffect, useState } from "react";
import NavLink from "./NavLink";
import productService from "../../services/productService";

export default function Navbar() {
  const [screenX, setScreenX] = useState(0);
  const [openMenu, setOpenMenu] = useState(true);
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

  return screenX > 768 ? (
    <nav className="relative z-10">
      <ul className="flex text-white gap-line -mt-10 justify-center w-fit mx-auto max-w-7xl bg-middle">
        {productTypes.map((productType) => (
          <NavLink
            {...{
              key: `desktop-${productType.id}`,
              isMobile: false,
              productType,
            }}
          />
        ))}
      </ul>
    </nav>
  ) : (
    <>
      <nav
        className={`fixed transition-[transform] duration-300 left-0 ${
          openMenu ? "translate-x-0" : "-translate-x-full"
        } z-10`}>
        <ul className="flex text-white flex-col gap-line justify-start mr-auto max-w-7xl bg-middle w-fit">
          {productTypes.map((productType) => (
            <NavLink
              {...{
                key: `mobile-${productType.id}`,
                isMobile: true,
                productType,
              }}
            />
          ))}
        </ul>
        <button
          className="absolute top-1/2 left-full bg-dark text-white align-middle justify-center h-28 w-6 rounded-tr-xl rounded-br-xl flex flex-col gap-0"
          onClick={() => setOpenMenu(!openMenu)}>
          <p
            className={`m-auto transition-[transform] duration-300 ease-linear ${
              openMenu ? "rotate-180" : ""
            }`}>
            &#x27A4;
          </p>
        </button>
      </nav>
    </>
  );
}
