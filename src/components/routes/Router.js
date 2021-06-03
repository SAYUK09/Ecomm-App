import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { Nav } from "../../components/nav/Nav";
import { Products } from "../../pages/products/Products";
import { Cart } from "../../pages/cart/Cart";
import { Wishlist } from "../../pages/wishlist/Wishlist";
import { ProductDetail } from "../../pages/product-details/ProductDetail";
import { Signup } from "../../pages/signup/signup";
import { Login } from "../../pages/login/login";
import { useAuth } from "../../contexts/Auth-Context";

export function Router() {
  const { auth } = useAuth();

  function PrivateRoute({ path, ...props }) {
    console.log(path, props, "llllllll");
    return auth ? (
      <Route {...props} path={path} />
    ) : (
      <Navigate state={{ from: path }} replace to="/login" />
    );
  }

  return (
    <>
      <Routes>
        {/* <Route
          path="/cart"
          element={!auth ? <Navigate to="/login" /> : <Cart />}
        /> */}
        <Route path="/" element={<Products />} />

        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
