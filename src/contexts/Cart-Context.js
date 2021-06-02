import React, { useReducer } from "react";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { cartReducer } from "../reducers/Cart-Reducer";
import { useAuth } from "../contexts/Auth-Context";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    cart: [],
  });

  const { auth, setAuth } = useAuth();
  console.log(auth, "155555555");

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://ecom-backend-1.sayuk.repl.co/cart",
          {
            headers: {
              "auth-token": auth.token,
            },
          }
        );
        const cartArr = response.data;

        cartDispatch({ type: "LOAD_CART", payload: cartArr });
      } catch (err) {
        console.log("Error!!!", err);
      }
    })();
  }, []);

  return (
    <>
      <CartContext.Provider
        value={{
          cartState,
          cartDispatch,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}

export function useCart() {
  return useContext(CartContext);
}
