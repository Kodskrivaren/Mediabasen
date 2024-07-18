import React, { useContext } from "react";
import Button from "../../globals/Button";
import { Link } from "react-router-dom";
import ImagePreview from "../../../assets/icons/no-image-outline.svg?react";
import DiscountSticker from "../Detail/DiscountSticker";
import ProductPrice from "../Detail/ProductPrice";
import CartContext from "../../../contexts/CartContext";
import cartService from "../../../services/cartService";

export default function ProductList({ products }) {
  const { setCart } = useContext(CartContext);

  async function removeProduct(cartProductId) {
    const data = await cartService.removeProduct(cartProductId);

    setCart(data);
  }

  async function addClick(product) {
    const data = await cartService.increaseProductCount(product.id);

    if (data) {
      setCart(data);
    }
  }

  async function minusClick(product) {
    const data = await cartService.decreaseProductCount(product.id);

    if (data) {
      if (data.message) {
        setCart(undefined);
      } else {
        setCart(data);
      }
    }
  }

  return (
    <ul className="flex flex-col gap-y-5">
      {products.map(({ id, product, count }) => (
        <li key={`item-${product.id}`} className="flex gap-x-3">
          <Link
            className="block relative w-1/3 max-w-52 flex-shrink-0"
            to={`/detail/${product.id}`}>
            {product.images && product.images.length > 0 ? (
              <img
                className="w-full object-cover"
                src={product.images[0].imageUrl}
              />
            ) : (
              <ImagePreview className="w-full object-cover" />
            )}
            {product.discountedPrice && (
              <DiscountSticker
                {...{
                  product,
                  className: "top-2 right-2 w-12 h-12",
                  textSize: "xl",
                }}
              />
            )}
          </Link>
          <section className="flex flex-col gap-y-1">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p>
              Antal: {count}{" "}
              <Button
                classNameColor="bg-red-500"
                className="w-8 mx-2 font-bold"
                onClick={() => minusClick(product)}>
                -
              </Button>
              <Button
                classNameColor="bg-accent"
                className="w-8 mx-2 font-bold"
                onClick={() => addClick(product)}>
                +
              </Button>
            </p>
            <p>Format: {product.format.name}</p>
            <p>
              Pris (styck): <ProductPrice {...{ product }} />
            </p>
            <Button
              classNameColor="bg-red-500"
              className="mt-auto"
              onClick={() => removeProduct(id)}>
              Ta bort
            </Button>
          </section>
        </li>
      ))}
    </ul>
  );
}
