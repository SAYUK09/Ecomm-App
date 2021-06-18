import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import { ProductsProvider } from "./contexts/Products-Context";
import { CartProvider } from "./contexts/Cart-Context";
import { WishlistProvider } from "./contexts/Wishlist-Context";
import { AuthProvider } from "./contexts/Auth-Context";
import { ToastProvider } from "./contexts/Toast-Context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <ToastProvider>
          <ProductsProvider>
            <CartProvider>
              <WishlistProvider>
                <App />
              </WishlistProvider>
            </CartProvider>
          </ProductsProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
  rootElement
);
