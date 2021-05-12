import { createContext, useContext, useReducer } from "react";

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

function productsReducer(RedcState, action) {
  switch (action.type) {
    case "PRODUCTS":
      return { ...RedcState, products: action.payload };
      break;

    case "SORT":
      return { ...RedcState, sortBy: action.payload };
      break;

    case "PRICE_RANGE":
      return { ...RedcState, priceRange: action.payload };
      break;

    case "RESET":
      return { ...RedcState, sortBy: "none", priceRange: 0 };
      break;

    case "MICS":
        console.log(action.isCheck)

        console.log(action.isCheck.checked)
      return {
        ...RedcState,
        products: RedcState.products.filter(
          (item) => item.category === action.payload
        )
      };

    default:
      break;
  }
}

export function useProductContext() {
  return useContext(ProductsContext);
}

export function getSortedData(productsList, sortBy) {
  if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
    return [...productsList].sort(
      (a, b) => b["discountedPrice"] - a["discountedPrice"]
    );
  }
  if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
    return [...productsList].sort(
      (a, b) => a["discountedPrice"] - b["discountedPrice"]
    );
  }
  return productsList;
}

export function getPriceRangedData(productsList, price) {
  if (parseInt(price, 10) > 0) {
    return productsList.filter(
      (item) => parseInt(item.discountedPrice, 10) < parseInt(price, 10)
    );
  }
  return productsList;
}
