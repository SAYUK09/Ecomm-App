import React, { useReducer } from "react";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    cart: []
  });

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://basic-backend.sayuk.repl.co/cart"
        );
        const cartArr = response.data;

        cartDispatch({ type: "SET_CART", payload: cartArr });
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
          cartDispatch
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}

function cartReducer(cartRedcState, action) {
  switch (action.type) {
    case "SET_CART":
      return { ...cartRedcState, cart: action.payload };
      break;

    case "ADD_TO_CART":
      return {
        ...cartRedcState,
        cart: [...cartRedcState.cart, action.payload]
      };
     
      break;
    

    default:
      break;
  }
}

export function useCart() {
  return useContext(CartContext);
}
