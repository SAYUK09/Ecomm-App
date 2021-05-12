import axios from "axios";

export function axiosRemoveFromWishlist(prd, setWishlistItems) {
  (async function () {
    try {
      const response = await axios.delete(
        `https://basic-backend.sayuk.repl.co/wishlist/${prd._id}`
      );

      console.log(response.data);
      setWishlistItems(response.data);
    } catch (error) {
      console.log(error);
    }
  })();
}

export function axiosAddToWishlist(prd, wishlistItems, setWishlistItems) {
  (async function () {
    try {
      const resp = await axios.post(
        "https://basic-backend.sayuk.repl.co/wishlist",
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
          fastDelivery: prd.fastDelivery
        }
      );

      setWishlistItems([...wishlistItems, resp.data]);
    } catch (err) {
      console.log(err);
    }
  })();
}
