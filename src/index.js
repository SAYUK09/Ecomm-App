import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProductsProvider } from "./contexts/Products-Context";
import { CartProvider } from "./contexts/Cart-Context";
import { WishlistProvider } from "./contexts/Wishlist-Context";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <ProductsProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </ProductsProvider>
    </Router>
  </StrictMode>,
  rootElement
);
