import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Router } from "./components/routes/Router";
import { useProductContext } from "./contexts/Products-Context";
import { useCart } from "./contexts/Cart-Context";
import { Nav } from "./components/nav/Nav";
import { useWishlist } from "./contexts/Wishlist-Context";
import { useAuth } from "./contexts/Auth-Context";

export default function App() {
  const { state, dispatch } = useProductContext();
  const { cartState, cartDispatch } = useCart();
  const { wishlistItems, setwishlistItems } = useWishlist();
  const { auth } = useAuth();

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

  useEffect(() => {
    (async function () {
      try {
        console.log("taraarar");

        const response = await axios.get(
          "https://ecom-backend-1.sayuk.repl.co/wishlist",
          {
            headers: {
              "auth-token": auth.token,
            },
          }
        );
        const wishlistArray = response.data;
        console.log(response.data, "dattaaaa");

        setwishlistItems(wishlistArray);
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
