import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation
} from "react-router-dom";
import { Nav } from "../../components/nav/Nav";
import { Products } from "../../pages/products/Products";
import { Cart } from "../../pages/cart/Cart";
import { Wishlist } from "../../pages/wishlist/Wishlist";
import { ProductDetail } from "../../pages/product-details/ProductDetail";

export function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}
