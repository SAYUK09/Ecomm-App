import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Router } from "./components/routes/Router";
import { useProductContext } from "./contexts/Products-Context";
import { useCart } from "./contexts/Cart-Context";
import { Nav } from "./components/nav/Nav";

export default function App() {
  const { state, dispatch } = useProductContext();
  const { cartState, cartDispatch } = useCart();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://ecom-backend-1.sayuk.repl.co/products"
        );

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
