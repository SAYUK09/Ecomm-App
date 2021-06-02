import React, { useReducer } from "react";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { cartReducer } from "../reducers/Cart-Reducer";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    cart: [],
  });

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://ecom-backend-1.sayuk.repl.co/cart",
          {
            headers: {
              "auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI3MzFmZDY2YWE4ZDAxODI4M2QwM2MiLCJpYXQiOjE2MjI2MTg2NzJ9.4UzVxkkrbFG7ZcdpVV59T6h37WZyh_43OsMbVJGP9R4",
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
