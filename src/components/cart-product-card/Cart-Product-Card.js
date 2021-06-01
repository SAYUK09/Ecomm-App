import "./Cart-Product-Card.css";
import {
  axiosAddQty,
  axiosDecrementQty,
  axiosRemoveFromCart,
} from "../../utilty/cart-utility";
import { axiosAddToWishlist } from "../../utilty/wishlist-utility";

import { useCart } from "../../contexts/Cart-Context";
import { useWishlist } from "../../contexts/Wishlist-Context";

export function CartProductCard({ prd }) {
  const { cartState, cartDispatch } = useCart();
  const { wishlistItems, setwishlistItems } = useWishlist();

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
                axiosAddQty(prd, cartDispatch);
              }}
            >
              +
            </button>
            <span className="amt"> {prd.qty} </span>
            <button
              className="HorizQtyBtn subBtn"
              onClick={() => {
                axiosDecrementQty(prd, cartDispatch);
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
            axiosRemoveFromCart(prd, cartDispatch);
          }}
        >
          Remove
        </button>
        <button
          onClick={() => {
            axiosAddToWishlist(prd, wishlistItems, setwishlistItems);
            axiosRemoveFromCart(prd, cartDispatch);
          }}
          className="horizFooterBtn"
        >
          Move To Wishlist
        </button>
      </div>
    </div>
  );
}
