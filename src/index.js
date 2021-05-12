import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProductsProvider } from "./contexts/Products-Context";
import { CartProvider } from "./contexts/Cart-Context";
import { WishlistProvider } from "./contexts/Wishlist-Context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ProductsProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </ProductsProvider>
  </StrictMode>,
  rootElement
);
