import axios from "axios";

export function wishClickHandler(
  prd,
  wishlistItems,
  setWishlistItems,
  auth,
  toast
) {
  const isInWishlist = wishlistItems.filter((item) => {
    console.log(item.productId, prd._id);
    console.log(item.productId == prd._id);
    return prd._id == item.productId;
  });

  if (wishlistItems.length > 0) {
    if (isInWishlist.length === 1) {
      toast("Already in wishlist", {
        type: "warning",
      });
    } else {
      axiosAddToWishlist(prd, wishlistItems, setWishlistItems, auth, toast);
    }
  } else {
    axiosAddToWishlist(prd, wishlistItems, setWishlistItems, auth, toast);
  }
}

export function wishClickHandlerFromCart(
  prd,
  wishlistItems,
  setWishlistItems,
  auth,
  toast
) {
  const isInWishlist = wishlistItems.filter((item) => {
    console.log(item.productId, prd._id);
    console.log(item.productId == prd._id);
    return prd.productId == item.productId;
  });

  if (wishlistItems.length > 0) {
    if (isInWishlist.length === 1) {
      toast("Already in wishlist", {
        type: "warning",
      });
    } else {
      axiosAddToWishlist(prd, wishlistItems, setWishlistItems, auth, toast);
    }
  } else {
    axiosAddToWishlist(prd, wishlistItems, setWishlistItems, auth, toast);
  }
}

export function axiosRemoveFromWishlist(prd, setWishlistItems, auth, toast) {
  if (auth) {
    (async function () {
      try {
        const response = await axios.delete(
          `https://podcart.herokuapp.com/wishlist/${prd._id}`,
          {
            headers: {
              "auth-token": auth.token,
            },
          }
        );

        console.log(response.data);
        setWishlistItems(response.data);
        toast("Removed from wishlist", {
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    })();
  } else {
    console.log("Please Login");
    toast("Please Login", {
      type: "error",
    });
  }
}

export function axiosAddToWishlist(
  prd,
  wishlistItems,
  setWishlistItems,
  auth,
  toast
) {
  console.log(prd._id);
  if (auth) {
    (async function () {
      try {
        const resp = await axios.post(
          "https://podcart.herokuapp.com/wishlist",
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

        setWishlistItems([...wishlistItems, resp.data]);
        toast("Added to wishlist", {
          type: "success",
        });
      } catch (err) {
        console.log(err);
      }
    })();
  } else {
    console.log("Please Login");
    toast("Please Login", {
      type: "error",
    });
  }
}
