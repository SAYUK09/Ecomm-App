export function cartReducer(cartRedcState, action) {
  switch (action.type) {
    case "SET_CART":
      return { ...cartRedcState, cart: action.payload };
      break;

    case "ADD_TO_CART":
      return {
        ...cartRedcState,
        cart: [...cartRedcState.cart, action.payload]
      };

      break;

    default:
      break;
  }
}
