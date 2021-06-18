import React from "react";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setwishlistItems] = useState([]);

  return (
    <>
      <WishlistContext.Provider
        value={{
          wishlistItems,
          setwishlistItems,
        }}
      >
        {children}
      </WishlistContext.Provider>
    </>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
