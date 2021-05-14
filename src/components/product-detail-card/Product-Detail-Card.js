import "./Product-Detail-Card.css";
import { CgShoppingCart, CgHeart, CgMediaPodcast } from "react-icons/cg";

export function ProductDetailCard({
  img,
  name,
  description,
  rating,
  brand,
  originalPrice,
  discountedPrice,
  category
}) {
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
          <button className="prodPrimaryBtn">
            ADD TO CART <CgShoppingCart />
          </button>

          <button className="prodSecondaryBtn">
            Move to Wishlist <CgShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}
