import "./Cart.css";
import axios from "axios";
import { useEffect } from "react";
import { useCart } from "../../contexts/Cart-Context";
import { useWishlist } from "../../contexts/Wishlist-Context";
import {
  axiosAddToCart,
  axiosAddQty,
  axiosDecrementQty,
  axiosRemoveFromCart
} from "../../utilty/cart-utility";
import { axiosAddToWishlist } from "../../utilty/wishlist-utility";
import { CartProductCard } from "../../components/cart-product-card/Cart-Product-Card";

export function Cart() {
  const { cartState, cartDispatch } = useCart();
  const { wishlistItems, setwishlistItems } = useWishlist();

  function getPrice() {
    let total = 0;
    cartState.cart.map((item) => {
      total = total + item.discountedPrice * item.qty;
    });
    return total;
  }

  function getProdTotal(prod) {
    const total = parseInt(prod.discountedPrice) * parseInt(prod.qty);
    return total;
  }

  return (
    <div className="cartParent">
      <div className="cartPrdsContainer">
        {cartState.cart.map((prd) => {
          return (
            // <h1>llll</h1>
            <CartProductCard prd={prd} />
            // <div key={prd._id} className="horizCardParent">
            //   <div className="horizCardBody">
            //     <div className="HorizImgDiv">
            //       <img src={prd.image} />
            //     </div>
            //     <div className="HorizCardDetails">
            //       <div className="brandTitle">{prd.name}</div>
            //       <p className="prdDescrip">{prd.brand}</p>
            //       <div className="horizCardBtnDiv">
            //         <button
            //           className="HorizQtyBtn"
            //           onClick={() => {
            //             axiosAddQty(prd, cartDispatch);
            //             // cartDispatch({ type: "INCREMENT", payload: prd });
            //           }}
            //         >
            //           +
            //         </button>
            //         <span className="amt"> {prd.qty} </span>
            //         <button
            //           className="HorizQtyBtn subBtn"
            //           onClick={() => {
            //             axiosDecrementQty(prd, cartDispatch);
            //           }}
            //         >
            //           -
            //         </button>
            //       </div>
            //       <div className="prdPrice">
            //         <b> ₹{getProdTotal(prd)}</b>
            //       </div>
            //     </div>
            //   </div>
            //   <div className="horizCardFooter">
            //     <button
            //       className="horizFooterBtn secBtn"
            //       onClick={() => {
            //         axiosRemoveFromCart(prd, cartDispatch);
            //       }}
            //     >
            //       Remove
            //     </button>
            //     <button
            //       onClick={() => {
            //         // setwishlistItems((prds) => [...prds, prd]);
            //         // removeFromCart(prd);
            //         axiosAddToWishlist(prd, wishlistItems, setwishlistItems);
            //         axiosRemoveFromCart(prd, cartDispatch);
            //         // cartDispatch({ type: "REMOVE", payload: prd });
            //       }}
            //       className="horizFooterBtn"
            //     >
            //       Move To Wishlist
            //     </button>
            //   </div>
            // </div>
          );
        })}
      </div>

      <div className="paymentContainer">
        <div className="paymentSect">
          <div className="paymentSectTitle">Total MRP</div>
          <div className="paymentAmt">{getPrice()}</div>
        </div>
        {/*  */}

        <div className="paymentSect">
          <div className="paymentAmt">Total Discount</div>
          <div className="paymentAmt discAmt">-₹0</div>
        </div>

        <div className="paymentSect paymentSectTotal">
          <div className="paymentAmt">Total Amount</div>
          <div className="paymentAmt ">{getPrice()}</div>
        </div>
      </div>
    </div>
  );
}
