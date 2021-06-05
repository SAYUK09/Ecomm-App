import axios from "axios";

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
  if (auth) {
    (async function () {
      try {
        const resp = await axios.post(
          "https://podcart.herokuapp.com/wishlist",
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
