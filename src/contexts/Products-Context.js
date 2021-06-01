import { createContext, useContext, useReducer } from "react";
import { productsReducer } from "../reducers/Products-Reducer";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(productsReducer, {
    products: [],
    sortBy: "none",
    priceRange: 0
  });

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductsContext);
}
