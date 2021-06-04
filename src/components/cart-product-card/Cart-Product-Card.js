import "./Cart-Product-Card.css";
import {
  axiosAddQty,
  axiosDecrementQty,
  axiosRemoveFromCart,
} from "../../utilty/cart-utility";
import { axiosAddToWishlist } from "../../utilty/wishlist-utility";

import { useCart } from "../../contexts/Cart-Context";
import { useWishlist } from "../../contexts/Wishlist-Context";
import { useAuth } from "../../contexts/Auth-Context";
import { useToast } from "../../contexts/Toast-Context";

export function CartProductCard({ prd }) {
  const { cartState, cartDispatch } = useCart();
  const { wishlistItems, setwishlistItems } = useWishlist();
  const { auth } = useAuth();
  const { toast } = useToast();

  function getProdTotal(prod) {
    const total = parseInt(prod.discountedPrice) * parseInt(prod.qty);
    return total;
  }

  return (
    <div key={prd._id} className="horizCardParent">
      <div className="horizCardBody">
        <div className="HorizImgDiv">
          <img src={prd.image} />
        </div>
        <div className="HorizCardDetails">
          <div className="brandTitle">{prd.name}</div>
          <p className="prdDescrip">{prd.brand}</p>
          <div className="horizCardBtnDiv">
            <button
              className="HorizQtyBtn"
              onClick={() => {
                axiosAddQty(prd, cartDispatch, auth, toast);
              }}
            >
              +
            </button>
            <span className="amt"> {prd.qty} </span>
            <button
              className="HorizQtyBtn subBtn"
              onClick={() => {
                axiosDecrementQty(prd, cartDispatch, auth, toast);
              }}
            >
              -
            </button>
          </div>
          <div className="prdPrice">
            <b> ₹{getProdTotal(prd)}</b>
          </div>
        </div>
      </div>
      <div className="horizCardFooter">
        <button
          className="horizFooterBtn secBtn"
          onClick={() => {
            axiosRemoveFromCart(prd, cartDispatch, auth, toast);
          }}
        >
          Remove
        </button>
        <button
          onClick={() => {
            axiosAddToWishlist(
              prd,
              wishlistItems,
              setwishlistItems,
              auth,
              toast
            );
            axiosRemoveFromCart(prd, cartDispatch, auth, toast);
          }}
          className="horizFooterBtn"
        >
          Move To Wishlist
        </button>
      </div>
    </div>
  );
}
