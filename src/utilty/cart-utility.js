import axios from "axios";

export function cartClickHandler(prd, cartState, cartDispatch, auth, toast) {
  const isInCart = cartState.cart.filter((item) => {
    console.log(item.productId == prd._id);
    return prd._id == item.productId;
  });

  if (cartState.cart.length > 0) {
    if (isInCart.length === 1) {
      toast("Already in cart", {
        type: "warning",
      });
    } else {
      axiosAddToCart(prd, cartDispatch, auth, toast);
    }
  } else {
    axiosAddToCart(prd, cartDispatch, auth, toast);
  }
}

export function cartClickHandlerFromWishlist(
  prd,
  cartState,
  cartDispatch,
  auth,
  toast
) {
  const isInCart = cartState.cart.filter((item) => {
    console.log(item.productId == prd._id);
    return prd.productId == item.productId;
  });

  if (cartState.cart.length > 0) {
    if (isInCart.length === 1) {
      toast("Already in cart", {
        type: "warning",
      });
    } else {
      axiosAddToCart(prd, cartDispatch, auth, toast);
    }
  } else {
    axiosAddToCart(prd, cartDispatch, auth, toast);
  }
}

export function axiosAddToCart(prd, cartDispatch, auth, toast) {
  if (auth) {
    (async function () {
      try {
        const resp = await axios.post(
          "https://podcart.herokuapp.com/cart",
          {
            productId: prd._id,
            image: prd.image,
            name: prd.name,
            description: prd.description,
            category: prd.category,
            brand: prd.brand,
            originalPrice: prd.originalPrice,
            discountedPrice: prd.discountedPrice,
            ratings: prd.ratings,
            qty: prd.qty,
            inStock: prd.inStock,
            fastDelivery: prd.fastDelivery,
          },
          {
            headers: {
              "auth-token": auth.token,
            },
          }
        );

        cartDispatch({ type: "ADD_TO_CART", payload: resp.data });
        toast("Product added to cart", {
          type: "success",
        });
      } catch (err) {
        console.log(err);
        // toast("Something went wrong", {
        //   type: "error",
        // });
      }
    })();
  } else {
    console.log("please log in");
    toast("Please Login", {
      type: "error",
    });
  }
}

export function axiosAddQty(prd, cartDispatch, auth, toast) {
  if (auth) {
    (async function () {
      try {
        const response = await axios.patch(
          `https://podcart.herokuapp.com/cart/${prd._id}`,
          {
            qty: prd.qty + 1,
          },
          {
            headers: {
              "auth-token": auth.token,
            },
          }
        );
        console.log(response);
        cartDispatch({ type: "LOAD_CART", payload: response.data });
        toast("Quantity Updated", {
          type: "success",
        });
      } catch (error) {
        console.log(error);
        toast("Something went wrong", {
          type: "error",
        });
      }
    })();
  } else {
    console.log("Please Login");
    toast("Please Login", {
      type: "error",
    });
  }
}

export function axiosDecrementQty(prd, cartDispatch, auth, toast) {
  if (auth) {
    (async function () {
      if (prd.qty === 1) {
        axiosRemoveFromCart(prd, cartDispatch, auth, toast);
      }

      try {
        const response = await axios.patch(
          `https://podcart.herokuapp.com/cart/${prd._id}`,
          {
            qty: prd.qty - 1,
          },
          {
            headers: {
              "auth-token": auth.token,
            },
          }
        );
        console.log(response.data, "cartUtlity 75");
        cartDispatch({ type: "LOAD_CART", payload: response.data });
        toast("Quantity Updated", {
          type: "success",
        });
      } catch (error) {
        console.log(error);
        toast("Something went wrong", {
          type: "error",
        });
      }
    })();
  } else {
    console.log("Please Login");
    toast("Please Login", {
      type: "error",
    });
  }
}

export function axiosRemoveFromCart(prd, cartDispatch, auth, toast) {
  if (auth) {
    (async function () {
      console.log(prd._id);
      try {
        const response = await axios.delete(
          `https://podcart.herokuapp.com/cart/${prd._id}`,
          {
            headers: {
              "auth-token": auth.token,
            },
          }
        );

        cartDispatch({ type: "LOAD_CART", payload: response.data });
        toast("Removed from cart", {
          type: "success",
        });
      } catch (error) {
        console.log(error);
        toast("Something went wrong", {
          type: "error",
        });
      }
    })();
  } else {
    console.log("Please Login");
    toast("Please Login", {
      type: "error",
    });
  }
}
