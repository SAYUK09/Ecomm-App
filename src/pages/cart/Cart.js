import "./Cart.css";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/Cart-Context";
import { CartProductCard } from "../../components/cart-product-card/Cart-Product-Card";
import { useAuth } from "../../contexts/Auth-Context";
import axios from "axios";
import emptySvg from "../../assets/Empty.svg";

export function Cart() {
  const { cartState, cartDispatch } = useCart();
  const { auth } = useAuth();

  function getPrice() {
    let total = 0;
    cartState.cart.map((item) => {
      total = total + item.discountedPrice * item.qty;
    });
    return total;
  }

  return (
    <div className="cartParent">
      {!cartState.cart.length && (
        <div className="emptySvgDiv">
          <img src={emptySvg} />
          <h2>Nothing in Cart</h2>
          <Link className="emptySvgLink" to="/">
            Shop Now
          </Link>
        </div>
      )}
      <div className="cartPrdsContainer">
        {cartState.cart.map((prd) => {
          return <CartProductCard prd={prd} />;
        })}
      </div>

      {cartState.cart.length && (
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
      )}
    </div>
  );
}
