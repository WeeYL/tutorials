import Products from "../components/products";
import ProductDetails from "../components/productDetails";
import NewProduct from "../components/newProduct";
import { Route, Routes } from "react-router-dom";

const ProductRoute = () => {
  return (
    <Routes>
      <Route index element={<Products />} />
      <Route path="new" element={<NewProduct />} />
      <Route path=":id" element={<ProductDetails />} />
    </Routes>
  );
};

export default ProductRoute;
