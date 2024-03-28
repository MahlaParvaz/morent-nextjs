import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";

function CategorySidebar({ categories }) {
  return (
    <div className=" w-96 bg-red-200 ">
      <ProductsFilter categories={categories} />
      <ProductsSort />
    </div>
  );
}
export default CategorySidebar;
