import axios from "axios";

export function axiosAddToCart(prd, cartDispatch, auth) {
  (async function () {
    try {
      const resp = await axios.post(
        "https://ecom-backend-1.sayuk.repl.co/cart",
        {
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
    } catch (err) {
      console.log(err);
    }
  })();
}

export function axiosAddQty(prd, cartDispatch, auth) {
  (async function () {
    try {
      const response = await axios.patch(
        `https://ecom-backend-1.sayuk.repl.co/cart/${prd._id}`,
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
    } catch (error) {
      console.log(error);
    }
  })();
}

export function axiosDecrementQty(prd, cartDispatch, auth) {
  (async function () {
    if (prd.qty === 1) {
      axiosRemoveFromCart(prd, cartDispatch);
    }

    try {
      const response = await axios.patch(
        `https://ecom-backend-1.sayuk.repl.co/cart/${prd._id}`,
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
    } catch (error) {
      console.log(error);
    }
  })();
}

export function axiosRemoveFromCart(prd, cartDispatch, auth) {
  (async function () {
    console.log(prd._id);
    try {
      const response = await axios.delete(
        `https://ecom-backend-1.sayuk.repl.co/cart/${prd._id}`,
        {
          headers: {
            "auth-token": auth.token,
          },
        }
      );

      cartDispatch({ type: "LOAD_CART", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  })();
}
