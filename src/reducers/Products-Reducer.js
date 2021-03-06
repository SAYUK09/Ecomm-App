export function productsReducer(RedcState, action) {
  switch (action.type) {
    case "PRODUCTS":
      return { ...RedcState, products: action.payload };

    case "SORT":
      return { ...RedcState, sortBy: action.payload };

    case "PRICE_RANGE":
      return { ...RedcState, priceRange: action.payload };

    case "RESET":
      return { ...RedcState, sortBy: "none", priceRange: 0 };

    default:
      break;
  }
}
