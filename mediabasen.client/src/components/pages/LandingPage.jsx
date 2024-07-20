import CategoryPicker from "../globals/CategoryPicker";
import ProductSearch from "../globals/ProductSearch";
import NewProducts from "./Landing/NewProducts";

export default function LandingPage() {
  return (
    <>
      <CategoryPicker />
      <ProductSearch />
      <NewProducts />
    </>
  );
}
