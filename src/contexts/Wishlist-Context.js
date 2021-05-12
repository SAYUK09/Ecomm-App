import React from "react";
import { createContext, useContext, useState } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setwishlistItems] = useState([]);

  return (
    <>
      <WishlistContext.Provider
        value={{
          wishlistItems,
          setwishlistItems
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
