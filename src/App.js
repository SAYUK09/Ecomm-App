import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Router } from "./components/routes/Router";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
//   useParams,
//   useLocation
// } from "react-router-dom";
import { useProductContext } from "./contexts/Products-Context";
import { useCart } from "./contexts/Cart-Context";
import { Products } from "./pages/products/Products";
import { Cart } from "./pages/cart/Cart";
import { Nav } from "./components/nav/Nav";
import { Wishlist } from "./pages/wishlist/Wishlist";
import { ProductDetail } from "./pages/product-details/ProductDetail";

export default function App() {
  const { state, dispatch } = useProductContext();
  const { cartState, cartDispatch } = useCart();
  const [route, setRoute] = useState("product");
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://lazytalkativeinstitutions.sayuk.repl.co/products"
        );

        console.log(response.data);
        const prods = response.data;
        dispatch({ type: "PRODUCTS", payload: prods });
      } catch (err) {
        console.log("Error!!!", err);
      }
    })();
  }, []);

  return (
    <div className="App">
      <Nav />
      <Router />
    </div>
  );
}
