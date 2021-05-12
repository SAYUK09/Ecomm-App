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
      // return {...cartRedcState, cart:[....cartRedcState.cart ,action.payload]}
      break;
    // case "ADD_TO_CART":
    //   axios
    //     .post("https://basic-backend.sayuk.repl.co/cart", {
    //       image: action.payload.image,
    //       name: action.payload.name,
    //       description: action.payload.description,
    //       category: action.payload.category,
    //       brand: action.payload.brand,
    //       originalPrice: action.payload.originalPrice,
    //       discountedPrice: action.payload.discountedPrice,
    //       ratings: action.payload.ratings,
    //       qty: action.payload.qty,
    //       inStock: action.payload.inStock,
    //       fastDelivery: action.payload.fastDelivery
    //     })
    //     .then(function (response) {
    //       console.log(response.data);
    //     });
    //   return { ...cartRedcState };
    //   break;
    // case "INCREMENT":
    //   return {
    //     ...cartRedcState,
    //     cart: cartRedcState.cart.map((item) => {
    //       return item._id === action.payload._id
    //         ? { ...item, quantity: item.quantity + 1 }
    //         : item;
    //     })
    //   };
    //   break;

    // case "DECREMENT":
    //   if (action.payload.qty === 1) {
    //     return {
    //       ...cartRedcState,
    //       cart: cartRedcState.cart.filter(
    //         (item) => item._id !== action.payload._id
    //       )
    //     };
    //   } else {
    //     return {
    //       ...cartRedcState,
    //       cart: cartRedcState.cart.map((item) => {
    //         return item._id === action.payload._id
    //           ? { ...item, quantity: item.quantity - 1 }
    //           : item;
    //       })
    //     };
    //   }
    //   break;

    // case "REMOVE":
    //   console.log(action.payload);
    //   return {
    //     ...cartRedcState,
    //     cart: cartRedcState.cart.filter(
    //       (item) => item._id !== action.payload._id
    //     )
    //   };

    default:
      break;
  }
}

export function useCart() {
  return useContext(CartContext);
}
