import React from "react";
import axios from "axios";
import { useEffect } from "react";
import "./Wishlist.css";
import { useWishlist } from "../../contexts/Wishlist-Context";
import { useCart } from "../../contexts/Cart-Context";
import { axiosRemoveFromWishlist } from "../../utilty/wishlist-utility";
import { axiosAddToCart } from "../../utilty/cart-utility";

export function Wishlist() {
  const { wishlistItems, setwishlistItems } = useWishlist();
  const { cartState, cartDispatch } = useCart();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://basic-backend.sayuk.repl.co/wishlist"
        );
        const cartArr = response.data;

        setwishlistItems(cartArr);
      } catch (err) {
        console.log("Error!!!", err);
      }
    })();
  }, []);

  return (
    <div className="wishlistParent">
      <div className="wishlistBody">
        {wishlistItems.map((prd) => {
          return (
            <div className="card1">
              <div className="imgDiv">
                <img className="productImg" src={prd.image} />
              </div>
              <div className="cardDetail">
                <h3 className="productTitle">{prd.name}</h3>
                <h4 className="productDescrip">UNISEX Runner Sneakers</h4>
                <div className="secondaryBtnDiv">
                  <button
                    onClick={() => {
                      axiosRemoveFromWishlist(prd, setwishlistItems);
                    }}
                    className="secCardBtn"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => {
                      axiosRemoveFromWishlist(prd, setwishlistItems);
                      axiosAddToCart(prd, cartDispatch);
                    }}
                    className="secCardBtn"
                  >
                    Move to Cart
                  </button>
                </div>
                <div className="productPrice">
                  <b> ₹{prd.price}</b>
                  <span className="strikeOut">Rs.1000</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
