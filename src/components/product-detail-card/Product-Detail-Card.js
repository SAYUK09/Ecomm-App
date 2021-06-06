import "./Product-Detail-Card.css";
import { CgShoppingCart, CgHeart, CgMediaPodcast } from "react-icons/cg";
import { cartClickHandler } from "../../utilty/cart-utility";
import { wishClickHandler } from "../../utilty/wishlist-utility";
import { useAuth } from "../../contexts/Auth-Context";
import { useToast } from "../../contexts/Toast-Context";
import { useCart } from "../../contexts/Cart-Context";

export function ProductDetailCard({
  wishlistItems,
  setwishlistItems,
  prd,
  cartDispatch,
  img,
  name,
  description,
  rating,
  brand,
  originalPrice,
  discountedPrice,
  category,
}) {
  const { auth } = useAuth();
  const { toast } = useToast();
  const { cartState } = useCart();
  return (
    <div className="prodBody">
      <div className="prodImgDiv">
        <img className="prodImg" src={img} />
      </div>
      <div className="prodDetail">
        <div className="prodDetailHead">
          <p className="prodDetailTitle">{name}</p>
          <p className="prodDetailDesc">{description}</p>
          <p className="prodDetailRating">{rating}</p>
        </div>
        <div className="prodDetailBody">
          <h3 className="prodDetaiBrand"> From {brand}</h3>

          <p className="prodDetaiPrice">
            ₹{discountedPrice}{" "}
            <span className="cancelPrice">₹{originalPrice}</span>{" "}
          </p>

          <small>Category : {category}</small>
        </div>
        <div className="prodDetailFooter">
          <button
            className="prodPrimaryBtn"
            onClick={() => {
              cartClickHandler(prd, cartState, cartDispatch, auth, toast);
            }}
          >
            ADD TO CART <CgShoppingCart />
          </button>

          <button
            className="prodSecondaryBtn"
            onClick={() => {
              wishClickHandler(
                prd,
                wishlistItems,
                setwishlistItems,
                auth,
                toast
              );
            }}
          >
            Add to Wishlist <CgShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}
