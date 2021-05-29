export function cartReducer(cartRedcState, action) {
  switch (action.type) {
    case "SET_CART":
      return { ...cartRedcState, cart: action.payload };

    case "ADD_TO_CART":
      return {
        ...cartRedcState,
        cart: [...cartRedcState.cart, action.payload],
      };

    default:
      break;
  }
}
